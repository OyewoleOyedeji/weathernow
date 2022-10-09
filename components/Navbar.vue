<script lang="ts" setup>
import { promiseTimeout } from "@vueuse/core";
import { nanoid } from "nanoid";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";

const results = useState("results");
const loading = useState("loading", () => false);
const _error = useState("error", () => false);
const config = useRuntimeConfig();

const query = useState("query", () => "");
const id = useState("id");
const initialLoad = useState("initialLoad");
const isModalOpen = useState("isOpen");
const modal = useState("modalMessage");

const showThemeOptions = useState("showThemeOptions", () => false);

const colorMode = useColorMode();

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

const toggleModal = (type: string) => {
  const modalInfo = {
    messageType: type,
    message: "",
  };
  modal.value = modalInfo;
  isModalOpen.value = true;
};

const selectTheme = (option: string) => {
  colorMode.preference = option;
  showThemeOptions.value = false;
};

const toggleThemeOptions = useToggle(showThemeOptions);
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
      w-[85%]
      md:w-[90%]
    "
  >
    <div class="flex items-center gap-4 md:gap-6 w-9/12 lg:w-[80%]">
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
          dark:before:hover:opacity-100 dark:before:opacity-50
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
            dark:caret-orange-600 dark:placeholder:text-orange-600
            placeholder:text-main placeholder:opacity-50
            bg-transparent
            text-main
            dark:text-orange-400
          "
          v-model="query"
        />
      </div>
    </div>

    <!-- Options menu -->
    <div class="flex items-center w-[10%] md:justify-end md:gap-8 gap-5">
      <NuxtLink
        to="https://github.com/OyewoleOyedeji/weatherme"
        target="_blank"
        title="Visit GitHub repository"
        ><svg
          class="
            w-6
            h-6
            md:w-8 md:h-8
            hover:opacity-50
            transition
            dark:fill-white dark:opacity-50 dark:hover:opacity-100
          "
        >
          <use
            xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#github"
          /></svg
      ></NuxtLink>
      <Popover>
        <div class="relative">
          <PopoverButton
            class="group rotate-90 outline-none"
            @click="toggleThemeOptions()"
            title="Toggle theme"
          >
            <svg
              class="
                fill-main
                md:w-8 md:h-8
                w-6
                h-6
                group-hover:opacity-50
                transition
                dark:group-hover:opacity-100 dark:opacity-50
              "
            >
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#palette-fill"
              />
            </svg>
          </PopoverButton>
          <PopoverPanel
            class="
              absolute
              p-5
              bg-main bg-opacity-80
              left-1/2
              top-[5vh]
              -translate-x-1/2
              flex flex-col
              gap-4
              rounded-2xl
            "
            static
            v-if="showThemeOptions"
          >
            <div
              class="
                flex
                gap-4
                items-center
                px-5
                py-3
                hover:bg-main hover:bg-opacity-70
                transition
                rounded-2xl
                cursor-pointer
                hover:opacity-70
              "
              @click="selectTheme('system')"
            >
              <svg class="w-6 h-6 transition fill-white">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#laptop"
                />
              </svg>
              <h1 class="text-white">System</h1>
            </div>
            <div
              class="
                flex
                gap-4
                items-center
                px-5
                py-3
                hover:bg-main hover:bg-opacity-70
                transition
                rounded-2xl
                cursor-pointer
                hover:opacity-70
              "
              @click="selectTheme('light')"
            >
              <svg class="w-6 h-6 transition fill-white">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#brightness-high-fill"
                />
              </svg>
              <h1 class="text-white">Light</h1>
            </div>
            <div
              class="
                flex
                gap-4
                items-center
                px-5
                py-3
                hover:bg-main hover:bg-opacity-70
                transition
                rounded-2xl
                cursor-pointer
                hover:opacity-70
              "
              @click="selectTheme('dark')"
            >
              <svg class="w-6 h-6 fill-white">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#moon-fill"
                />
              </svg>
              <h1 class="text-white">Dark</h1>
            </div>
          </PopoverPanel>
        </div>
      </Popover>
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
            dark:group-hover:opacity-100 dark:opacity-50
          "
        >
          <use
            :xlink:href="
              $colorMode.preference === 'dark'
                ? '/node_modules/bootstrap-icons/bootstrap-icons.svg#gear-fill'
                : '/node_modules/bootstrap-icons/bootstrap-icons.svg#gear'
            "
          />
        </svg>
      </button>
    </div>
  </nav>
</template>