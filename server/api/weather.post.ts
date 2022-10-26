interface coordinates {
  lat: number;
  lon: number;
}

interface requestBody {
  lat: number;
  lon: number;
  query: string;
  unit: string;
}

export default defineEventHandler(async (event) => {
  const { lat, lon, query, unit }: requestBody = await useBody(event);
  const config = useRuntimeConfig();

  if (event.req.headers.authorization.length === config.public.idLength) {
    /**
     * 1. Check if the request has coordinates
     * 2. If the request doesn't have coordinates using the query instead
     * 3. Else, use the coordinates
     */
    if ((lat && lon) === undefined) {
      const geo: Array<coordinates> = await $fetch(
        `${config.baseUri}/geo/1.0/direct?q=${query}&appid=${config.apiKey}`
      );

      if (geo.length > 0) {
        const coordinates: coordinates = {
          lat: geo[0].lat,
          lon: geo[0].lon,
        };

        const data = await $fetch(
          `${config.baseUri}/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit}&appid=${config.apiKey}`
        );

        return {
          data,
        };
      } else {
        event.res.statusCode = 404;
        return {
          message: "Location not found",
        };
      }
    } else {
      const data = await $fetch(
        `${config.baseUri}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${config.apiKey}`
      );

      return {
        data,
      };
    }
  } else {
    event.res.statusCode = 401;
    return {
      reason: "Didn't find an request identifier",
    };
  }
});
