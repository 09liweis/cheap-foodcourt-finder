<template>
  <div v-if="restaurant">
    <div class="mb-8">
      <NuxtLink :to="`/food-court/${restaurant.foodcourt?.url}`" class="text-blue-600 hover:text-blue-800">
        ← Back to {{restaurant.foodcourt?.name}}
      </NuxtLink>
    </div>
    
    <div
      v-motion
      :initial="{ opacity: 0 }"
      :enter="{ opacity: 1 }"
      class="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div class="space-y-6">
        <img :src="restaurant.image" :alt="restaurant.name" class="w-full h-96 object-cover rounded-lg" />
        <div class="grid grid-cols-3 gap-4">
          <img
            v-for="(photo, index) in restaurant.photos"
            :key="index"
            :src="photo"
            :alt="`${restaurant.name} photo ${index + 1}`"
            class="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
          />
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ restaurant.name }}</h1>
          <p class="text-gray-600 mt-2">{{ restaurant.cuisine }}</p>
          <StarRating :rating="restaurant.rating" class="mt-2" />
        </div>

        <div>
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Menu</h2>
          <div class="space-y-4">
            <div
              v-for="category in restaurant.menu"
              :key="category.name"
              class="space-y-2"
            >
              <h3 class="text-xl font-medium text-gray-900">{{ category.name }}</h3>
              <div class="space-y-2">
                <div
                  v-for="item in category.items"
                  :key="item.name"
                  class="flex justify-between items-center"
                >
                  <span class="text-gray-800">{{ item.name }}</span>
                  <span class="text-gray-600">${{ item.price.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Reviews</h2>
          <div class="space-y-4">
            <div
              v-for="review in restaurant.reviews"
              :key="review.id"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
              class="bg-gray-50 p-4 rounded-lg"
            >
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-900">{{ review.author }}</span>
                <StarRating :rating="review.rating" />
              </div>
              <p class="mt-2 text-gray-700">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const {foodcourtUrl, resUrl} = route.params
const restaurantsStore = useRestaurantsStore()
restaurantsStore.fetchRestaurantDetail(resUrl, foodcourtUrl)
const restaurant = computed(() => restaurantsStore.curRestaurant)
</script>