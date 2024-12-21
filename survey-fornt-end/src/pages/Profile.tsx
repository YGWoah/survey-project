import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@app/contexts/KeyCloakAuthContext';
import { SurveyService } from '@app/services/surveyService';
import { Button } from '@app/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card';

import { Input } from '@app/components/ui/input';
import { Label } from '@app/components/ui/label';
import { User, Survey } from '@app/types/api';
import SurveyCard from '@app/components/SurveyCard';

const INITIAL_USER: User = {
  username: 'user',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@email.com',
};

const useProfile = () => {
  const [profile, setProfile] = useState<User>(INITIAL_USER);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return {
    profile,
    setProfile,
    isEditing,
    setIsEditing,
    handleUpdateProfile,
  };
};

const useSurveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      setIsLoading(true);
      const mySurveys = await SurveyService.getMySurveys();
      setSurveys(mySurveys as Survey[]);
    } catch (error) {
      console.error('Failed to fetch surveys:', error);
      setError('Failed to load surveys. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSurvey = async (surveyId: string) => {
    try {
      await SurveyService.deleteServey(surveyId);
      setSurveys(surveys.filter((survey) => survey.id !== surveyId));
    } catch (error) {
      console.error('Failed to delete survey:', error);
      setError('Failed to delete survey. Please try again.');
    }
  };

  return {
    surveys,
    isLoading,
    error,
    handleDeleteSurvey,
  };
};

const ProfileForm: React.FC<{
  profile: User;
  setProfile: (profile: User) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}> = ({ profile, setProfile, onSubmit, onCancel }) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="firstName">First Name</Label>
      <Input
        id="firstName"
        value={profile.firstName}
        onChange={(e) =>
          setProfile({ ...profile, firstName: e.target.value })
        }
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="lastName">Last Name</Label>
      <Input
        id="lastName"
        value={profile.lastName}
        onChange={(e) =>
          setProfile({ ...profile, lastName: e.target.value })
        }
        required
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={profile.email}
        onChange={(e) =>
          setProfile({ ...profile, email: e.target.value })
        }
        required
      />
    </div>
    <div className="flex space-x-4">
      <Button type="submit">Save Changes</Button>
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </form>
);

const ProfileInfo: React.FC<{
  profile: User;
  onEdit: () => void;
  onLogout: () => void;
}> = ({ profile, onEdit, onLogout }) => (
  <div className="space-y-2">
    <p>
      <strong>Name:</strong> {profile.firstName} {profile.lastName}
    </p>
    <p>
      <strong>Email:</strong> {profile.email}
    </p>
    <Button onClick={onEdit}>Edit Profile</Button>
    <Button variant="destructive" className="mt-4" onClick={onLogout}>
      Logout
    </Button>
  </div>
);

const ProfilePage: React.FC = () => {
  const { logout } = useAuth();
  const {
    profile,
    setProfile,
    isEditing,
    setIsEditing,
    handleUpdateProfile,
  } = useProfile();
  const { surveys, isLoading, error, handleDeleteSurvey } =
    useSurveys();

  const handleLogout = () => {
    logout();
  };

  if (isLoading)
    return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-600 p-8">{error}</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <ProfileForm
              profile={profile}
              setProfile={setProfile}
              onSubmit={handleUpdateProfile}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ProfileInfo
              profile={profile}
              onEdit={() => setIsEditing(true)}
              onLogout={handleLogout}
            />
          )}
        </CardContent>
      </Card>

      <div className="mb-6">
        <Link
          to="/create-survey"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Survey
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your Surveys</CardTitle>
        </CardHeader>
        <CardContent>
          {surveys.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {surveys.map((survey) => (
                <SurveyCard
                  key={survey.id}
                  survey={survey}
                  onDelete={handleDeleteSurvey}
                />
              ))}
            </div>
          ) : (
            <p>You haven't created any surveys yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
