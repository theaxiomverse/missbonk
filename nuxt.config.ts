// nuxt.config.ts
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],
  build: {
    transpile: ['vue-chartjs', 'chart.js']
  },

  app: {
    head: {
      script: [
        { 
          src: 'https://cdn.jsdelivr.net/npm/tronweb@5.3.1/dist/TronWeb.js',
          defer: true
        }
      ],
      title: 'Miss Bonk Pageant',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      tronNetwork: 'mainnet',
      tronNode: 'https://api.trongrid.io'
    }
  },
  compatibilityDate: '2025-01-08',
})

/*
app: {
    head: {
      script: [
        { src: 'https://cdn.tronlink.org/tronweb/latest/TronWeb.js' }
      ]
    }
  }
*/