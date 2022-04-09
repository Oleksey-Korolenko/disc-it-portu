import DiscordService from '@modules/discord/discord.service';

export const weatherJob = async () => {
  const discord = new DiscordService();

  await discord.sendWeatherData();
};
