import { AppConfigService } from '@config/config.service';
import { WeatherConfigType } from '@config/modules';
import EQueryCode from '@query/enum/query.enum';
import ETypeOperation from '@query/enum/type-operation.enum';
import {
  IDefaultHeaders,
  IQueryAttributes,
  IQueryResponse
} from '@query/interface';
import QueryService from '@query/query.service';
import { IWeather, IForecastday } from './interface';

export default class WeatherService {
  #config: WeatherConfigType;
  #queryService: QueryService;
  #headers: IDefaultHeaders;
  #queryAttributes: IQueryAttributes<IDefaultHeaders>;

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
  }

  public getWeather = async (
    latitude: number,
    longitude: number
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
      });
}
