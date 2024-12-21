import { apiSurveyService } from '../config/api';
import {
  Survey,
  SurveyResponse,
  SurveyResponseData,
} from '../types/api';

export class SurveyService {
  static async getSurveys(): Promise<Survey[]> {
    const response = await apiSurveyService.get('/api/surveys');
    return response.data;
  }
  static async getSurvey(id: string): Promise<Survey> {
    const response = await apiSurveyService.get(`/api/surveys/${id}`);
    return response.data;
  }

  static async createSurvey(
    survey: Omit<Survey, 'id'>
  ): Promise<Survey> {
    const response = await apiSurveyService.post(
      '/api/surveys',
      survey
    );
    return response.data;
  }

  static async getSurveyResponses(
    id: string
  ): Promise<SurveyResponse[]> {
    const response = await apiSurveyService.get(
      `/api/surveys/${id}/responses`
    );
    return response.data;
  }

  static async getMySurveys(): Promise<Survey[]> {
    return (await apiSurveyService.get('/api/surveys/my-surveys'))
      .data;
  }

  static async updateServey(
    surveyId: string | number,
    survey: Survey
  ) {
    return await apiSurveyService.put(
      `/api/surveys/${surveyId}`,
      survey
    );
  }
  static async deleteServey(surveyId: string | number) {
    return await apiSurveyService.delete(`/api/surveys/${surveyId}`);
  }

  static async submitResponse(
    surveyId: string,
    response: SurveyResponseData
  ): Promise<void> {
    await apiSurveyService.post(
      `/api/surveys/${surveyId}/responses`,
      response
    );
  }
}
