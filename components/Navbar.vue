<script setup>
import { promiseTimeout } from "@vueuse/core";
import { nanoid } from "nanoid";

const results = useState("results");
const loading = useState("loading", () => false);
const _error = useState("error", () => false);
const config = useRuntimeConfig();

const query = useState("query", () => "");
const id = useState("id");
const initialLoad = useState("initialLoad");
const isModalOpen = useState("isOpen");
const modal = useState("modalMessage");

const checkWeather = async () => {
  // Check if the query has any content
  if (query.value.length !== 0) {
    /**
     * Set loading to true and create a timeout of 2800ms (2.8s)
     * Then send a request to /api/weather with the information needed
     */

    loading.value = true;
    useTimeout(2800);
    const { data, error } = await useFetch("/api/weather", {
      method: "post",
      body: { query: query.value, useAqi: "no" },
      server: false,
      key: nanoid(config.idLength),
      headers: {
        Authorization: id.value,
      },
    });

    /**
     * Watch for a positive change for the error ref
     * and perform actions accordingly
     */

    watch(error, (_new, _old) => {
      if (_new) {
        useState("errorMessage", () => error.value.data.message);
        promiseTimeout(3000).then(() => {
          _error.value = true;
          loading.value = false;
        });
      } else {
        _error.value = false;
      }
    });

    /**
     * Search for errors initially
     */
    if (!error.value) {
      if (_error.value) {
        _error.value = false;
      }

      results.value = data.value;
      await promiseTimeout(3000);
      loading.value = false;
    } else {
      useState("errorMessage", () => error.value.data.message);
      _error.value = true;
      await promiseTimeout(3000);
      loading.value = false;
    }

    // Clear the input field
    query.value = "";

    // Set initial load to false after 1st request
    if (initialLoad.value) {
      initialLoad.value = false;
    }
  } else if (query.value.length === 0) {
    // Create a modal for when a user doesn't enter anything in the input
    const modalInfo = {
      messageType: "warning",
      message: "You didn't type anything to search 😂",
    };

    modal.value = modalInfo;
    isModalOpen.value = true;
  }
};

const toggleModal = (type) => {
  const modalInfo = {
    messageType: type,
    message: "",
  };
  modal.value = modalInfo;
  isModalOpen.value = true;
};
</script>

<template>
  <nav
    class="
      flex
      container
      mx-auto
      mt-10
      justify-around
      md:justify-between
      items-center
      w-[90%]
    "
  >
    <div class="flex items-center gap-4 md:gap-6 w-[80%] lg:w-[85%]">
      <!-- Search button -->
      <button class="group" title="Check the weather!" @click="checkWeather()">
        <svg class="transition fill-main group-hover:opacity-50 w-8 h-8">
          <use
            xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#check-circle-fill"
          />
        </svg>
      </button>

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
          before:transition
        "
      >
        <input
          name="search"
          type="text"
          placeholder="What's the weather of ?!"
          class="
            w-full
            placeholder:text-xl
            outline-none
            caret-main
            placeholder:text-main placeholder:opacity-50
            text-main
          "
          v-model="query"
        />
      </div>
    </div>

    <!-- Options menu -->
    <div class="flex items-center w-[10%] md:justify-end gap-8">
      <NuxtLink
        to="https://github.com/OyewoleOyedeji/weatherme"
        target="_blank"
        title="Visit GitHub repository"
        ><svg class="w-8 h-8 hover:opacity-50 transition">
          <use
            xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#github"
          /></svg
      ></NuxtLink>
      <button
        class="group"
        title="Toggle settings"
        @click="toggleModal('settings')"
      >
        <svg
          class="
            fill-main
            w-8
            h-8
            hidden
            md:block
            group-hover:opacity-50
            transition
          "
        >
          <use
            xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#gear"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>