<template>
  <div class="relative">
    <button
      v-if="!curUser?._id"
      @click="openLoginPopup"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Sign in
    </button>
    
    <div v-else class="flex items-center space-x-4">
      <span class="text-sm text-gray-700 hover:text-gray-900">{{ curUser.nm }}</span>
      <button
        @click="logout"
        class="text-sm text-gray-700 hover:text-gray-900"
      >
        Sign out
      </button>
    </div>

    <GoogleLoginPopup
      ref="loginPopup"
      @close="closeLoginPopup"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const userStore = useUserStore();
const curUser = computed(() => userStore.curUser);

onMounted(() => {
  userStore.fetchUser();
})

const loginPopup = ref(null)
const isLoggedIn = ref(false)
const user = ref({
  name: '',
  email: '',
  avatar: ''
})

const openLoginPopup = () => {
  loginPopup.value.isOpen = true
}

const closeLoginPopup = () => {
  loginPopup.value.isOpen = false
}

const logout = () => {
  isLoggedIn.value = false
  user.value = {
    name: '',
    email: '',
    avatar: ''
  }
}
</script>