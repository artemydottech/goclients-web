import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15_000,
});

export default api;

export class ApiError extends Error {
  constructor(message: string, public status: Nullable<number>) {
    super(message);
    this.name = 'ApiError';
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

const extractServerMessage = (data: unknown): string => {
  if (typeof data === 'string') return data.trim();
  if (data && typeof data === 'object') {
    for (const key of ['error', 'message']) {
      const message = (data as Record<string, unknown>)[key];
      if (typeof message === 'string' && message.trim()) return message.trim();
    }
  }
  return '';
};

export const handleApiError = (
  error: unknown,
  defaultMessage: string,
): ApiError => {
  if (!axios.isAxiosError(error)) return new ApiError(defaultMessage, null);

  const status = error.response?.status ?? null;
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    return new ApiError(`${defaultMessage}: сервер не ответил вовремя`, status);
  }
  const serverMessage = extractServerMessage(error.response?.data);

  if (!serverMessage) return new ApiError(defaultMessage, status);

  return new ApiError(`${defaultMessage}: ${serverMessage}`, status);
};
