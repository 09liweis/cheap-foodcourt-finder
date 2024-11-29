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
        <h2 class="text-2xl font-bold mb-6">Sign In</h2>
        
        <!-- Email/Password Login Form -->
        <form @submit.prevent="handleEmailLogin" class="mb-6 text-left">
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-indigo-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed relative"
          >
            <span :class="{ 'opacity-0': isLoading }">Sign In</span>
            <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </button>
        </form>
        
        <div class="relative mb-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        
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
import { ref } from 'vue'
import { useUserStore } from '../stores/user'

const isOpen = ref(false)
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const emit = defineEmits(['close', 'login'])

const userStore = useUserStore()

const close = () => {
  isOpen.value = false
  email.value = ''
  password.value = ''
  emit('close')
}

const handleEmailLogin = async () => {
  if (isLoading.value) return
  
  isLoading.value = true
  try {
    emit('login', {
      email: email.value,
      password: password.value
    })
    await userStore.login(email.value, password.value)
    // Clear form after successful login
    email.value = ''
    password.value = ''
    close()
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = () => {
  // Implement Google OAuth login here
  console.log('Google login clicked')
}

defineExpose({ isOpen })
</script>