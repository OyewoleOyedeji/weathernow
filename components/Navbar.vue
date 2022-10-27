<script setup lang="ts">
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  TransitionRoot,
} from "@headlessui/vue";

import { fetchWeather } from "~/composables/useUtilities";
import { settings } from "~/types/interfaces";

const isModalOpen = useState<boolean>("isModalOpen");
const query = useState<string>("query", () => "");

const showThemeOptions = useState("showThemeOptions", () => false);

const checkWeather = async () => {
  const settings = useState<settings>("settings");
  const initialLoad = useState<boolean>("initialLoad");
  const loading = useState("loading", () => true);
  const results = useState<{}>("results");
  const id = useState<string>("id");
  const _error = useState("error");

  if (initialLoad.value) {
    initialLoad.value = false;
  }

  loading.value = true;
  try {
    const _response = await fetchWeather(
      query.value.trim(),
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

const toggleSettings = () => useToggle(isModalOpen)();

const selectTheme = (option: string) => useSelectTheme(option);

const toggleThemeOptions = useToggle(showThemeOptions);
</script>

<template>
  <nav
    class="
      flex
      container
      mx-auto
      mt-10
      justify-center
      md:justify-between md:items-center
      w-[90%]
    "
  >
    <div class="items-center gap-6 hidden md:flex lg:w-[70%] xl:w-full">
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
          placeholder="Enter your location ?!"
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
    </div>

    <!-- Other half of the navigation -->
    <div class="flex items-center w-3/12 justify-center gap-3 lg:gap-5">
      <!-- GitHub -->
      <NuxtLink
        to="https://github.com/OyewoleOyedeji/weathernow"
        target="_blank"
        title="Visit project repository"
        class="
          p-3
          bg-main bg-opacity-60
          rounded-2xl
          hover:bg-opacity-70
          transition-colors
          duration-[300ms]
          dark:hover:bg-opacity-80
          group
        "
        ><span class="sr-only">Visit project repository</span
        ><svg
          class="
            w-6
            h-6
            opacity-60
            md:w-8 md:h-8
            transition
            dark:fill-white dark:opacity-50 dark:group-hover:opacity-80
          "
        >
          <use xlink:href="/bootstrap-icons.svg#github" /></svg
      ></NuxtLink>

      <Popover>
        <div class="relative">
          <!-- Toggle theme -->
          <PopoverButton
            class="
              group
              dark:hover:bg-opacity-80
              rotate-90
              outline-none
              p-3
              bg-main bg-opacity-60
              rounded-2xl
              hover:bg-opacity-70
              transition-colors
              duration-[300ms]
            "
            @click="toggleThemeOptions()"
            title="Toggle theme"
          >
            <span class="sr-only">Toggle theme</span>
            <svg
              class="
                fill-black
                opacity-60
                md:w-8 md:h-8
                w-6
                h-6
                dark:group-hover:opacity-80 dark:opacity-50 dark:fill-white
                transition
              "
            >
              <use xlink:href="/bootstrap-icons.svg#palette-fill" />
            </svg>
          </PopoverButton>
          <TransitionRoot
            :show="showThemeOptions"
            enter="transition ease-in-out duration-200"
            enter-from="translate-y-2"
            enter-to="translate-y-4"
            leave-from="translate-y-4"
            leave-to="translate-y-2"
            leave="transition ease-in-out duration-200"
          >
            <PopoverPanel
              class="
                absolute
                p-5
                bg-main bg-opacity-80
                left-1/2
                translate-y-4
                -translate-x-1/2
                flex flex-col
                gap-4
                rounded-2xl
                z-10
              "
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
                  <use xlink:href="/bootstrap-icons.svg#laptop" />
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
                  <use xlink:href="/bootstrap-icons.svg#brightness-high-fill" />
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
                  <use xlink:href="/bootstrap-icons.svg#moon-fill" />
                </svg>
                <h1 class="text-white">Dark</h1>
              </div>
            </PopoverPanel>
          </TransitionRoot>
        </div>
      </Popover>

      <!-- Toggle settings -->
      <button
        class="
          group
          p-3
          bg-main bg-opacity-60
          rounded-2xl
          hover:bg-opacity-70
          dark:hover:bg-opacity-80
          duration-[300ms]
        "
        title="Toggle settings"
        @click="toggleSettings()"
      >
        <span class="sr-only">Toggle settings</span>
        <svg
          class="
            fill-black
            opacity-60
            dark:fill-white
            w-6
            h-6
            md:w-8 md:h-8
            transition
            dark:group-hover:opacity-80 dark:opacity-50
          "
        >
          <use xlink:href="/bootstrap-icons.svg#gear-fill" />
        </svg>
      </button>
    </div>
  </nav>
</template>