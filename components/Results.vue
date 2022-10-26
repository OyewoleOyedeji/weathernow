<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import {
  calculateDirection,
  countryCodeConverter,
  dateFormatter,
  thermometer,
} from "~/composables/useUtilities";

interface settings {
  useBrowserLocation: boolean;
  unit: string;
}

interface results {
  data: any;
}

const results = useState<results>("results");
const settings = useState<settings>("settings");

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
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <img
          :src="`http://openweathermap.org/img/wn/${results.data.weather[0].icon}@2x.png`"
          :alt="`${results.data.weather[0].main} icon`"
        />
        <div class="flex flex-col">
          <h1 class="text-5xl">{{ results.data.name }}</h1>
          <div class="flex items-center gap-3">
            <h2 class="text-3xl text-slate-500">/ {{ countryName }}</h2>
            <h3 class="text-xl bg-main bg-opacity-50 px-3 py-2 rounded-full">
              {{ results.data.sys.country }}
            </h3>
          </div>
        </div>
      </div>
      <h1 class="text-7xl text-main opacity-80">
        {{ results.data.main.temp }}&nbsp;{{
          settings.unit === "standard"
            ? "K"
            : settings.unit === "metric"
            ? "&deg;C"
            : settings.unit === "imperial"
            ? "&deg;F"
            : ""
        }}
      </h1>
    </div>

    <!-- Section containing the tabs -->
    <TabGroup>
      <TabList class="flex justify-center gap-10 text-xl my-10">
        <Tab
          class="
            ui-selected:text-main ui-selected:underline
            underline-offset-8
            transition
          "
          >General</Tab
        >
        <Tab
          class="
            ui-selected:text-main ui-selected:underline
            underline-offset-8
            transition
          "
          >Environment</Tab
        >
        <Tab
          class="
            ui-selected:text-main ui-selected:underline
            underline-offset-8
            transition
          "
          >Wind</Tab
        >
      </TabList>
      <TabPanels>
        <!-- Coordinates, sunrise and sunset panel -->
        <TabPanel class="flex items-center justify-around">
          <!-- Coordinates -->
          <div class="flex w-1/3 justify-center gap-5 items-center">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#geo"
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl text-main mb-2">Coordinates</h1>
              <h2 class="text-xl text-slate-500">
                Longitude - {{ results.data.coord.lat }}
              </h2>
              <h2 class="text-xl text-slate-500">
                Latitude - {{ results.data.coord.lon }}
              </h2>
            </div>
          </div>

          <!-- Sunrise at -->
          <div class="flex w-1/3 justify-center gap-5 items-center">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#sunrise"
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl text-main">Sunrise at</h1>
              <h2 class="text-xl text-slate-500">{{ parsedDateSunrise }}</h2>
            </div>
          </div>

          <!-- Sunset at -->
          <div class="flex w-1/3 justify-center gap-5 items-center">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#sunset"
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl text-main">Sunset at</h1>
              <h2 class="text-xl text-slate-500">{{ parsedDateSunset }}</h2>
            </div>
          </div>
        </TabPanel>
        <!-- Pressure, humidity, visibility and temperature (feels like) panel -->
        <TabPanel class="flex items-center justify-around">
          <!-- Pressure -->
          <div class="flex w-1/4 items-center">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#sort-numeric-down-alt"
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl">Pressure</h1>
              <h2 class="text-xl text-slate-500">
                {{ results.data.main.pressure }}
              </h2>
            </div>
          </div>

          <!-- Humidity -->
          <div class="flex w-1/4 gap-5 items-center">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#moisture"
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl">Humidity</h1>
              <h2 class="text-xl text-slate-500">
                {{ results.data.main.humidity }}%
              </h2>
            </div>
          </div>

          <!-- Visibility -->
          <div class="flex w-1/4 gap-5 items-center">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#eye"
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl">Visibility</h1>
              <h2 class="text-xl text-slate-500">
                {{ results.data.visibility / 1000 }}km
              </h2>
            </div>
          </div>

          <!-- Temperature (feels like) -->
          <div class="flex w-1/4 items-center">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#thermometer-high"
                v-if="temperature === 'hot'"
              />
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#thermometer-low"
                v-else-if="temperature === 'cold'"
              />
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#thermometer-half"
                v-else
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl">It feels</h1>
              <h2 class="text-xl text-slate-500">
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
        <TabPanel class="flex items-center justify-around">
          <!-- Wind speed -->
          <div class="flex w-1/4 items-center gap-5">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#speedometer2"
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl">Wind speed</h1>
              <h2 class="text-xl text-slate-500">
                {{ results.data.wind.speed }}&nbsp;{{
                  settings.unit === "imperial" ? "miles/hour" : "meters/second"
                }}
              </h2>
            </div>
          </div>

          <!-- Wind direction -->
          <div class="flex w-1/4 items-center gap-5">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#arrow-90deg-up"
                v-if="direction === 'north'"
              />
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#arrow-90deg-down"
                v-else-if="direction === 'south'"
              />
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#arrow-90deg-left"
                v-else-if="direction === 'west'"
              />
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#arrow-90deg-right"
                v-else
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl">Wind direction</h1>
              <h2 class="text-xl text-slate-500">
                {{ direction.charAt(0).toUpperCase()
                }}{{ direction.slice(1) }} ({{ results.data.wind.deg }}&deg;)
              </h2>
            </div>
          </div>

          <!-- Gust -->
          <div class="flex w-1/4 items-center gap-5">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#wind"
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl">Gust</h1>
              <h2 class="text-xl text-slate-500">
                {{ results.data.wind.gust }}&nbsp;{{
                  settings.unit === "imperial" ? "miles/hour" : "meters/second"
                }}
              </h2>
            </div>
          </div>

          <!-- Cloudiness -->
          <div class="flex w-1/4 items-center gap-5">
            <svg class="w-16 h-16 fill-main">
              <use
                xlink:href="/node_modules/bootstrap-icons/bootstrap-icons.svg#clouds"
              />
            </svg>
            <div class="flex flex-col">
              <h1 class="text-2xl">Cloudiness</h1>
              <h2 class="text-xl text-slate-500">
                {{ results.data.clouds.all }}%
              </h2>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>