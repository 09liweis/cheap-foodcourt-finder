<template>
  <div
    v-motion
    :initial="{ opacity: 0, x: -50 }"
    :enter="{ opacity: 1, x: 0 }"
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
  >
    <NuxtLink :to="`/restaurant/${restaurant.url}`">
      <img :src="restaurant.image" :alt="restaurant.name" class="w-full h-48 object-cover" />
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900">{{ restaurant.name }}</h3>
        <p class="text-gray-600 mt-2">{{ restaurant.cuisine }}</p>
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
  }
})
</script>