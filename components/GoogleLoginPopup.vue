<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="close"
  >
    <div
      v-motion
      :initial="{ scale: 0.9, opacity: 0 }"
      :enter="{ scale: 1, opacity: 1 }"
      class="bg-white rounded-lg p-8 max-w-md w-full mx-4"
      @click.stop
    >
      <div class="text-center">
        <h2 class="text-2xl font-bold mb-6">Sign in with Google</h2>
        <button
          @click="handleGoogleLogin"
          class="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" class="w-5 h-5 mr-3" />
          Continue with Google
        </button>
        <button
          @click="close"
          class="mt-4 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false)
const emit = defineEmits(['close'])

const close = () => {
  isOpen.value = false
  emit('close')
}

const handleGoogleLogin = () => {
  // Implement Google OAuth login here
  console.log('Google login clicked')
}

defineExpose({ isOpen })
</script>