<template>
  <div>
    <!-- Thumbnail Grid -->
    <div class="grid grid-cols-3 gap-4">
      <img
        v-for="(photo, index) in photos"
        :key="index"
        :src="photo"
        :alt="`Photo ${index + 1}`"
        class="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity shadow-sm dark:shadow-gray-900"
        @click="openPhoto(index)"
      />
    </div>

    <!-- Full Screen Photo Modal -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      @click="closePhoto"
    >
      <div class="relative w-full h-full flex items-center justify-center">
        <!-- Previous Button -->
        <button
          v-if="photos.length > 1"
          @click.stop="previousPhoto"
          class="absolute left-4 p-2 text-white hover:text-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Photo -->
        <img
          v-motion
          :initial="{ scale: 0.9, opacity: 0 }"
          :enter="{ scale: 1, opacity: 1 }"
          :src="currentPhoto"
          :alt="`Photo ${currentIndex + 1}`"
          class="max-h-[90vh] max-w-[90vw] object-contain"
        />

        <!-- Next Button -->
        <button
          v-if="photos.length > 1"
          @click.stop="nextPhoto"
          class="absolute right-4 p-2 text-white hover:text-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <!-- Close Button -->
        <button
          @click.stop="closePhoto"
          class="absolute top-4 right-4 p-2 text-white hover:text-gray-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Photo Counter -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
          {{ currentIndex + 1 }} / {{ photos.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  photos: {
    type: Array,
    required: true
  }
})

const isOpen = ref(false)
const currentIndex = ref(0)

const currentPhoto = computed(() => props.photos[currentIndex.value])

const openPhoto = (index) => {
  currentIndex.value = index
  isOpen.value = true
}

const closePhoto = () => {
  isOpen.value = false
}

const nextPhoto = () => {
  currentIndex.value = (currentIndex.value + 1) % props.photos.length
}

const previousPhoto = () => {
  currentIndex.value = (currentIndex.value - 1 + props.photos.length) % props.photos.length
}
</script>