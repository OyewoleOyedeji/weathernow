<script setup lang="ts">
const loading = useState("loading");
const initialLoad = useState("initialLoad");
const error = useState("error");
</script>

<template>
  <main
    class="
      flex
      container
      mx-auto
      w-full
      h-[81vh]
      2xl:h-[87vh]
      xl:h-[81vh]
      items-center
      selection:bg-main selection:bg-opacity-30
      transition
    "
  >
    <div
      class="px-10 w-full flex flex-col items-center dark:text-white"
      v-if="!loading && initialLoad"
    >
      <h1 class="text-5xl md:text-7xl mb-2">Hola 👋</h1>
      <h2 class="text-2xl md:text-4xl text-center">
        Where do you want to find the weather of?
      </h2>
    </div>
    <Loading v-else-if="loading" />
    <Results v-else-if="!loading && !initialLoad && !error" />
    <Error v-else-if="error" />
  </main>
</template>