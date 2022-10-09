<script setup>
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
      h-screen
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
    <div class="animate-pulse" v-else-if="loading">
      <div class="flex flex-col">
        <div
          class="
            relative
            before:content-['']
            before:absolute
            before:h-32
            before:w-32
            before:bg-gray-400
            before:rounded-full
            before:flex
          "
        >
          <div
            class="
              relative
              before:absolute before:content-[''] before:h-32 before:w-32
            "
          ></div>
        </div>
      </div>
    </div>
    <Results v-else-if="!loading && !initialLoad && !error" />
    <Error v-else-if="error" />
  </main>
</template>