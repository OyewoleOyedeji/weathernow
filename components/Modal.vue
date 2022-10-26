<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Switch,
} from "@headlessui/vue";
import { promiseTimeout } from "@vueuse/core";

interface settings {
  useBrowserLocation: boolean;
  unit: string;
}

const isModalOpen = useState("isModalOpen", () => false);
const settings = useState<settings>("settings");
const useBrowserLocation = useState("temporaryUseBrowserLocation");

onMounted(async () => {
  if (window.localStorage) {
    watch(
      settings,
      (_new) => {
        window.localStorage.setItem("settings", JSON.stringify(_new));
      },
      { deep: true }
    );
  }
  await promiseTimeout(100);
  useState(
    "temporaryUseBrowserLocation",
    () => settings.value.useBrowserLocation
  );

  watch(useBrowserLocation, (_new) => {
    settings.value.useBrowserLocation = _new ? true : false;
  });
});

const closeModal = () => (isModalOpen.value = false);
</script>


<template>
  <TransitionRoot appear :show="isModalOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10" title="Close me">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="
                w-full
                max-w-md
                h-[80vh]
                md:h-fit
                flex flex-col
                md:block
                justify-center
                md:justify-start
                transform
                overflow-hidden
                rounded-2xl
                bg-white
                dark:bg-black
                p-6
                text-left
                align-middle
                shadow-xl
                transition-all
              "
              title=""
            >
              <DialogTitle
                as="h3"
                class="
                  text-xl
                  font-semibold
                  leading-6
                  flex
                  items-center
                  gap-2
                  dark:text-white
                "
              >
                Settings
                <svg class="fill-main w-5 h-5 inline">
                  <use xlink:href="/bootstrap-icons.svg#gear" />
                </svg>
              </DialogTitle>
              <div class="mt-2">
                <div class="flex flex-col">
                  <div class="flex flex-col mt-4 dark:text-white">
                    <h4>Measurement to use 📏</h4>
                    <div class="flex gap-6 justify-center my-5">
                      <button
                        @click="settings.unit = 'standard'"
                        :class="settings.unit === 'standard' ? 'text-main' : ''"
                      >
                        Standard
                      </button>
                      <button
                        @click="settings.unit = 'imperial'"
                        :class="settings.unit === 'imperial' ? 'text-main' : ''"
                      >
                        Imperial
                      </button>
                      <button
                        @click="settings.unit = 'metric'"
                        :class="settings.unit === 'metric' ? 'text-main' : ''"
                      >
                        Metric
                      </button>
                    </div>
                  </div>
                  <div class="flex justify-between mt-4 dark:text-white">
                    <h4>Use your location to find the weather</h4>
                    <Switch
                      v-model="useBrowserLocation"
                      :class="`bg-main relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        useBrowserLocation ? 'opacity-100' : 'opacity-50'
                      }`"
                    >
                      <span class="sr-only"
                        >Use your weather to find the weather</span
                      >
                      <span
                        :class="`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          useBrowserLocation ? 'translate-x-6' : 'translate-x-1'
                        }`"
                      ></span>
                    </Switch>
                  </div>
                </div>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="
                    inline-flex
                    justify-center
                    rounded-md
                    border border-transparent
                    bg-main
                    px-4
                    py-2
                    text-md
                    font-medium
                    transition
                    text-white
                    hover:opacity-50
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-main
                    focus-visible:ring-offset-2
                    dark:opacity-50 dark:hover:opacity-100
                  "
                  @click="closeModal"
                  title="Close me"
                >
                  <div class="flex gap-2 items-center">
                    Done
                    <svg class="fill-white w-5 h-5">
                      <use
                        xlink:href="/bootstrap-icons.svg#check-circle-fill"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>