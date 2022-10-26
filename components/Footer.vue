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
  <footer class="flex flex-col items-center mx-auto w-full">
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
  </footer>
</template>