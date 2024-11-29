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
            class="w-full bg-indigo-600 text-white rounded-lg px-6 py-3 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign In
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

const isOpen = ref(false)
const email = ref('')
const password = ref('')
const emit = defineEmits(['close', 'login'])

const userStore = useUserStore()

const close = () => {
  isOpen.value = false
  email.value = ''
  password.value = ''
  emit('close')
}

const handleEmailLogin = async () => {
  try {
    // Emit login event with credentials
    emit('login', {
      email: email.value,
      password: password.value
    })
    userStore.login(email.value, password.value)
    // Clear form after successful login
    email.value = ''
    password.value = ''
  } catch (error) {
    console.error('Login error:', error)
  }
}

const handleGoogleLogin = () => {
  // Implement Google OAuth login here
  console.log('Google login clicked')
}

defineExpose({ isOpen })
</script>