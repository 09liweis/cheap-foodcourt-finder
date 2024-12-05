<template>
  <div v-if="foodCourt">
    <div class="mb-8">
      <NuxtLink :to="backToFoodCourtsLink" class="text-blue-600 hover:text-blue-800">← Back to Food Courts</NuxtLink>
    </div>
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
    >
      <img :src="foodCourt.cover" :alt="foodCourt.name" class="w-full h-64 object-cover rounded-lg" />
      <div class="mt-4">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ foodCourt.name }}</h1>
        <div class="mt-2 space-y-2">
          <p class="text-gray-600 dark:text-gray-400">{{ foodCourt.address }}</p>
          <a 
            :href="googleMapsUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <span>View on Google Maps</span>
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <Rating :rating="foodCourt.rating" class="mt-2" />
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mt-8 mb-6">
      <h2 class="text-2xl font-semibold text-gray-900">Restaurants</h2>
      <button
        v-if="curUser?.isAdmin"
        @click="showAddRestaurant = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Add New Restaurant
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RestaurantCard
        v-for="restaurant in foodCourt.restaurants"
        :key="restaurant.url"
        :restaurant="restaurant"
        :foodcourtUrl="foodCourt.url"
      />
    </div>

    <!-- Add Restaurant Modal -->
    <div
      v-if="showAddRestaurant"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click="showAddRestaurant = false"
    >
      <div
        v-motion
        :initial="{ scale: 0.9, opacity: 0 }"
        :enter="{ scale: 1, opacity: 1 }"
        class="bg-white rounded-lg p-8 max-w-md w-full mx-4"
        @click.stop
      >
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Add New Restaurant</h2>
          <AddressAutocomplete :foodCourtId="foodCourtId" />
        </div>
        <div class="flex justify-end">
          <button
            @click="showAddRestaurant = false"
            class="text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AddressAutocomplete from '~/components/search/AddressAutocomplete.vue'
import Rating from '~/components/common/Rating.vue'
import { useUserStore } from '~/stores/user'

const route = useRoute()
const foodCourtId = route.params.id
const showAddRestaurant = ref(false)

const foodCourtsStore = useFoodCourtsStore()
const userStore = useUserStore()

foodCourtsStore.fetchFoodCourtDetail(foodCourtId)
const foodCourt = computed(() => foodCourtsStore.curFoodCourt)
const curUser = computed(() => userStore.curUser)

const googleMapsUrl = computed(() => {
  if (!foodCourt.value) return ''
  const query = encodeURIComponent(foodCourt.value.address)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
})

const backToFoodCourtsLink = computed(() => {
  let preferredView = 'list';
  if (process.client) {
    const savedView = localStorage.getItem('preferredView');
    if (savedView === 'list' || savedView === 'map') {
      preferredView = savedView;
    }
  }
  return { path: '/', query: { view: preferredView } };
});
</script>