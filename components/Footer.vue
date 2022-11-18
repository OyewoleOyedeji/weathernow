<script setup lang="ts">
import { fetchWeather } from "~/composables/useUtilities";
import { settings, error } from "~/types/interfaces";

const initialLoad = useState<boolean>("initialLoad");
const query = useState<string>("query");

const checkWeather = async () => {
  const loading = useState<boolean>("loading");
  const results = useState<{}>("results");
  const id = useState<string>("id");
  const error = useState<error>("error");
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
  <footer class="flex flex-col gap-y-5 justify-center mx-auto w-[90%]">
    <div
      class="items-center gap-6 flex md:hidden mx-auto mt-28"
      v-if="!initialLoad"
    >
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
          placeholder="What's your city ?!"
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
        type="button"
      >
        <span class="sr-only">Check the weather!</span>
        <svg
          class="transition fill-main disabled:opacity-50 w-8 h-8"
          :class="query.length > 0 ? 'group-hover:opacity-50' : ''"
        >
          <use xlink:href="/bootstrap-icons.svg#check-circle-fill" />
        </svg>
      </button>
    </div>
    <h1 class="text-xl text-center dark:text-white my-2">
      Made with ❤️ and 🍞 by
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