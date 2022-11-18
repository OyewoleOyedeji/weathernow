<script setup lang="ts">
import { error } from "~/types/interfaces";
const error = useState<error>("error");
</script>

<template>
  <section
    class="
      flex flex-col
      justify-center
      items-center
      md:w-full
      w-[90%]
      mx-auto
      h-[81vh]
      md:h-fit
    "
  >
    <h1 class="text-4xl dark:text-white text-center md:text-left">
      Something's not right 🤔
    </h1>
    <h2 class="text-xl mt-2 dark:text-white text-center md:text-left">
      We got the message <span class="hidden md:inline">-&nbsp;</span>
      <span
        class="
          before:content-[open-quote]
          after:content-[close-quote]
          text-main text-xl
          block
          md:inline
        "
        >{{ error.message }}</span
      >
    </h2>
  </section>
</template>