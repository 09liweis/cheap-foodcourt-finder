<template>
  <div class="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1 w-fit">
    <button
      v-for="view in views"
      :key="view.id"
      @click="$emit('update:modelValue', view.id)"
      :class="[
        'px-4 py-2 text-sm font-medium rounded-md transition-colors',
        modelValue === view.id
          ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm dark:shadow-gray-900'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
      ]"
    >
      <div class="flex items-center space-x-2">
        <component :is="view.icon" class="w-5 h-5" />
        <span>{{ view.label }}</span>
      </div>
    </button>
  </div>
</template>

<script setup>
import ListIcon from '~/components/icons/ListIcon.vue'
import MapIcon from '~/components/icons/MapIcon.vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const views = [
  { id: 'list', label: 'List View', icon: ListIcon },
  { id: 'map', label: 'Map View', icon: MapIcon }
]

defineEmits(['update:modelValue'])
</script>