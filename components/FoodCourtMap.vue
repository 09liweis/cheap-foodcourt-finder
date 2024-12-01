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
      <CustomMarker
        v-for="foodCourt in foodCourts"
        :key="foodCourt._id"
        :options="{
          position: foodCourt.loc,
          anchorPoint: { x: 25, y: 25 }
        }"
        @click="handleMarkerClick(foodCourt)"
      >
        <FoodCourtMarker 
          :name="foodCourt.name"
          :photos="foodCourt.photos"
        />
      </CustomMarker>
    </GoogleMap>
  </div>
</template>

<script setup>
import { GoogleMap, CustomMarker } from 'vue3-google-map'
import { ref, onMounted } from 'vue'
import { useLocation } from '~/composables/useLocation'
import { useRouter } from 'vue-router'
import FoodCourtMarker from './FoodCourtMarker.vue'

const apiKey = 'AIzaSyA74jvNet0DufU8aoTe39dELLy2rVMeuos'

const props = defineProps({
  foodCourts: {
    type: Array,
    required: true
  }
})

const mapCenter = ref({ lat: 43.7833328, lng: -79.4496867 })
const router = useRouter()
const { requestLocation } = useLocation()

const handleMarkerClick = (foodCourt) => {
  router.push(`/food-court/${foodCourt.url}`)
}

const fitBoundsToFoodCourts = () => {
  if (!props.foodCourts || props.foodCourts.length === 0) return

  const bounds = props.foodCourts.reduce(
    (acc, foodCourt) => {
      acc.north = Math.max(acc.north, foodCourt.loc.lat)
      acc.south = Math.min(acc.south, foodCourt.loc.lat)
      acc.east = Math.max(acc.east, foodCourt.loc.lng)
      acc.west = Math.min(acc.west, foodCourt.loc.lng)
      return acc
    },
    {
      north: -90,
      south: 90,
      east: -180,
      west: 180
    }
  )

  // Calculate center point
  mapCenter.value = {
    lat: (bounds.north + bounds.south) / 2,
    lng: (bounds.east + bounds.west) / 2
  }
}

onMounted(async () => {
  // Request user location when component mounts
  const location = await requestLocation()
  if (location) {
    mapCenter.value = location
  } else {
    fitBoundsToFoodCourts()
  }
})
</script>