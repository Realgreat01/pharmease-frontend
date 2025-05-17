// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt/ui", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  css: ["~/assets/index.scss", "~/assets/main.css"],
  colorMode: {
    preference: "light",
  },

  compatibilityDate: "2024-11-07",
});

