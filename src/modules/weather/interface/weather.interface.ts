export interface IWeather {
  forecast: IForecast;
}

interface IForecast {
  forecastday: IForecastday[];
}

export interface IForecastday {
  day: IDayWeather;
  astro: IAstroWeather;
  hour: IHourWeather[];
}

interface IDayWeather {
  avgtemp_c: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  avgvis_km: number;
  avghumidity: number;

  daily_will_it_rain: number;
  daily_chance_of_rain: number;

  daily_will_it_snow: number;
  daily_chance_of_snow: number;

  condition: IConditionWeather;
}

interface IConditionWeather {
  icon: string;
}

interface IAstroWeather {
  sunrise: string;
  sunset: string;
}

interface IHourWeather {
  wind_kph: number;
  wind_dir: string;
  pressure_mb: number;
  cloud: number;
}
