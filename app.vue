<script setup lang="ts">
import { nanoid } from "nanoid";
import { fetchWeather } from "~/composables/useUtilities";
import { settings } from "~/types/interfaces";

useHead({
  bodyAttrs: {
    class: "dark:bg-black dark:bg-opacity-90 h-[80vh]",
  },
});

const { public: readableConfig } = useRuntimeConfig();
const loading = useState("loading", () => false);
const initialLoad = useState("initialLoad", () => true);

const sendRequest = async (position) => {
  const _id = useState<string>("id");
  loading.value = true;
  const settings = useState<settings>("settings");
  const _response = await fetchWeather(
    null,
    position.coords.latitude,
    position.coords.longitude,
    settings.value.unit,
    _id.value
  );
  useState("results", () => _response.value);
  loading.value = false;
  initialLoad.value = false;
};

onMounted(async () => {
  if (window.localStorage) {
    const id = window.localStorage.getItem("id");
    const settings = window.localStorage.getItem("settings");

    if (id) {
      useState("id", () => id);
    } else {
      const _id = useState("id", () => nanoid(readableConfig.idLength));
      window.localStorage.setItem("id", _id.value);
    }

    if (settings) {
      const settingsParsed: settings = JSON.parse(settings);
      useState("settings", () => settingsParsed);
    } else {
      const _settings = useState<settings>("settings", () => ({
        useBrowserLocation: false,
        unit: "standard",
      }));
      window.localStorage.setItem("settings", JSON.stringify(_settings.value));
    }
  } else {
    useState("id", () => nanoid(readableConfig.idLength));
    useState<settings>("settings", () => ({
      useBrowserLocation: false,
      unit: "standard",
    }));
  }
  const settings = useState<settings>("settings");
  if (settings.value.useBrowserLocation) {
    navigator.geolocation.getCurrentPosition(sendRequest, () => {
      console.error("Request aborted because denied access to location");
    });
  }
});
</script>

<template>
  <Navbar />
  <Content />
  <Modal />
  <Footer />
</template>
