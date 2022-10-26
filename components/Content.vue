<script setup lang="ts">
import { fetchWeather } from "~/composables/useUtilities";

interface settings {
  useBrowserLocation: boolean;
  unit: string;
}

const loading = useState("loading");
const initialLoad = useState("initialLoad");
const error = useState("error");

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
    if (error.data.message) {
      message.value = error.data.message;
      _error.value = true;
      loading.value = false;
    }
  }
};

const query = useState("query", () => "");
</script>

<template>
  <main
    class="
      flex
      container
      mx-auto
      w-full
      md:h-[82vh]
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
      "
      v-if="!loading && initialLoad"
    >
      <h1 class="text-5xl md:text-7xl mb-2">Hola 👋</h1>
      <h2 class="text-2xl md:text-4xl text-center">
        Where do you want to find the weather of?
      </h2>
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
    <Error v-else-if="error" />
  </main>
</template>