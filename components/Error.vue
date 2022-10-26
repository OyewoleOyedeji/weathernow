<script setup lang="ts">
interface errorMessage {
  message: string;
}
const message = useState<errorMessage>("errorMessage");
</script>

<template>
  <section class="flex h-screen flex-col justify-center items-center w-full">
    <h1 class="text-4xl">Something's not right 🤔</h1>
    <h2 class="text-xl mt-2">
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