import { sendError } from "h3";

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
  const { lat, lon, query, unit }: requestBody = await readBody(event);
  const config = useRuntimeConfig();

  if (event.req.headers.authorization !== undefined) {
    if (
      (event.req.headers.authorization as string).length ===
      config.public.idLength
    ) {
      /**
       * 1. Check if the request has coordinates
       * 2. If the request doesn't have coordinates using the query instead
       * 3. Else, use the coordinates
       */
      if ((lat && lon) === undefined) {
        const geo: Array<coordinates> = await $fetch(
          `${config.baseUri}/geo/1.0/direct?q=${query}&appid=${config.apiKey}`
        );

        if (geo.length === 1) {
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
        } else if (geo.length === 0) {
          return sendError(
            event,
            createError({
              statusCode: 404,
              statusMessage: "Location not found",
            })
          );
        } else if (geo.length > 1) {
          // TODO: handle when the geo api returns more than one location
          console.log(geo, length);
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
      return sendError(
        event,
        createError({
          statusCode: 401,
          statusMessage: "Invalid ID",
        })
      );
    }
  } else {
    return sendError(
      event,
      createError({
        statusCode: 401,
        statusMessage: "Can't find an ID",
      })
    );
  }
});
