import { IForecastday } from '@modules/weather/interface';
import DiscordWeatherView from './discord-weather.view';

export class DiscordView {
  #weatherView: DiscordWeatherView;

  constructor() {
    this.#weatherView = new DiscordWeatherView();
  }

  // WEATHER VIEW

  public selectWeather = (weather: IForecastday): string =>
    this.#weatherView.selectWeather(weather);

  // WEATHER VIEW
}
