<template>
  <div class="w-full max-w-2xl mx-auto mb-8">
    <div class="relative">
      <input
        ref="searchInput"
        type="text"
        placeholder="Search for a location..."
        class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <div
        v-if="selectedPlace"
        class="mt-4 p-4 bg-white rounded-lg shadow-md"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <h3 class="font-semibold text-gray-900 mb-2">Selected Location</h3>
        <div class="space-y-2 text-sm text-gray-600">
          <p><span class="font-medium">Address:</span> {{ selectedPlace.formatted_address }}</p>
          <p v-if="selectedPlace.name"><span class="font-medium">Name:</span> {{ selectedPlace.name }}</p>
          <div class="flex space-x-4">
            <p><span class="font-medium">Latitude:</span> {{ selectedPlace.geometry.location.lat() }}</p>
            <p><span class="font-medium">Longitude:</span> {{ selectedPlace.geometry.location.lng() }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const {foodCourtId} = defineProps(['foodCourtId']);

import { Loader } from '@googlemaps/js-api-loader';
import { ref, onMounted } from 'vue';
import { useFoodCourtsStore } from '~/stores/foodCourts';
const foodCourtStore = useFoodCourtsStore();

import { useRestaurantsStore } from '~/stores/restaurants';
const restaurantStore = useRestaurantsStore();

const searchInput = ref(null);
const selectedPlace = ref(null);
const emit = defineEmits(['place-selected']);

const API_KEY = 'AIzaSyA74jvNet0DufU8aoTe39dELLy2rVMeuos';

onMounted(async () => {
  const loader = new Loader({
    apiKey: API_KEY,
    version: 'weekly',
    libraries: ['places']
  });

  try {
    await loader.load();
    const autocomplete = new google.maps.places.Autocomplete(searchInput.value, {
      types: ['geocode', 'establishment'],
      fields: ['formatted_address', 'geometry', 'name', 'place_id']
    });

    autocomplete.addListener('place_changed', async () => {
      const place = autocomplete.getPlace();
      if (foodCourtId) {
        await restaurantStore.addRestaurant(place.place_id, foodCourtId);
        await foodCourtStore.fetchFoodCourtDetail(foodCourtId);
      } else {
        await foodCourtStore.addFoodCourt(place.place_id);
      }

      if (place.geometry) {
        selectedPlace.value = place;
        emit('place-selected', place);
      }
    });
  } catch (error) {
    console.error('Error loading Google Maps:', error);
  }
});
</script>