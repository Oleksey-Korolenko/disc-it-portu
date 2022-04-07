import { Router } from 'express';
import DiscordService from './discord.service';

export default async (router: typeof Router) => {
  const routes = router();

  const discrodService = new DiscordService();

  await discrodService.init();
  await discrodService.sendWeatherData();

  return routes;
};
