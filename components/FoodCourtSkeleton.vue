<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
    <!-- Image skeleton -->
    <div class="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
    
    <!-- Content skeleton -->
    <div class="p-4 space-y-3">
      <!-- Title skeleton -->
      <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      
      <!-- Address skeleton -->
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
      
      <!-- Rating and restaurant count skeleton -->
      <div class="flex items-center justify-between mt-4">
        <!-- Rating skeleton -->
        <div class="flex space-x-1">
          <div v-for="n in 5" :key="n" class="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <!-- Restaurant count skeleton -->
        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  </div>
</template>
