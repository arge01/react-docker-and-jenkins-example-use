import axios, { AxiosPromise, Method } from 'axios';

function fetchConfig<T>(
  method: Method,
  baseURL: string,
  data?: any,
  url?: any,
  header?: object,
): AxiosPromise<T> {
  const h: object = typeof header === 'object' ? header : {};
  return axios({
    method,
    baseURL,
    url,
    headers: { ...h, 'Content-Type': 'application/json' },
    data,
  });
}

export default fetchConfig;
