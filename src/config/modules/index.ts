import common, { CommonConfigType } from './common';
import discrodBot, { DiscordBotConfigType } from './discord-bot';

export * from './common';
export * from './discord-bot';

export type AppConfigFunctionType = {
  common: () => CommonConfigType;
  discrodBot: () => DiscordBotConfigType;
};

export type AppConfigType = CommonConfigType | DiscordBotConfigType;

export default { common, discrodBot };
