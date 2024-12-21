import axios from 'axios';
import keycloakService from '@app/services/keycloak';

const API_URL =
  // process.env.REACT_APP_API_URL ||
  'http://localhost:8080/api';
const API_SURVEY_SERVICE =
  // process.env.REACT_APP_SURVEY_SERVICE_URL ||
  'http://localhost:8082';

export const createApiInstance = (baseURL: string) => {
  const instance = axios.create({
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(async (config) => {
    try {
      if (keycloakService.isTokenExpired()) {
        await keycloakService.updateToken();
      }
      const token = keycloakService.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          await keycloakService.updateToken();
          const token = keycloakService.getToken();
          error.config.headers.Authorization = `Bearer ${token}`;
          return instance(error.config);
        } catch (e) {
          keycloakService.login();
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiSurveyService = createApiInstance(API_SURVEY_SERVICE);
export const api = createApiInstance(API_URL);
