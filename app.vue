<script setup>
import { nanoid } from "nanoid";

useHead({
  bodyAttrs: {
    class: "dark:bg-black dark:bg-opacity-90 relative h-screen",
  },
});

const config = useRuntimeConfig();
const _id = useState("id", () => "");

// Create an id and store the id in localStorage if available
onMounted(() => {
  if (window.localStorage) {
    const id = window.localStorage.getItem("id");

    if (id) {
      _id.value = id;
    } else {
      _id.value = nanoid(config.public.idLength);
      window.localStorage.setItem("id", _id.value);
    }
  } else {
    _id.value = nanoid(config.public.idLength);
  }
});

useState("initialLoad", () => true);
useState("results", () => null);
</script>

<template>
  <div>
    <Navbar />
    <Content />
    <Modal />
    <Footer />
  </div>
</template>
