import { defineStore } from 'pinia'
import {sendRequest} from '../utils/http';

export const useFoodCourtsStore = defineStore('foodCourts', {
  state: () => ({
    foodCourts: [],
    curFoodCourt: {},
    isLoading: false,
    error: null
  }),
  
  getters: {
    getFoodCourtById: (state) => (id:string) => {
      state.foodCourts
    }
  },
  
  actions: {
    async fetchFoodCourts() {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await sendRequest({url:'foodcourts'})
        this.foodCourts = data.foodcourts;
      } catch (err:any) {
        this.error = err.toString();
      } finally {
        this.isLoading = false;
      }
    },

    async fetchFoodCourtDetail(foodcourtUrl:string) {
      this.isLoading = true;
      this.error = null;
      try {
        const data = await sendRequest({url:`foodcourts/${foodcourtUrl}`});
        this.curFoodCourt = data.foodcourt;
      } catch (err:any) {
        this.error = err.toString();
      } finally {
        this.isLoading = false;
      }
    },

    async addFoodCourt(placeId:string) {
      this.isLoading = true;
      this.error = null;
      try {
        await sendRequest({url:'foodcourts',method:'POST',body:{place_id:placeId}})
        await this.fetchFoodCourts();
      } catch (err:any) {
        this.error = err.toString();
      } finally {
        this.isLoading = false;
      }
    },
    
    updateFoodCourt() {
    },
    
    deleteFoodCourt() {
    }
  }
})