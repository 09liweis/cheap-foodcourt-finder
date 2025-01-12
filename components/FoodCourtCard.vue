<template>
  <article
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :enter="{ opacity: 1, y: 0 }"
    class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:shadow-gray-900"
  >
    <NuxtLink :to="`/food-court/${foodCourt.url}`">
      <img :src="foodCourt.cover || 'https://images.unsplash.com/photo-1615719413546-198b25453f85?w=800'" :alt="foodCourt.name" class="w-full h-48 object-cover transition hover:scale-105" />
      <div class="p-4">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">{{ foodCourt.name }}</h2>
        <p class="text-gray-600 dark:text-gray-400 mt-2">{{ foodCourt.address }}</p>
        <div class="space-y-2">
          <Rating :rating="foodCourt.rating" />
          <PriceLevel v-if="foodCourt.price_level" :price-level="foodCourt.price_level" />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
import Rating from '~/components/common/Rating.vue'
import PriceLevel from '~/components/common/PriceLevel.vue'

defineProps({
  foodCourt: {
    type: Object,
    required: true
  }
})
</script>