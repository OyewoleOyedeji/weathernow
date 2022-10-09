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
    class="
      absolute
      flex flex-col
      items-center
      mx-auto
      w-full
      bottom-5
      2xl:bottom-0
    "
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
    <div class="flex flex-col lg:flex-row gap-4 items-center">
      <h1 class="text-xl text-center mt-2 md:mt-1 dark:text-white mr-0">
        Made with ❤️ & 🍞 by
        <NuxtLink
          to="https://github.com/OyewoleOyedeji"
          class="
            underline
            text-main
            dark:opacity-50 dark:hover:opacity-100
            hover:opacity-50
            transition
          "
          >OyewoleOyedeji</NuxtLink
        >
      </h1>
      <svg class="w-6 h-6 fill-main">
        <use
          xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#lightning-charge-fill"
        />
      </svg>
      <h2 class="text-center text-lg mt-1 dark:text-white">
        Powered by
        <NuxtLink
          to="https://weatherapi.com/"
          class="
            text-main
            underline
            dark:opacity-50 dark:hover:opacity-100
            hover:opacity-50
            transition
          "
          >WeatherAPI.com</NuxtLink
        >
      </h2>
    </div>
  </footer>
</template>