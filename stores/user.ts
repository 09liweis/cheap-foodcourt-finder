import { defineStore } from 'pinia'
import {sendRequest} from '../utils/http';

export const useUserStore = defineStore('user', {
  state: () => ({
    curUser: {},
  }),
  
  actions: {
    async login(eml:string, pwd:string) {
      const data = await sendRequest({url:'user/login','method':'POST',body:{eml, pwd}});
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
    },

    async fetchUser() {
      const data = await sendRequest({url:'user/detail', method:'POST'});
      this.curUser = data.user;
    }
  }
})