import axios from 'axios';
//import { refreshTokens } from './auth';
//import { LocalStorageNames } from '../../types';
//import { logout } from '../../store/auth-store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
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

export const handleApiError = (
  error: unknown,
  defaultMessage: string,
): never => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || 'Неизвестная ошибка';

    throw new Error(`${defaultMessage}: ${message}`);
  }

  throw new Error(defaultMessage);
};
