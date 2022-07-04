import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            SUPABASE_KEY : process.env.SUPABASE_KEY
        }
    },
    buildModules: [
        'nuxt-windicss',
    ],
})
