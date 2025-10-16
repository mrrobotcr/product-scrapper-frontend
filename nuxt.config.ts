// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  devtools: { enabled: true },
  
  modules: ['@nuxt/image', '@nuxt/eslint'],
  
  css: ['~/assets/css/main.css'],
  
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Enable pages directory
  pages: true,

  // Development server
  devServer: {
    port: 3000
  },

  // Runtime config
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  },

  // App config
  app: {
    head: {
      title: 'Product Scrapper - Compara precios en múltiples tiendas',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Busca y compara productos de múltiples tiendas en Costa Rica' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Color mode (Nuxt UI)
  colorMode: {
    preference: 'light'
  }
})