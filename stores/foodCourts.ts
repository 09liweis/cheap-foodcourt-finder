import { defineStore } from 'pinia'

"https://images.unsplash.com/photo-1615719413546-198b25453f85?w=800"

export const useFoodCourtsStore = defineStore('foodCourts', {
  state: () => ({
    foodCourts: []
  }),
  
  getters: {
    getFoodCourtById: (state) => (id:string) => {
      state.foodCourts
    }
  },
  
  actions: {
    async fetchFoodCourts() {
      const response = await fetch('https://samliweisen.onrender.com/api/foodcourts');
      const data = await response.json();
      this.foodCourts = data.foodcourts;
    },

    addFoodCourt() {
    },
    
    updateFoodCourt() {
    },
    
    deleteFoodCourt() {
    }
  }
})