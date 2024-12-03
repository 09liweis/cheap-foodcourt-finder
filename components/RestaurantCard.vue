<template>
  <div
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:shadow-gray-900"
  >
    <NuxtLink :to="`/food-court/${foodcourtUrl}/restaurant/${restaurant.url}`">
      <img :src="restaurant.cover" :alt="restaurant.name" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ restaurant.name }}</h3>
        <p class="text-gray-600 dark:text-gray-400 mt-2">{{ restaurant.cuisine }}</p>
        <StarRating :rating="restaurant.rating" class="mt-4" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  restaurant: {
    type: Object,
    required: true
  },
  foodcourtUrl:{
    type:String
  }
})
</script>