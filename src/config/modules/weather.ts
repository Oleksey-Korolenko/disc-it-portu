export type WeatherConfigType = {
  apiKey: string;
};

const weather = (): WeatherConfigType => ({
  apiKey:
    process.env.OPEN_WEATHER_API_KEY === undefined
      ? ''
      : process.env.OPEN_WEATHER_API_KEY
});

export default weather;
