<template>
  <div v-if="foodCourt">
    <div class="mb-8">
      <NuxtLink to="/" class="text-blue-600 hover:text-blue-800">← Back to Food Courts</NuxtLink>
    </div>
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
    >
      <img :src="foodCourt.image" :alt="foodCourt.name" class="w-full h-64 object-cover rounded-lg" />
      <div class="mt-4">
        <h1 class="text-3xl font-bold text-gray-900">{{ foodCourt.name }}</h1>
        <p class="text-gray-600 mt-2">{{ foodCourt.address }}</p>
        <StarRating :rating="foodCourt.rating" class="mt-2" />
      </div>
    </div>

    <h2 class="text-2xl font-semibold text-gray-900 mt-8 mb-6">Restaurants</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RestaurantCard
        v-for="restaurant in foodCourt.restaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const foodCourtId = route.params.id

const foodCourtsStore = useFoodCourtsStore()
const restaurantsStore = useRestaurantsStore()

foodCourtsStore.fetchFoodCourtDetail(foodCourtId)
const foodCourt = computed(() => foodCourtsStore.curFoodCourt)
</script>