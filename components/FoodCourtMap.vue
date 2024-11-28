<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 50 }"
    :enter="{ opacity: 1, y: 0 }"
    class="w-full h-[400px] rounded-lg overflow-hidden shadow-md mb-8"
  >
    <GoogleMap
      :api-key="apiKey"
      :center="mapCenter"
      :zoom="12"
      class="w-full h-full"
    >
      <Marker
        v-for="foodCourt in foodCourts"
        :key="foodCourt._id"
        :options="{
          position: foodCourt.loc,
          title: foodCourt.name
        }"
        @click="handleMarkerClick(foodCourt)"
      />
    </GoogleMap>
  </div>
</template>

<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const apiKey = 'AIzaSyA74jvNet0DufU8aoTe39dELLy2rVMeuos'

const props = defineProps({
  foodCourts: {
    type: Array,
    required: true
  }
})

// Default center (can be calculated based on food courts)
const mapCenter = ref({ lat: 43.7833328, lng: -79.4496867 })

const router = useRouter()

const handleMarkerClick = (foodCourt) => {
  router.push(`/food-court/${foodCourt.place_id}`)
}
</script>