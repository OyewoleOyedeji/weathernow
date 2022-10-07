import config from "config";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],
  app: {
    head: {
      title: "Weathernow",
      meta: [
        {
          name: "description",
          content: "Find the weather of different locations",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://api.fonts.coollabs.io" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://api.fonts.coollabs.io/css2?family=Inter:wght@300&display=swap",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          sizes: "32x32",
          href: "/favicon.svg",
        },
      ],
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  runtimeConfig: {
    apiKey:
      process.env.NODE_ENV === "development"
        ? config.get("weatherApiKey")
        : process.env.WEATHERAPI_KEY,
    baseUri: "https://api.weatherapi.com",
    public: {
      idLength: 64,
    },
  },
});
