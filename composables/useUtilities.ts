import moment from "moment";

interface results {
  value: any;
}

export const calculateDirection = (angle: number) => {
  const direction = ref("");
  if (angle > 0 && angle <= 90) {
    direction.value = "east";
  } else if (angle > 90 && angle <= 180) {
    direction.value = "south";
  } else if (angle > 180 && angle <= 270) {
    direction.value = "west";
  } else {
    direction.value = "north";
  }
  return { direction };
};

/**
 * Converts a 2-letter country code to its full name
 * @param countryCode as a string
 * @returns a reactive string (`name`)
 */
export const countryCodeConverter = async (countryCode: string) => {
  const _response = ref([]);
  const name = ref("");
  await $fetch(
    "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json",
    {
      onResponse({ response }) {
        _response.value = JSON.parse(response._data);
        _response.value.forEach((country) => {
          if (countryCode === country.Code) {
            name.value = country.Name;
          }
        });
      },
    }
  );
  return { name };
};

/**
 * A helper to format dates
 * @param date A date in unix and UTC format
 * @returns a reactive string (`parsedDate`)
 */
export const dateFormatter = async (date: number) => {
  const parsedDate = ref("");
  parsedDate.value = moment.unix(date).format("hh:mm a");

  return { parsedDate };
};

/**
 * A helper to determine whether the temperature is hot, cold or midway
 * @param _temperature A unit specific temperature as a number
 * @param unit Possible values for unit are metric, imperial, standard
 * @returns a reactive string (`temperature`)
 */
export const thermometer = (_temperature: number, unit: string) => {
  const temperature = ref("");
  if (unit === "standard") {
    if (_temperature <= 281.15) {
      temperature.value = "cold";
    } else if (_temperature > 281.15 && _temperature < 310.15) {
      temperature.value = "midway";
    } else {
      temperature.value = "hot";
    }
  } else if (unit === "metric") {
    if (_temperature <= 8) {
      temperature.value = "cold";
    } else if (_temperature > 8 && _temperature < 37) {
      temperature.value = "midway";
    } else {
      temperature.value = "hot";
    }
  } else if (_temperature <= 40) {
    temperature.value = "cold";
  } else if (_temperature > 40 && _temperature < 98.6) {
    temperature.value = "midway";
  } else {
    temperature.value = "hot";
  }

  return { temperature };
};

/**
 *
 * @param query as a string or null
 * @param latitude as a number or null
 * @param longitude as a number or null
 * @param unit as a string (possible values are metric, standard, imperial)
 * @param _id as a string
 * @returns a reactive object, (`_response`)
 */
export const fetchWeather = async (
  query: string,
  latitude: number | null,
  longitude: number | null,
  unit: string,
  _id: string
) => {
  const _response = ref<results | []>([]);
  if (!(latitude && longitude)) {
    await $fetch("/api/weather", {
      method: "post",
      headers: {
        Authorization: _id,
      },
      body: {
        query,
        unit,
      },
      onResponse({ response }) {
        _response.value = response._data;
      },
      onResponseError({ response }) {
        _response.value = response._data;
      },
    });
  } else {
    _response.value = await $fetch("/api/weather", {
      method: "post",
      headers: {
        Authorization: _id,
      },
      body: {
        lat: latitude,
        lon: longitude,
        unit,
      },
      onResponse({ response }) {
        _response.value = response._data;
      },
      onRequestError({ error }) {
        console.log(error);
      },
    });
  }
  return _response;
};
