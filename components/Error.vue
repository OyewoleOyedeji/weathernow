<script setup lang="ts">
import { errorMessage } from "~/types/interfaces";
const message = useState<errorMessage>("errorMessage");
</script>

<template>
  <section class="flex flex-col justify-center items-center w-full">
    <h1 class="text-4xl dark:text-white">Something's not right 🤔</h1>
    <h2 class="text-xl mt-2 dark:text-white">
      We got this message -
      <span
        class="
          before:content-[open-quote]
          after:content-[close-quote]
          text-main text-xl
        "
        >{{ message }}</span
      >
    </h2>
  </section>
</template>