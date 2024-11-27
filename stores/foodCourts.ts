import { defineStore } from 'pinia'

export const useFoodCourtsStore = defineStore('foodCourts', {
  state: () => ({
    foodCourts: [
      {
        id: 1,
        name: "Downtown Food Haven",
        address: "123 Main St, City Center",
        image: "https://images.unsplash.com/photo-1615719413546-198b25453f85?w=800",
        rating: 4.5,
        restaurantCount: 15,
        position: { lat: 1.3521, lng: 103.8198 }
      },
      {
        id: 2,
        name: "Market Square Eats",
        address: "456 Market Ave, Downtown",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800",
        rating: 4.2,
        restaurantCount: 12,
        position: { lat: 1.3644, lng: 103.9915 }
      },
      {
        id: 3,
        name: "The Food Gallery",
        address: "789 Arts District, Uptown",
        image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800",
        rating: 4.7,
        restaurantCount: 20,
        position: { lat: 1.3099, lng: 103.7775 }
      }
    ]
  }),
  
  getters: {
    getFoodCourtById: (state) => (id) => {
      return state.foodCourts.find(fc => fc.id === parseInt(id))
    }
  },
  
  actions: {
    addFoodCourt(foodCourt) {
      const newId = Math.max(...this.foodCourts.map(fc => fc.id)) + 1
      this.foodCourts.push({
        ...foodCourt,
        id: newId,
        position: { lat: 1.3521, lng: 103.8198 } // Default position
      })
    },
    
    updateFoodCourt(id, updatedFoodCourt) {
      const index = this.foodCourts.findIndex(fc => fc.id === id)
      if (index !== -1) {
        this.foodCourts[index] = { ...this.foodCourts[index], ...updatedFoodCourt }
      }
    },
    
    deleteFoodCourt(id) {
      this.foodCourts = this.foodCourts.filter(fc => fc.id !== id)
    }
  }
})