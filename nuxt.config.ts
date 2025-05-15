// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxt/ui",
    "pinia-plugin-persistedstate/nuxt",
    "@pinia/nuxt",
  ],
  css: ["~/assets/index.scss", "~/assets/main.css"],
  colorMode: {
    preference: "light",
  },

  compatibilityDate: "2024-11-07",
});