import { ref } from 'vue'

export const useLocation = () => {
  const userLocation = ref<{ lat: number; lng: number } | null>(null)
  const locationError = ref<string | null>(null)

  const requestLocation = () => {
    return new Promise<{ lat: number; lng: number } | null>((resolve) => {
      if (!navigator.geolocation) {
        locationError.value = 'Geolocation is not supported by your browser'
        resolve(null)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          userLocation.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          resolve(userLocation.value)
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              locationError.value = 'Location permission denied'
              break
            case error.POSITION_UNAVAILABLE:
              locationError.value = 'Location information unavailable'
              break
            case error.TIMEOUT:
              locationError.value = 'Location request timed out'
              break
            default:
              locationError.value = 'An unknown error occurred'
          }
          resolve(null)
        }
      )
    })
  }

  return {
    userLocation,
    locationError,
    requestLocation
  }
}
