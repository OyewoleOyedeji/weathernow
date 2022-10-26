<script setup lang="ts">
import { fetchWeather } from "~/composables/useUtilities";
import { settings } from "~/types/interfaces";

const initialLoad = useState("initialLoad");

const checkWeather = async () => {
  const initialLoad = useState<boolean>("initialLoad");
  const loading = useState("loading", () => true);
  const results = useState<{}>("results");
  const id = useState<string>("id");
  const _error = useState("error");
  const settings = useState<settings>("settings");

  if (initialLoad.value) {
    initialLoad.value = false;
  }

  loading.value = true;
  try {
    const _response = await fetchWeather(
      query.value,
      null,
      null,
      settings.value.unit,
      id.value
    );

    if (_error.value) {
      _error.value = false;
    }
    results.value = _response.value;
    loading.value = false;
  } catch (error) {
    query.value = "";
    const message = useState("errorMessage", () => "");
    if (error.data === undefined) {
      message.value = "Network request failed";
      _error.value = true;
      loading.value = false;
    } else if (error.data.message) {
      message.value = error.data.message;
      _error.value = true;
      loading.value = false;
    }
  }
  query.value = "";
};

const query = useState("query", () => "");
</script>

<template>
  <footer class="flex flex-col gap-y-5 justify-center mx-auto w-[90%] mt-24">
    <div class="items-center gap-6 flex md:hidden mx-auto" v-if="!initialLoad">
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
      >
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