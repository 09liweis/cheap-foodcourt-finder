<template>
  <div class="custom-marker">
    <div class="marker-content">
      <img 
        :src="cover" 
        :alt="name"
        class="marker-image"
        @error="handleImageError"
      />
      <div class="marker-pin"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  }
})

const handleImageError = (e) => {
  // Set a fallback image if the photo fails to load
  e.target.src = '/placeholder-foodcourt.jpg'
}
</script>

<style scoped>
.custom-marker {
  position: absolute;
  left: 0;
  top: 0;
}

.marker-content {
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
  transition: all 0.2s ease;
  transform: translate(-50%, -50%);
}

.marker-content:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.marker-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.marker-pin {
  position: absolute;
  bottom: -10px;
  left: 50%;
  width: 2px;
  height: 10px;
  background: white;
  transform: translateX(-50%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .marker-content {
    border-color: #1f2937;
  }
  
  .marker-pin {
    background: #1f2937;
  }
}
</style>
