export interface IQueryAttributes<T> {
  hostname: string;
  path: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  headers: T;
  port?: number;
}

export interface IDefaultHeaders {
  'Content-Type': string;
}

export interface IQueryParams {
  [key: string]: string | number;
}

export interface IQueryResponse<T, Code> {
  message: string;
  code: Code;
  data?: T;
}
