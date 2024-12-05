<template>
    <div class="flex items-center space-x-1">
      <span
        v-for="i in 4"
        :key="i"
        :class="[
          'text-lg',
          i <= priceLevel
            ? 'text-green-600 dark:text-green-500'
            : 'text-gray-300 dark:text-gray-600'
        ]"
      >
        $
      </span>
      <span class="text-sm text-gray-600 dark:text-gray-400 ml-1">
        {{ getPriceLevelLabel }}
      </span>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    priceLevel: {
      type: Number,
      required: true,
      validator: (value) => value >= 0 && value <= 4
    },
    showLabel: {
      type: Boolean,
      default: true
    }
  })
  
  const getPriceLevelLabel = computed(() => {
    if (!props.showLabel) return ''
    
    const labels = {
      0: 'Free',
      1: 'Inexpensive',
      2: 'Moderate',
      3: 'Expensive',
      4: 'Very Expensive'
    }
    return labels[props.priceLevel]
  })
  </script>