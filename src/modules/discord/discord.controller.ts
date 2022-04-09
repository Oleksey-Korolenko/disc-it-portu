import { asyncHandler } from '@middlewares/async-handler.middleware';
import QueryService from '@query/query.service';
import { Request, Response, Router } from 'express';
import DiscordService from './discord.service';

export default async (router: typeof Router) => {
  const routes = router();

  const discrodService = new DiscordService();

  await discrodService.init();
  // await discrodService.sendWeatherData();

  routes.post(
    '/sendWeather',
    asyncHandler(async (req: Request, res: Response) => {
      await discrodService.sendWeatherData();

      return QueryService.sendResponse<string>(
        200,
        'Everything is correct!',
        res
      );
    })
  );

  return routes;
};
