<template>
  <div v-if="restaurant">
    <div class="mb-8">
      <NuxtLink :to="`/food-court/${restaurant.foodcourt?.url}`" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
        ← Back to {{restaurant.foodcourt?.name}}
      </NuxtLink>
    </div>
    
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      class="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div class="space-y-6">
        <img :src="restaurant.cover" :alt="restaurant.name" class="w-full h-96 object-cover rounded-lg shadow-md dark:shadow-gray-900" />
        <PhotoViewer :photos="allPhotos" />
      </div>

      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ restaurant.name }}</h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">{{ restaurant.cuisine }}</p>
          <div class="mt-4 flex items-center space-x-4">
            <Rating :rating="restaurant.rating" />
            <PriceLevel v-if="restaurant.price_level" :price-level="restaurant.price_level" />
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Menu</h2>
          <div class="space-y-4">
            <div
              v-for="category in restaurant.menu"
              :key="category.name"
              class="space-y-2"
            >
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">{{ category.name }}</h3>
              <div class="space-y-2">
                <div
                  v-for="item in category.items"
                  :key="item.name"
                  class="flex justify-between items-center"
                >
                  <span class="text-gray-800 dark:text-gray-300">{{ item.name }}</span>
                  <span class="text-gray-600 dark:text-gray-400">${{ item.price.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Reviews</h2>
          <div class="space-y-4">
            <div
              v-for="review in restaurant.reviews"
              :key="review.id"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
              class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-sm dark:shadow-gray-900"
            >
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-900 dark:text-white">{{ review.author }}</span>
                <Rating :rating="review.rating" />
              </div>
              <p class="mt-2 text-gray-700 dark:text-gray-300">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PhotoViewer from '~/components/PhotoViewer.vue'
import Rating from '~/components/common/Rating.vue'
import PriceLevel from '~/components/common/PriceLevel.vue'

const route = useRoute()
const {foodcourtUrl, resUrl} = route.params
const restaurantsStore = useRestaurantsStore()
restaurantsStore.fetchRestaurantDetail(resUrl, foodcourtUrl)
const restaurant = computed(() => restaurantsStore.curRestaurant)

const allPhotos = computed(() => {
  if (!restaurant.value) return []
  return [restaurant.value.cover, ...(restaurant.value.photos || [])]
})
</script>