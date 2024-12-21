import { apiSurveyService } from '../../config/api';
import { Survey } from '../../types/api';

export class AdminService {
  static async getSurveys(): Promise<Survey[]> {
    const response = await apiSurveyService.get('/api/surveys');
    return response.data;
  }
  static async getSurvey(id: string): Promise<Survey> {
    const response = await apiSurveyService.get(`/api/surveys/${id}`);
    return response.data;
  }

  static async getAdminResosurce() {
    const response = await apiSurveyService.get('/api/admin');
    return response.data;
  }
}
