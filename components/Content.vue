<script setup lang="ts">
import { fetchWeather } from "~/composables/useUtilities";
import { settings, error } from "~/types/interfaces";

const loading = useState<boolean>("loading");
const initialLoad = useState<boolean>("initialLoad");
const error = useState<error>("error");
const query = useState<string>("query");

const checkWeather = async () => {
  const results = useState<{}>("results");
  const id = useState<string>("id");
  const settings = useState<settings>("settings");

  loading.value = true;

  if (initialLoad.value) {
    initialLoad.value = false;
  }

  const { _response, error: responseError } = await fetchWeather(
    query.value.trim(),
    null,
    settings.value.unit,
    id.value
  );

  if (responseError.value.hasOccurred) {
    error.value = responseError.value;
    loading.value = false;
  } else {
    results.value = _response.value;
    loading.value = false;
  }

  query.value = "";
};
</script>

<template>
  <main
    class="
      flex
      container
      mx-auto
      w-full
      md:h-screen
      items-center
      selection:bg-main selection:bg-opacity-30
      transition
    "
  >
    <div
      class="
        px-10
        w-full
        flex flex-col
        items-center
        justify-center
        dark:text-white
        h-screen
        md:h-fit
      "
      v-if="!loading && initialLoad"
    >
      <h1 class="text-5xl md:text-7xl mb-2">Hola 👋</h1>
      <h2 class="text-2xl md:text-4xl text-center">What's the weather of ?</h2>
      <div class="items-center gap-6 flex md:hidden w-[90%] mt-10 mx-auto">
        <!-- Search input -->
        <div
          class="
            relative
            w-full
            before:absolute
            before:content-['']
            before:border-main
            before:w-full
            before:border
            before:-bottom-3
            before:hover:opacity-70
            dark:before:hover:opacity-100 dark:before:opacity-50
            before:transition
          "
        >
          <input
            name="search"
            type="text"
            placeholder="Your city ?!"
            class="
              w-full
              placeholder:text-xl
              outline-none
              caret-main
              dark:caret-white dark:placeholder:text-white
              placeholder:text-main placeholder:opacity-50
              bg-transparent
              text-main
              dark:text-white
            "
            v-model="query"
          />
        </div>

        <!-- Search button -->
        <button
          class="group disabled:opacity-50"
          title="Check the weather!"
          @click="checkWeather()"
          :disabled="query.length === 0"
        >
          <svg
            class="transition fill-main disabled:opacity-50 w-8 h-8"
            :class="query.length > 0 ? 'group-hover:opacity-50' : ''"
          >
            <use xlink:href="/bootstrap-icons.svg#check-circle-fill" />
          </svg>
        </button>
      </div>
    </div>
    <Loading v-else-if="loading" />
    <Results v-else-if="!loading && !initialLoad && !error" />
    <Error v-else-if="error.hasOccurred" />
  </main>
</template>