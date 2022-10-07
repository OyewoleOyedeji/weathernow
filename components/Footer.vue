<script setup>
const isModalOpen = useState("isOpen");
const modal = useState("modalMessage");

const toggleModal = () => {
  const modalInfo = {
    messageType: "settings",
    message: "",
  };
  modal.value = modalInfo;
  isModalOpen.value = true;
};
</script>

<template>
  <footer
    class="absolute bottom-0 flex flex-col items-center mx-auto w-full mb-3"
  >
    <button
      class="
        flex
        justify-center
        items-center
        text-main
        gap-2
        border border-main
        p-2
        rounded-xl
        group
        hover:bg-main
        transition
        md:hidden
      "
      @click="toggleModal()"
    >
      <span class="text-md group-hover:text-white transition">Settings</span>
      <svg
        class="
          fill-main
          group-hover:fill-white
          transition
          w-4
          h-4
          block
          md:hidden
        "
      >
        <use
          xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#gear"
        />
      </svg>
    </button>
    <h1 class="text-xl text-center mt-1">
      Made with ❤️ & 🍞 by
      <NuxtLink
        to="https://github.com/OyewoleOyedeji"
        class="underline text-main"
        >OyewoleOyedeji</NuxtLink
      >
    </h1>
    <h2 class="text-center text-lg mt-1">
      Powered by
      <NuxtLink to="https://weatherapi.com/" class="text-main underline"
        >WeatherAPI.com</NuxtLink
      >
    </h2>
  </footer>
</template>