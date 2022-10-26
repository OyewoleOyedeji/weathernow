<script setup lang="ts">
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  TransitionRoot,
} from "@headlessui/vue";

import { fetchWeather } from "~/composables/useUtilities";

interface errorMessage {
  message: string;
}

interface settings {
  useBrowserLocation: boolean;
  unit: string;
}

const settings = useState<settings>("settings");
const isSettingsOpen = useState<boolean>("isModalOpen");
const query = useState<string>("query", () => "");

const showThemeOptions = useState("showThemeOptions", () => false);

const checkWeather = async () => {
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

// const toggleModal = (type: string) => useToggleModal(type);
const toggleSettings = () => useToggle(isSettingsOpen)();

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
      justify-around
      md:justify-between
      items-center
      w-[85%]
      md:w-[90%]
    "
  >
    <div class="flex items-center gap-4 md:gap-6 w-9/12 lg:w-[80%]">
      <!-- Search button -->
      <button
        class="group disabled:opacity-50"
        title="Check the weather!"
        @click="checkWeather()"
        :disabled="query.length === 0"
      >
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
                dark:group-hover:opacity-100 dark:opacity-50 dark:hidden
              "
            >
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#palette-fill"
              />
            </svg>
            <svg
              class="
                fill-main
                md:w-8 md:h-8
                w-6
                h-6
                group-hover:opacity-50
                transition
                dark:group-hover:opacity-100 dark:opacity-50
                hidden
                dark:block
              "
            >
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#palette"
              />
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
          </TransitionRoot>
        </div>
      </Popover>
      <button class="group" title="Toggle settings" @click="toggleSettings()">
        <svg
          class="
            fill-main
            w-8
            h-8
            hidden
            md:block
            group-hover:opacity-50
            transition
            dark:group-hover:opacity-100 dark:opacity-50 dark:hidden
          "
        >
          <use
            xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#gear-fill"
          />
        </svg>
        <svg
          class="
            fill-main
            w-8
            h-8
            hidden
            group-hover:opacity-50
            transition
            dark:group-hover:opacity-100 dark:opacity-50 dark:block
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