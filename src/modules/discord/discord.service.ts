import { AppConfigService } from '@config/config.service';
import { DiscordBotConfigType } from '@config/modules';
import Discord, { Client } from 'discord.js';

export default class DiscordService {
  #config: DiscordBotConfigType;
  #client: Client;

  constructor() {
    this.#config = new AppConfigService().get('discrodBot');

    this.#client = new Discord.Client({
      intents: ['GUILDS', 'GUILD_MESSAGES']
    });
  }

  public init = () => this.#client.login(this.#config.token);

  public wearther = async () => {
    const result = await this.#client.channels.cache.toJSON();

    // console.log(result);
  };
}
