<template>
  <div class="flex items-center">
    <span class="text-yellow-400">★</span>
    <span class="ml-1 text-gray-700">{{ rating }}/5</span>
  </div>
</template>

<script setup>
defineProps({
  rating: {
    type: Number,
    required: true
  }
})
</script>