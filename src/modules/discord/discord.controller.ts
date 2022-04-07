import { Router } from 'express';
import DiscordService from './discord.service';

export default async (router: typeof Router) => {
  const routes = router();

  const discrodService = new DiscordService();

  await discrodService.init();
  await discrodService.wearther();

  /*
  routes.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
      return QueryService.sendResponse<string>(200, 'response', res);
    })
  );
  */

  return routes;
};
