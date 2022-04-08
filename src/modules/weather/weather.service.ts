import { AppConfigService } from '@config/config.service';
import { WeatherConfigType } from '@config/modules';
import { LoggerService } from '@logger/logger.service';
import ETypeOperation from '@query/enum/type-operation.enum';
import { IDefaultHeaders, IQueryAttributes } from '@query/interface';
import QueryService from '@query/query.service';
import { Logger } from 'winston';
import { IWeather, IForecastday } from './interface';

export default class WeatherService {
  #config: WeatherConfigType;
  #queryService: QueryService;
  #headers: IDefaultHeaders;
  #queryAttributes: IQueryAttributes<IDefaultHeaders>;
  #logger: Logger;

  constructor() {
    this.#config = new AppConfigService().get('weather');
    this.#queryService = new QueryService();
    this.#headers = {
      'Content-Type': 'application/json'
    };
    this.#queryAttributes = {
      hostname: 'api.weatherapi.com',
      path: '',
      method: 'GET',
      headers: this.#headers,
      port: 443
    };
    this.#logger = new LoggerService().getLogger();
  }

  public getWeather = async (
    latitude: number,
    longitude: number,
    tryCount = 0
  ): Promise<IForecastday | undefined> =>
    this.#queryService
      .sendRequest<IDefaultHeaders, IWeather, undefined>(
        {
          ...this.#queryAttributes,
          path: '/v1/forecast.json'
        },
        {
          q: `${latitude},${longitude}`,
          days: 1,
          key: this.#config.apiKey,
          aqi: 'no',
          alerts: 'no'
        },
        ETypeOperation.DEFAULT
      )
      .then(res => {
        return res?.data?.forecast?.forecastday[0];
      })
      .catch(async e => {
        this.#logger.warn(
          `Something went wrong! Error: ${JSON.stringify(e, null, 2)}`
        );
        if (tryCount >= 10) {
          return undefined;
        } else {
          return await new Promise(resolve => {
            setTimeout(async () => {
              const result = await this.getWeather(
                latitude,
                longitude,
                tryCount + 1
              );
              resolve(result);
            }, 1000);
          });
        }
      });
}
