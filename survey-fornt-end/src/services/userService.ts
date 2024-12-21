import { api, apiSurveyService } from '../config/api';
import { User } from '@app/types/index';
export class UserService {
  static async getUserProfile(): Promise<User> {
    const response = await api.get('/users/profile');
    return response.data;
  }

  static async updateUserProfile(
    profile: Partial<User>
  ): Promise<User> {
    const response = await api.put('/users/profile', profile);
    return response.data;
  }

  static async getTokenInfo() {
    const response = await apiSurveyService.get(
      '/api/test/token-info'
    );
    return response.data;
  }
  static async getUser() {
    const response = await apiSurveyService.get('/api/test/user');
    return response.data;
  }
  static async getUserInfo() {
    const response = await apiSurveyService.get(
      '/api/test/user-info'
    );
    return response.data;
  }
}
