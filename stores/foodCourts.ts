import { defineStore } from 'pinia'
import {sendRequest} from '../utils/http';

export const useFoodCourtsStore = defineStore('foodCourts', {
  state: () => ({
    foodCourts: [],
    curFoodCourt:{}
  }),
  
  getters: {
    getFoodCourtById: (state) => (id:string) => {
      state.foodCourts
    }
  },
  
  actions: {
    async fetchFoodCourts() {
      const data = await sendRequest({url:'foodcourts'})
      this.foodCourts = data.foodcourts;
    },

    async fetchFoodCourtDetail(foodcourtUrl:string) {
      const data = await sendRequest({url:`foodcourts/${foodcourtUrl}`});
      this.curFoodCourt = data.foodcourt;
    },

    async addFoodCourt(placeId:string) {
      const data = await sendRequest({url:'foodcourts',method:'POST',body:{place_id:placeId}})
      this.fetchFoodCourts();
    },
    
    updateFoodCourt() {
    },
    
    deleteFoodCourt() {
    }
  }
})