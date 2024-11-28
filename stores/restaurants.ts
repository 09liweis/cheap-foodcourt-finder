import { defineStore } from 'pinia'

export const useRestaurantsStore = defineStore('restaurants', {
  state: () => ({
    curRestaurant:{}
  }),
  
  getters: {

  },
  
  actions: {
    async fetchRestaurantDetail(resUrl:string, foodcourtUrl:string) {
      this.curRestaurant = await sendRequest({url:`foodcourts/${foodcourtUrl}/restaurants/${resUrl}`})
    }
  }
})