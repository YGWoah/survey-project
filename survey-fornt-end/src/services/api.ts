import axios from 'axios';
import { Survey } from '../types';
// const API_URL =
// process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const API_URL = 'http://localhost:8080/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const API_SURVEY_SERVICE = 'http://localhost:8082';

const apiSurveyService = axios.create({
  baseURL: API_SURVEY_SERVICE,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'multipleChoice';
  options?: string[];
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  value: string;
}

export const getSurveys = async (): Promise<Survey[]> => {
  try {
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
    const response = await api.get(`/surveys/${id}/responses`);
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
  surveyId: string;
  responses: {};
}

export const submitResponse = async (
  response: SurveyResponseData
): Promise<void> => {
  try {
    apiSurveyService.post(
      `/api/surveys/${response.surveyId}/responses`,
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
