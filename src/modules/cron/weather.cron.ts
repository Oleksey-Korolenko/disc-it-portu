import ETypeOperation from '@query/enum/type-operation.enum';
import { IDefaultHeaders, IQueryAttributes } from '@query/interface';
import QueryService from '@query/query.service';

export const weatherJob = async () => {
  const headers: IDefaultHeaders = {
    'Content-Type': 'application/json'
  };

  const queryAttributes: IQueryAttributes<IDefaultHeaders> = {
    hostname: 'disc-portu-it.herokuapp.com',
    path: '/api/discord/sendWeather',
    method: 'POST',
    headers,
    port: 443
  };

  await new QueryService()
    .sendRequest<IDefaultHeaders, {}, undefined>(
      queryAttributes,
      {},
      ETypeOperation.DEFAULT
    )
    .then(res => console.log(res))
    .catch(e => console.log(e));
};
