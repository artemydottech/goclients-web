import { AxiosError, type AxiosResponse } from 'axios';

export const buildAxiosError = (status: number, data: unknown): AxiosError =>
  new AxiosError('failed', undefined, undefined, undefined, {
    status,
    data,
  } as AxiosResponse);
