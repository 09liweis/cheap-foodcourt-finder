export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@vueuse/motion/nuxt', '@pinia/nuxt'],

  app: {
    head: {
      title: 'Food Court Finder',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },

  compatibilityDate: '2024-11-26',
});