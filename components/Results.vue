<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import tippy from "tippy.js";
import {
  calculateDirection,
  countryCodeConverter,
  dateFormatter,
  thermometer,
} from "~/composables/useUtilities";

import { settings } from "~/types/interfaces";

import "tippy.js/dist/tippy.css";

interface results {
  data: any;
}

const results = useState<results>("results");
const settings = useState<settings>("settings");

onMounted(() => {
  tippy("#weather-icon", {
    content: `${(results.value.data.weather[0].description as string)
      .charAt(0)
      .toUpperCase()}${(
      results.value.data.weather[0].description as string
    ).slice(1)}`,
    theme: "light",
  });
});

const convertCodeToCountry = (countryCode: string) =>
  countryCodeConverter(countryCode);

const { name: countryName } = await convertCodeToCountry(
  results.value.data.sys.country
);

const { direction } = calculateDirection(results.value.data.wind.deg);
const { parsedDate: parsedDateSunrise } = await dateFormatter(
  results.value.data.sys.sunrise
);
const { parsedDate: parsedDateSunset } = await dateFormatter(
  results.value.data.sys.sunset
);

const { temperature } = thermometer(
  results.value.data.main.feels_like,
  settings.value.unit
);
</script>

<template>
  <div class="w-[90%] mx-auto">
    <!-- Section containing weather icon, city and country name and temperature -->
    <div
      class="
        flex
        justify-between
        items-center
        flex-col
        md:flex-row
        mt-28
        md:mt-0
      "
    >
      <div class="flex items-center gap-4 flex-col md:flex-row">
        <img
          :src="`http://openweathermap.org/img/wn/${results.data.weather[0].icon}@2x.png`"
          :alt="`${results.data.weather[0].main} icon`"
          id="weather-icon"
        />
        <div class="flex flex-col">
          <h1 class="text-2xl md:text-5xl dark:text-white">
            {{ results.data.name }}
          </h1>
          <div class="flex items-center gap-3">
            <h2 class="text-xl md:text-3xl text-slate-500 dark:text-main">
              / {{ countryName }}
            </h2>
            <h3
              class="
                text-xl
                bg-main
                dark:text-white
                bg-opacity-50
                px-3
                py-2
                rounded-full
              "
            >
              {{ results.data.sys.country }}
            </h3>
          </div>
        </div>
      </div>
      <h1
        class="
          text-5xl
          md:text-7xl
          dark:text-white
          opacity-80
          order-first
          md:order-last
        "
      >
        {{ results.data.main.temp }}&nbsp;{{
          settings.unit === "standard"
            ? "K"
            : settings.unit === "metric"
            ? "&deg;C"
            : "&deg;F"
        }}
      </h1>
    </div>

    <!-- Section containing the tabs -->
    <TabGroup>
      <TabList class="flex justify-center gap-5 md:gap-10 text-xl my-10">
        <Tab
          class="
            ui-selected:text-main ui-selected:underline
            underline-offset-8
            transition
            dark:text-gray-300
            ui-selected:dark:text-white
          "
          >General</Tab
        >
        <Tab
          class="
            ui-selected:text-main ui-selected:underline
            underline-offset-8
            transition
            dark:text-gray-300
            ui-selected:dark:text-white
          "
          >Environment</Tab
        >
        <Tab
          class="
            ui-selected:text-main ui-selected:underline
            underline-offset-8
            transition
            dark:text-gray-300
            ui-selected:dark:text-white
          "
          >Wind</Tab
        >
      </TabList>
      <TabPanels>
        <!-- Coordinates, sunrise and sunset panel -->
        <TabPanel
          class="flex items-center justify-around flex-col md:flex-row gap-y-10"
        >
          <!-- Coordinates -->
          <div class="flex md:w-1/3 w-full justify-center gap-5 items-center">
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use xlink:href="/bootstrap-icons.svg#geo" />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white mb-2">Coordinates</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                Longitude -
                <span
                  class="
                    bg-main bg-opacity-50
                    py-1
                    px-3
                    rounded-full
                    text-black
                    dark:text-white
                  "
                  >{{ results.data.coord.lon }}</span
                >
              </h2>
              <h2 class="text-xl text-slate-500 dark:text-main mt-3">
                Latitude -
                <span
                  class="
                    bg-main bg-opacity-50
                    py-1
                    px-3
                    rounded-full
                    text-black
                    dark:text-white
                  "
                  >{{ results.data.coord.lat }}</span
                >
              </h2>
            </div>
          </div>

          <!-- Sunrise at -->
          <div class="flex w-full md:w-1/3 justify-center gap-5 items-center">
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use xlink:href="/bootstrap-icons.svg#sunrise" />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">Sunrise at</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{ parsedDateSunrise }}
              </h2>
            </div>
          </div>

          <!-- Sunset at -->
          <div class="flex w-full md:w-1/3 justify-center gap-5 items-center">
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use xlink:href="/bootstrap-icons.svg#sunset" />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">Sunset at</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{ parsedDateSunset }}
              </h2>
            </div>
          </div>
        </TabPanel>
        <!-- Pressure, humidity, visibility and temperature (feels like) panel -->
        <TabPanel
          class="flex flex-col md:flex-row items-center justify-around gap-y-10"
        >
          <!-- Pressure -->
          <div class="flex w-full md:w-1/4 justify-center items-center">
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use xlink:href="/bootstrap-icons.svg#sort-numeric-down-alt" />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">Pressure</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{ results.data.main.pressure }}
              </h2>
            </div>
          </div>

          <!-- Humidity -->
          <div class="flex w-full md:w-1/4 justify-center gap-5 items-center">
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use xlink:href="/bootstrap-icons.svg#moisture" />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">Humidity</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{ results.data.main.humidity }}%
              </h2>
            </div>
          </div>

          <!-- Visibility -->
          <div class="flex w-full md:w-1/4 justify-center gap-5 items-center">
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use xlink:href="/bootstrap-icons.svg#eye" />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">Visibility</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{ results.data.visibility / 1000 }}km
              </h2>
            </div>
          </div>

          <!-- Temperature (feels like) -->
          <div class="flex w-full md:w-1/4 justify-center items-center">
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use
                xlink:href="/bootstrap-icons.svg#thermometer-high"
                v-if="temperature === 'hot'"
              />
              <use
                xlink:href="/bootstrap-icons.svg#thermometer-low"
                v-else-if="temperature === 'cold'"
              />
              <use xlink:href="/bootstrap-icons.svg#thermometer-half" v-else />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">It feels</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{
                  temperature === "midway"
                    ? "Warm"
                    : temperature === "hot"
                    ? "Hot"
                    : "Cold"
                }}
              </h2>
            </div>
          </div>
        </TabPanel>
        <!-- Wind speed, wind direction, gust and cloudiness panel -->
        <TabPanel
          class="
            flex flex-col
            md:flex-row
            items-center
            flex-wrap
            md:gap-y-4
            gap-y-10
          "
        >
          <!-- Wind speed -->
          <div
            class="
              flex
              w-full
              md:w-1/2
              xl:w-1/4
              items-center
              gap-5
              justify-center
            "
          >
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use xlink:href="/bootstrap-icons.svg#speedometer2" />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">Wind speed</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{ results.data.wind.speed }}&nbsp;{{
                  settings.unit === "imperial" ? "miles/hour" : "meters/second"
                }}
              </h2>
            </div>
          </div>

          <!-- Wind direction -->
          <div
            class="
              flex
              w-full
              md:w-1/2
              xl:w-1/4
              justify-center
              items-center
              gap-5
            "
          >
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use
                xlink:href="/bootstrap-icons.svg#arrow-90deg-up"
                v-if="direction === 'north'"
              />
              <use
                xlink:href="/bootstrap-icons.svg#arrow-90deg-down"
                v-else-if="direction === 'south'"
              />
              <use
                xlink:href="/bootstrap-icons.svg#arrow-90deg-left"
                v-else-if="direction === 'west'"
              />
              <use xlink:href="/bootstrap-icons.svg#arrow-90deg-right" v-else />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">Wind direction</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{ direction.charAt(0).toUpperCase()
                }}{{ direction.slice(1) }} ({{ results.data.wind.deg }}&deg;)
              </h2>
            </div>
          </div>

          <!-- Gust -->
          <div
            class="
              flex
              w-full
              md:w-1/2
              xl:w-1/4
              items-center
              gap-5
              justify-center
            "
          >
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use xlink:href="/bootstrap-icons.svg#wind" />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">Gust</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{ results.data.wind.gust }}&nbsp;{{
                  settings.unit === "imperial" ? "miles/hour" : "meters/second"
                }}
              </h2>
            </div>
          </div>

          <!-- Cloudiness -->
          <div
            class="
              flex
              w-full
              md:w-1/2
              xl:w-1/4
              items-center
              gap-5
              justify-center
            "
          >
            <svg class="w-16 h-16 fill-main dark:fill-white">
              <use xlink:href="/bootstrap-icons.svg#clouds" />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl dark:text-white">Cloudiness</h1>
              <h2 class="text-xl text-slate-500 dark:text-main">
                {{ results.data.clouds.all }}%
              </h2>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<style>
.tippy-arrow {
  color: #f03a17;
}

.tippy-box {
  background: #f03a17;
}
</style>
