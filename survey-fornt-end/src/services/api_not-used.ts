import { Survey, Answer } from '../types';
import keycloakService from '@app/services/keycloak';
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';
const API_SURVEY_SERVICE = 'http://localhost:8082';

const apiSurveyService = axios.create({
  baseURL: API_SURVEY_SERVICE,
  headers: {
    'Content-Type': 'application/json',
  },
});
const api = axios.create({
  baseURL: API_URL,
});

apiSurveyService.interceptors.request.use(async (config) => {
  const token = keycloakService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiSurveyService.interceptors.request.use(
  async (config) => {
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
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(async (config) => {
  const token = keycloakService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface SurveyResponse {
  [question: string]: Answer[];
}

export const getSurveys = async (): Promise<Survey[]> => {
  try {
    console.log('getting surveys in api wiht the new token');

    const response = await apiSurveyService.get('/api/surveys');
    return response.data;
  } catch (error) {
    console.error('Error fetching surveys:', error);
    throw error;
  }
};

export const getSurvey = async (id: string): Promise<Survey> => {
  try {
    const response = await apiSurveyService.get(`/api/surveys/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching survey ${id}:`, error);
    throw error;
  }
};

type NewServeyType = {
  title: string;
  description: string;
  questions: {
    text: string;
  }[];
};

export const createSurvey = async (
  survey: NewServeyType
): Promise<Survey> => {
  try {
    const response = await apiSurveyService.post(
      '/api/surveys',
      survey
    );
    return response.data;
  } catch (error) {
    console.error('Error creating survey:', error);
    throw error;
  }
};

export const updateSurvey = async (
  id: string,
  survey: Partial<Survey>
): Promise<Survey> => {
  try {
    const response = await api.put(`/surveys/${id}`, survey);
    return response.data;
  } catch (error) {
    console.error(`Error updating survey ${id}:`, error);
    throw error;
  }
};

export const deleteSurvey = async (id: string): Promise<void> => {
  try {
    await api.delete(`/surveys/${id}`);
  } catch (error) {
    console.error(`Error deleting survey ${id}:`, error);
    throw error;
  }
};

export const getSurveyResponses = async (
  id: string
): Promise<SurveyResponse[]> => {
  try {
    const response = await apiSurveyService.get(
      `/api/surveys/${id}/responses`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching responses for survey ${id}:`,
      error
    );
    throw error;
  }
};

export interface SurveyResponseData {
  username: string;
  responses: Omit<Answer, 'username'>[];
}

export const submitResponse = async (
  surveyId: string | number,
  response: SurveyResponseData
): Promise<void> => {
  console.log('submitting a response');

  try {
    apiSurveyService.post(
      `/api/surveys/${surveyId}/responses`,
      response
    );
  } catch (error) {
    console.log(error);
  }
};

export const getUserProfile = async (): Promise<any> => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (
  profile: any
): Promise<any> => {
  try {
    const response = await api.put('/users/profile', profile);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};
