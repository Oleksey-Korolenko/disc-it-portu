import { IForecastday } from '@modules/weather/interface';
import DiscordCommonView from './discord-common.view';

export default class DiscordWeatherView extends DiscordCommonView {
  public selectWeather = (weather: IForecastday): string => {
    let text = '';

    text += this.preparedText(this.messages['ua'].WEATHER.MAIN, {
      temp: weather.day.avgtemp_c,
      pressure: weather.hour[7].pressure_mb,
      humidity: weather.day.avghumidity
    });

    text += this.preparedText(this.messages['ua'].WEATHER.SUN, {
      sunrise: weather.astro.sunrise,
      sunset: weather.astro.sunset
    });

    text += this.preparedText(this.messages['ua'].WEATHER.VISIBILLITY, {
      visibillity: weather.day.avgvis_km
    });

    text += this.preparedText(this.messages['ua'].WEATHER.WIND, {
      speed: weather.hour[7].wind_kph,
      dir: weather.hour[7].wind_dir
    });

    text += this.preparedText(this.messages['ua'].WEATHER.CLOUD, {
      clouds: weather.hour[7].cloud
    });

    if (weather.day.daily_chance_of_rain === 0) {
      text += this.preparedText(this.messages['ua'].WEATHER.NO_RAIN, {});
    } else {
      text += this.preparedText(this.messages['ua'].WEATHER.RAIN, {
        rain: weather.day.daily_will_it_rain,
        chance: weather.day.daily_chance_of_rain
      });
    }

    if (weather.day.daily_chance_of_snow === 0) {
      text += this.preparedText(this.messages['ua'].WEATHER.NO_SNOW, {});
    } else {
      text += this.preparedText(this.messages['ua'].WEATHER.SNOW, {
        snow: weather.day.daily_will_it_snow,
        chance: weather.day.daily_chance_of_snow
      });
    }

    return text;
  };
}
