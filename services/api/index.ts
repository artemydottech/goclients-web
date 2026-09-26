import axios from 'axios';
//import { refreshTokens } from './auth';
//import { LocalStorageNames } from '../../types';
//import { logout } from '../../store/auth-store';

const api = axios.create({
  baseURL: '/api',
});

//api.interceptors.request.use((config) => {
//  const token = localStorage.getItem(LocalStorageNames.TOKEN);
//  if (token) {
//    config.headers.Authorization = `Bearer ${token}`;
//  }
//  return config;
//});

//api.interceptors.response.use(
//  (response) => response,
//  async (error) => {
//    const originalRequest = error.config;

//    if (
//      (error.response?.status === 401 || error.response?.status === 403) &&
//      !originalRequest.url.includes('/auth/refresh')
//    ) {
//      try {
//        const refreshToken = localStorage.getItem(LocalStorageNames.REFRESH_TOKEN);
//        if (!refreshToken) throw error;

//        originalRequest._retry = true;
//        const { access_token, refresh_token } = await refreshTokens(refreshToken);

//        localStorage.setItem(LocalStorageNames.TOKEN, access_token);
//        localStorage.setItem(LocalStorageNames.REFRESH_TOKEN, refresh_token);

//        originalRequest.headers.Authorization = `Bearer ${access_token}`;
//        return api(originalRequest);
//      } catch (refreshError) {
//        logout();
//        return Promise.reject(refreshError);
//      }
//    }

//    return Promise.reject(error);
//  },
//);

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
