<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :enter="{ opacity: 1, y: 0 }"
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <NuxtLink :to="`/food-court/${foodCourt.url}`">
      <img :src="foodCourt.image || 'https://images.unsplash.com/photo-1615719413546-198b25453f85?w=800'" :alt="foodCourt.name" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h2 class="text-xl font-semibold text-gray-900">{{ foodCourt.name }}</h2>
        <p class="text-gray-600 mt-2">{{ foodCourt.address }}</p>
        <div class="mt-4 flex items-center justify-between">
          <StarRating :rating="foodCourt.rating" />
          <div class="text-gray-600">
            {{ foodCourt.restaurantCount }} Restaurants
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  foodCourt: {
    type: Object,
    required: true
  }
})
</script>