<script setup>
const loading = useState("loading");
const initialLoad = useState("initialLoad");
const results = useState("results");
const settings = useState("settings");
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
    "
  >
    <div
      class="px-10 w-full flex flex-col items-center"
      v-if="!loading && initialLoad"
    >
      <h1 class="text-7xl mb-2">Hola 👋</h1>
      <h2 class="text-4xl text-center">
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
    <div v-else-if="!loading && !initialLoad && !error" class="w-full">
      <div class="flex flex-col">
        <div class="flex items-center justify-around">
          <div class="flex items-center">
            <!-- <svg class="w-32 h-32">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#cloud-lightning-rain"
              />
            </svg> -->
            <img
              :src="`https:${results.data.current.condition.icon}`"
              :alt="results.data.current.condition.text"
            />
            <div class="flex flex-col mx-10">
              <h1 class="text-5xl mb-2">{{ results.data.location.name }}</h1>
              <h2 class="text-3xl text-gray-500">
                / {{ results.data.location.country }}
              </h2>
            </div>
          </div>
          <div>
            <h1 class="text-7xl">
              {{
                settings.defaultTemperature === "celsuis"
                  ? results.data.current.temp_c
                  : results.data.current.temp_f
              }}&deg;{{ settings.defaultTemperature === "celsuis" ? "C" : "F" }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <Error v-else-if="error" />
  </main>
</template>