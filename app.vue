<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white">Food Court Finder</h1>
            </NuxtLink>
          </div>
          <div class="flex items-center space-x-4">
            <ThemeSwitcher />
            <!-- <UserMenu /> -->
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Analytics />
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { Analytics } from '@vercel/analytics/nuxt'
import ThemeSwitcher from '~/components/ThemeSwitcher.vue'
</script>

<style>
:root {
  color-scheme: light dark;
}

body {
  @apply text-gray-900 dark:text-gray-100;
  @apply bg-white dark:bg-gray-900;
}
</style>