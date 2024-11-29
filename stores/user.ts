import { defineStore } from 'pinia'
import { sendRequest } from '../utils/http';

interface User {
  _id?: string;
  eml?: string;
  nm?: string;
  isAdmin?: boolean;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    curUser: {} as User,
    isAuthenticated: false,
  }),
  
  actions: {
    async login(eml: string, pwd: string) {
      try {
        const data = await sendRequest({url: 'user/login', method: 'POST', body: {eml, pwd}});
        if (data.token) {
          localStorage.setItem('token', data.token);
          await this.fetchUser();
          this.isAuthenticated = true;
          return true;
        }
        throw new Error(data.message || 'Login failed');
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },

    async logout() {
      try {
        localStorage.removeItem('token');
        this.curUser = {};
        this.isAuthenticated = false;
      } catch (error) {
        console.error('Logout error:', error);
        throw error;
      }
    },

    async fetchUser() {
      if (!localStorage.getItem('token')) {
        this.logout();
        return;
      }
      try {
        const data = await sendRequest({url: 'user/detail', method: 'POST'});
        if (data.user) {
          const user = data.user;
          user.isAdmin = user.roles.includes('admin');
          this.curUser = user;
          this.isAuthenticated = true;
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Fetch user error:', error);
        this.logout();
        throw error;
      }
    }
  }
})