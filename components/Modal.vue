<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  Switch,
} from "@headlessui/vue";

const isOpen = useState("isOpen", () => false);
const modalInfo = useState("modalMessage", () => {
  const blob = {
    messageType: null,
    message: "",
  };
  return blob;
});

const useCelsuis = useState("useCelsuis", () => true);

const settings = useState("settings", () => {
  const _settings = {
    useAirQuality: false,
    defaultTemperature: "celsuis",
  };
  return _settings;
});

onMounted(() => {
  if (window.localStorage) {
    const _settings = window.localStorage.getItem("settings");
    if (_settings) {
      settings.value = JSON.parse(_settings);
    } else {
      console.log(settings.value);
      window.localStorage.setItem("settings", JSON.stringify(settings.value));
    }

    watch(
      settings,
      (_new) => {
        window.localStorage.setItem("settings", JSON.stringify(_new));
      },
      { deep: true }
    );

    watch(useCelsuis, (_new) => {
      if (!_new) {
        settings.value.defaultTemperature = "fahrenheit";
      } else {
        settings.value.defaultTemperature = "celsuis";
      }
    });
  }
});

const closeModal = () => (isOpen.value = false);
</script>


<template>
  <TransitionRoot appear :show="isOpen" as="template">
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
                transform
                overflow-hidden
                rounded-2xl
                bg-white
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
                :class="`text-xl font-semibold leading-6 flex items-center gap-2 ${
                  modalInfo.messageType === 'warning'
                    ? 'text-main opacity-70'
                    : ''
                }`"
              >
                {{
                  modalInfo.messageType === "warning"
                    ? "Warning"
                    : modalInfo.messageType === "settings"
                    ? "Settings"
                    : ""
                }}
                <svg
                  class="fill-main w-5 h-5 inline"
                  v-if="modalInfo.messageType === 'warning'"
                >
                  <use
                    xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#exclamation-triangle-fill"
                  />
                </svg>
                <svg
                  class="fill-main w-5 h-5 inline"
                  v-if="modalInfo.messageType === 'settings'"
                >
                  <use
                    xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#gear"
                  />
                </svg>
              </DialogTitle>
              <div class="mt-2">
                <p
                  class="text-lg text-gray-500"
                  v-if="modalInfo.messageType !== 'settings'"
                >
                  {{ modalInfo.message }}
                </p>
                <div
                  class="flex flex-col"
                  v-else-if="modalInfo.messageType === 'settings'"
                >
                  <div class="flex justify-between mt-4">
                    <h4>Display temperature 🌡️ in (&deg;C/&deg;F)</h4>
                    <Switch
                      v-model="useCelsuis"
                      :class="`bg-main relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        !useCelsuis ? 'opacity-100' : 'opacity-50'
                      }`"
                    >
                      <span class="sr-only">Show the air quality</span>
                      <span
                        :class="`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          !useCelsuis ? 'translate-x-6' : 'translate-x-1'
                        }`"
                      ></span>
                    </Switch>
                  </div>
                  <div class="flex justify-between mt-4">
                    <h4>Show the air quality 🍃</h4>
                    <Switch
                      v-model="settings.useAirQuality"
                      :class="`bg-main relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        settings.useAirQuality ? 'opacity-100' : 'opacity-50'
                      }`"
                    >
                      <span class="sr-only">Show the air quality</span>
                      <span
                        :class="`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          settings.useAirQuality
                            ? 'translate-x-6'
                            : 'translate-x-1'
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
                  "
                  @click="closeModal"
                  title="Close me"
                >
                  <div class="flex gap-2 items-center">
                    {{
                      modalInfo.messageType === "warning" ||
                      modalInfo.messageType === "error"
                        ? "Got it, thanks"
                        : modalInfo.messageType === "settings"
                        ? "Done"
                        : ""
                    }}
                    <svg
                      class="fill-white w-5 h-5"
                      v-if="modalInfo.messageType === 'settings'"
                    >
                      <use
                        xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#check-circle-fill"
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