export default defineEventHandler(async (event) => {
  const { query, useAqi } = await useBody(event);
  const config = useRuntimeConfig();

  // This is to prevent abuse of the API
  if (event.req.headers.authorization.length === config.idLength) {
    // Fetch the weather information

    try {
      const data = await $fetch(
        `${config.baseUri}/v1/current.json?key=${config.apiKey}&q=${query}&aqi=${useAqi}`
      );

      return {
        data,
      };
    } catch (error) {
      event.res.statusCode = 400;
      return {
        message: error.data.error.message,
      };
    }
  } else {
    event.res.statusCode = 401;
    return {
      reason: "You're not authorized to make the request",
    };
  }
});
