import common, { CommonConfigType } from './common';
import discrodBot, { DiscordBotConfigType } from './discord-bot';
import weather, { WeatherConfigType } from './weather';

export * from './common';
export * from './discord-bot';
export * from './weather';

export type AppConfigFunctionType = {
  common: () => CommonConfigType;
  discrodBot: () => DiscordBotConfigType;
  weather: () => WeatherConfigType;
};

export type AppConfigType =
  | CommonConfigType
  | DiscordBotConfigType
  | WeatherConfigType;

export default { common, discrodBot, weather };
