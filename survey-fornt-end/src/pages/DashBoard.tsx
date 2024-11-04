import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSurveys } from '../services/api';
import SurveyCard from '../components/SurveyCard';
import Chart from '../components/Chart';
import { Survey } from '../types';
// interface Survey {
//   id: string;
//   title: string;
//   description: string;
//   responseCount: number;
// }

const Dashboard: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const data = await getSurveys();
        setSurveys(data);
      } catch (err) {
        setError('Failed to fetch surveys');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-6">
        <Link
          to="/create-survey"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Survey
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surveys.map((survey, index) => (
          <SurveyCard key={index} survey={survey} />
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Survey Statistics</h2>
        {/* // TODO : FIX THIS LATER */}
        {/* <Chart
          data={surveys.map((survey) => ({
            name: survey.title,
            responses: survey.responseCount,
          }))}
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
