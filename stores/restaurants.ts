import { defineStore } from 'pinia'

export const useRestaurantsStore = defineStore('restaurants', {
  state: () => ({
    restaurants: [
      {
        id: 1,
        foodCourtId: 1,
        name: "Sushi Master",
        cuisine: "Japanese",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
        rating: 4.8,
        photos: [
          "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
          "https://images.unsplash.com/photo-1554502078-ef0fc409efce?w=800",
          "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800"
        ],
        menu: [
          {
            name: "Sushi Rolls",
            items: [
              { name: "California Roll", price: 8.99 },
              { name: "Spicy Tuna Roll", price: 9.99 },
              { name: "Dragon Roll", price: 12.99 }
            ]
          },
          {
            name: "Nigiri",
            items: [
              { name: "Salmon Nigiri", price: 6.99 },
              { name: "Tuna Nigiri", price: 7.99 },
              { name: "Yellowtail Nigiri", price: 8.99 }
            ]
          }
        ],
        reviews: [
          {
            id: 1,
            author: "John D.",
            rating: 5,
            comment: "Best sushi in the food court! Fresh and delicious."
          },
          {
            id: 2,
            author: "Sarah M.",
            rating: 4,
            comment: "Great variety and reasonable prices."
          },
          {
            id: 3,
            author: "Mike R.",
            rating: 5,
            comment: "Amazing quality and friendly staff."
          }
        ]
      }
    ]
  }),
  
  getters: {
    getRestaurantById: (state) => (id) => {
      return state.restaurants.find(r => r.id === parseInt(id))
    },
    
    getRestaurantsByFoodCourtId: (state) => (foodCourtId) => {
      return state.restaurants.filter(r => r.foodCourtId === parseInt(foodCourtId))
    }
  },
  
  actions: {
    addRestaurant(restaurant) {
      const newId = Math.max(...this.restaurants.map(r => r.id)) + 1
      this.restaurants.push({
        ...restaurant,
        id: newId,
        photos: [],
        menu: [],
        reviews: []
      })
    },
    
    updateRestaurant(id, updatedRestaurant) {
      const index = this.restaurants.findIndex(r => r.id === id)
      if (index !== -1) {
        this.restaurants[index] = { ...this.restaurants[index], ...updatedRestaurant }
      }
    },
    
    deleteRestaurant(id) {
      this.restaurants = this.restaurants.filter(r => r.id !== id)
    }
  }
})