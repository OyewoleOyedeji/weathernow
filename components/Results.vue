<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";

const results = useState("results");
const settings = useState("settings");
</script>

<template>
  <div class="w-full">
    <div class="flex flex-col">
      <div class="flex items-center justify-around mb-10">
        <div class="flex items-center">
          <img
            :src="`https:${results.data.current.condition.icon}`"
            :alt="results.data.current.condition.text"
            :title="results.data.current.condition.text"
          />
          <div class="flex flex-col mx-10">
            <h1 class="text-5xl mb-2 dark:text-white">
              {{ results.data.location.name }}
            </h1>
            <h2 class="text-3xl text-gray-500">
              / {{ results.data.location.country }}
            </h2>
          </div>
        </div>
        <div>
          <h1 class="text-7xl dark:text-white">
            {{
              settings.defaultTemperature === "celsuis"
                ? results.data.current.temp_c
                : results.data.current.temp_f
            }}&deg;{{ settings.defaultTemperature === "celsuis" ? "C" : "F" }}
          </h1>
        </div>
      </div>
      <TabGroup>
        <TabList class="flex justify-center gap-24 text-xl">
          <Tab
            class="
              pb-2
              ui-selected:border-b
              border-main
              ui-selected:text-main
              transition
              hover:opacity-50
              dark:opacity-50
              dark:hover:opacity-100
              dark:text-white
              dark:ui-selected:text-main
            "
            title="View general information"
            >Information</Tab
          >
          <Tab
            class="
              ui-selected:text-main ui-selected:border-b
              border-main
              pb-2
              transition
              hover:opacity-50
              dark:opacity-50
              dark:hover:opacity-100
              dark:text-white
              dark:ui-selected:text-main
            "
            title="View wind information"
            >Wind stats</Tab
          >
          <Tab
            class="
              ui-selected:text-main ui-selected:border-b
              border-main
              pb-2
              transition
              hover:opacity-50
              dark:opacity-50
              dark:hover:opacity-100
              dark:text-white
              dark:ui-selected:text-main
            "
            title="View atmosphere information"
            >Atmosphere</Tab
          >
        </TabList>
        <TabPanels>
          <!-- Information tab content -->
          <TabPanel class="flex justify-center gap-32 mt-10">
            <!-- Region -->
            <div class="flex items-center gap-6">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#map"
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    before:absolute
                    before:content-['']
                    before:w-[20%]
                    before:h-1
                    before:bg-gray-500
                    before:-bottom-1
                    relative
                    text-lg text-gray-600
                    dark:text-white dark:before:bg-white
                    before:rounded-full
                  "
                >
                  Your region
                </h1>
                <h2 class="text-xl text-main">
                  {{ results.data.location.region }}
                </h2>
              </div>
            </div>

            <!-- Temperature -->
            <div class="flex text-xl items-center text-main gap-4">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#thermometer-low"
                  v-if="
                    (settings.defaultTemperature === 'celsuis' &&
                      results.data.current.feelslike_c < 8) ||
                    (settings.defaultTemperature === 'fahrenheit' &&
                      results.data.current.feelslike_f < 40)
                  "
                />
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#thermometer-high"
                  v-else-if="
                    (settings.defaultTemperature === 'celsuis' &&
                      results.data.current.feelslike_c > 37) ||
                    (settings.defaultTemperature === 'fahrenheit' &&
                      results.data.current.feelslike_f > 98.6)
                  "
                />
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#thermometer-half"
                  v-else-if="
                    (settings.defaultTemperature === 'celsuis' &&
                      !(results.data.current.feelslike_c < 8) &&
                      !(results.data.current.feelslike_c > 37)) ||
                    (settings.defaultTemperature === 'fahrenheit' &&
                      !(results.data.current.feelslike_f < 40) &&
                      !(results.data.current.feelslike_f > 98.6))
                  "
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    text-md text-gray-500
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/2
                    before:h-1
                    before:bg-gray-500
                    before:rounded-full
                    dark:before:bg-white dark:text-white
                    before:-bottom-1
                  "
                >
                  It feels
                </h1>
                <h2
                  v-if="
                    (settings.defaultTemperature === 'celsuis' &&
                      results.data.current.feelslike_c < 8) ||
                    (settings.defaultTemperature === 'fahrenheit' &&
                      results.data.current.feelslike_f < 40)
                  "
                >
                  Cold
                </h2>
                <h2
                  v-else-if="
                    (settings.defaultTemperature === 'celsuis' &&
                      results.data.current.feelslike_c > 37) ||
                    (settings.defaultTemperature === 'fahrenheit' &&
                      results.data.current.feelslike_f > 98.6)
                  "
                >
                  Hot
                </h2>
                <h2
                  v-else-if="
                    (settings.defaultTemperature === 'celsuis' &&
                      !(results.data.current.feelslike_c < 8) &&
                      !(results.data.current.feelslike_c > 37)) ||
                    (settings.defaultTemperature === 'fahrenheit' &&
                      !(results.data.current.feelslike_f < 40) &&
                      !(results.data.current.feelslike_f > 98.6))
                  "
                >
                  Average
                </h2>
              </div>
            </div>

            <!-- Period -->
            <div class="flex items-center gap-6">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#sun-fill"
                  v-if="results.data.current.is_day === 1"
                />
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#moon-stars-fill"
                  v-else-if="results.data.current.is_day === 0"
                />
              </svg>
              <div class="flex flex-col gap-4 text-main">
                <h1
                  class="
                    text-lg text-gray-500
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/2
                    before:h-1
                    before:bg-gray-500
                    before:-bottom-1
                    before:rounded-full
                    dark:before:bg-white dark:text-white
                  "
                >
                  Period
                </h1>
                <h2 v-if="results.data.current.is_day === 1">Day</h2>
                <h2 v-else-if="results.data.current.is_day === 0">Night</h2>
              </div>
            </div>
          </TabPanel>

          <!-- Wind stats tab content -->
          <TabPanel class="flex justify-center mt-10">
            <div class="flex gap-6 w-1/4 items-center justify-center">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#arrow-90deg-down"
                  v-if="results.data.current.wind_dir === 'S'"
                />
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#arrow-90deg-up"
                  v-else-if="results.data.current.wind_dir === 'N'"
                />
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#arrow-90deg-left"
                  v-else-if="results.data.current.wind_dir === 'W'"
                />
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#arrow-90deg-right"
                  v-else-if="results.data.current.wind_dir === 'E'"
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    text-lg text-gray-600
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/2
                    before:h-1
                    before:bg-gray-500
                    before:rounded-full
                    before:-bottom-1
                    dark:text-white dark:before:bg-white
                  "
                >
                  Wind direction
                </h1>
                <h2 class="text-main text-lg">
                  {{
                    results.data.current.wind_dir === "W"
                      ? "West"
                      : results.data.current.wind_dir === "E"
                      ? "East"
                      : results.data.current.wind_dir === "S"
                      ? "South"
                      : results.data.current.wind_dir === "N"
                      ? "North"
                      : ""
                  }}
                </h2>
              </div>
            </div>
            <div class="flex gap-6 w-1/4 items-center justify-center">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#wind"
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    text-lg text-gray-600
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/2
                    before:h-1
                    before:bg-gray-500
                    before:rounded-full
                    before:-bottom-1
                    dark:before:bg-white dark:text-white
                  "
                >
                  Wind gust
                </h1>
                <h2
                  :class="`text-main text-lg after:ml-1  ${
                    settings.defaultUnit === 'km/hr'
                      ? `after:content-['km/hr']`
                      : `after:content-['m/hr']`
                  }`"
                >
                  {{
                    settings.defaultUnit === "km/hr"
                      ? results.data.current.gust_kph
                      : results.data.current.gust_mph
                  }}
                </h2>
              </div>
            </div>
            <div class="flex gap-6 w-1/4 items-center justify-center">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#speedometer2"
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    text-lg text-gray-600
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/2
                    before:h-1
                    before:bg-gray-500
                    before:rounded-full
                    before:-bottom-1
                    dark:before:bg-white dark:text-white
                  "
                >
                  Wind speed
                </h1>
                <h2
                  :class="`text-main text-lg after:ml-1  ${
                    settings.defaultUnit === 'km/hr'
                      ? `after:content-['km/hr']`
                      : `after:content-['m/hr']`
                  }`"
                >
                  {{
                    settings.defaultUnit === "km/hr"
                      ? results.data.current.wind_kph
                      : results.data.current.wind_mph
                  }}
                </h2>
              </div>
            </div>
          </TabPanel>

          <!-- Atmosphere tab content -->
          <TabPanel class="flex justify-center gap-16 mt-10 w-full flex-wrap">
            <!-- Cloud % -->
            <div class="flex gap-6 w-1/4 items-center justify-center">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#clouds"
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    text-lg text-gray-600
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/2
                    before:h-1
                    before:bg-gray-500
                    before:-bottom-1
                    before:rounded-full
                    dark:before:bg-white dark:text-white
                  "
                >
                  Cloud %
                </h1>
                <h2 class="text-main text-lg">
                  {{ results.data.current.cloud }}
                </h2>
              </div>
            </div>

            <!-- Humidity % -->
            <div class="flex gap-6 w-1/4 items-center justify-center">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#moisture"
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    text-lg text-gray-600
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/2
                    before:h-1
                    before:bg-gray-500
                    before:-bottom-1
                    before:rounded-full
                    dark:before:bg-white dark:text-white
                  "
                >
                  Humidity %
                </h1>
                <h2 class="text-main text-lg">
                  {{ results.data.current.humidity }}
                </h2>
              </div>
            </div>

            <!-- UV index -->
            <div class="flex gap-6 w-1/4 items-center justify-center">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#sun"
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    text-lg text-gray-600
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/2
                    before:h-1
                    before:bg-gray-500
                    before:-bottom-1
                    before:rounded-full
                    dark:before:bg-white dark:text-white
                  "
                >
                  UV index
                </h1>
                <h2 class="text-main text-lg">
                  {{ results.data.current.uv }}
                </h2>
              </div>
            </div>

            <!-- Pressure (inches) -->
            <div class="flex gap-6 w-1/4 items-center justify-center">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#sort-numeric-down-alt"
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    text-lg text-gray-600
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/2
                    before:h-1
                    before:bg-gray-500
                    before:-bottom-1
                    before:rounded-full
                    dark:before:bg-white dark:text-white
                  "
                >
                  Pressure (inches)
                </h1>
                <h2 class="text-main text-lg">
                  {{ results.data.current.pressure_in }}
                </h2>
              </div>
            </div>

            <!-- Precipitation (inches) -->
            <div class="flex gap-6 w-1/4 items-center justify-center">
              <svg class="w-20 h-20 fill-main">
                <use
                  xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#umbrella"
                />
              </svg>
              <div class="flex flex-col gap-4">
                <h1
                  class="
                    text-lg text-gray-600
                    relative
                    before:absolute
                    before:content-['']
                    before:w-1/4
                    before:h-1
                    before:bg-gray-500
                    before:-bottom-1
                    before:rounded-full
                    dark:before:bg-white dark:text-white
                  "
                >
                  Precipitation (inches)
                </h1>
                <h2 class="text-main text-lg">
                  {{ results.data.current.precip_in }}
                </h2>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </div>
</template>