import config from "config";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@kevinmarrec/nuxt-pwa",
  ],
  app: {
    head: {
      title: "Weathernow",
      meta: [
        {
          name: "description",
          content: "Just another weather application",
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
        {
          rel: "preload",
          href: "/bootstrap-icons.svg",
          as: "image",
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
    baseUri: "https://api.openweathermap.org",
    public: {
      idLength: 64,
    },
  },
  colorMode: {
    classSuffix: "",
  },
  pwa: {
    meta: {
      author: "OyedejiOyewole",
      theme_color: "#f03a17",
    },
    icon: {
      fileName: "favicon.svg",
    },
    manifest: {
      name: "Weathernow",
      description: "Just another weather application",
    },
  },
});
