<template>
  <div class="flex items-center justify-center mb-6 bg-gray-100 rounded-lg p-1 w-fit">
    <button
      v-for="view in views"
      :key="view.id"
      @click="$emit('update:modelValue', view.id)"
      :class="[
        'px-4 py-2 text-sm font-medium rounded-md transition-colors',
        modelValue === view.id
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      ]"
    >
      <div class="flex items-center space-x-2">
        <component :is="view.icon" />
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