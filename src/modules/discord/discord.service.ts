import { AppConfigService } from '@config/config.service';
import { DiscordBotConfigType } from '@config/modules';
import WeatherService from '@modules/weather/weather.service';
import { CronJob } from 'cron';
import Discord, { Client, TextChannel } from 'discord.js';
import { channelsToCoordinatos } from './constant';
import { ICoordinate } from './interface';
import { DiscordView } from './views';

export default class DiscordService {
  #config: DiscordBotConfigType;
  #client: Client;
  #weatherService: WeatherService;
  #coordinates: ICoordinate[];
  #discordView: DiscordView;

  constructor() {
    this.#config = new AppConfigService().get('discrodBot');
    this.#client = new Discord.Client({
      intents: ['GUILDS', 'GUILD_MESSAGES']
    });
    this.#weatherService = new WeatherService();
    this.#coordinates = channelsToCoordinatos;
    this.#discordView = new DiscordView();
  }

  public init = () => this.#client.login(this.#config.token);

  #sendWeatherData = async () => {
    for (const coordinate of this.#coordinates) {
      await this.#wearther(coordinate);
    }
  };

  public setCronJobs = async () => {
    await this.#setWeatherCronJob();
  };

  #setWeatherCronJob = async () => {
    const job = new CronJob(
      '0 0 8 * * *',
      async () => await this.#sendWeatherData(),
      null,
      true,
      'Europe/Lisbon'
    );
    job.start();
  };

  #wearther = async (coordinate: ICoordinate) => {
    const forecast = await this.#weatherService.getWeather(
      coordinate.latitude,
      coordinate.longitude
    );

    const text = this.#discordView.selectWeather(forecast);

    await (this.#client.channels.cache.get(coordinate.id) as TextChannel).send(
      text
    );
  };
}
