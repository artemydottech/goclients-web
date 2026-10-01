import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export default api;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: Nullable<number>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof ApiError;

const extractServerMessage = (data: unknown): string => {
  if (typeof data === 'string') return data.trim();
  if (data && typeof data === 'object' && 'message' in data) {
    return String(data.message);
  }
  return '';
};

export const handleApiError = (
  error: unknown,
  defaultMessage: string,
): ApiError => {
  if (!axios.isAxiosError(error)) return new ApiError(defaultMessage, null);

  const status = error.response?.status ?? null;
  const serverMessage = extractServerMessage(error.response?.data);

  if (!serverMessage) return new ApiError(defaultMessage, status);

  return new ApiError(`${defaultMessage}: ${serverMessage}`, status);
};
