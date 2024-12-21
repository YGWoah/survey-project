import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SurveyService } from '@app/services/surveyService';
import SurveyCard from '@app/components/SurveyCard';
import { Survey } from '@app/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Dashboard: React.FC = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [filteredSurveys, setFilteredSurveys] = useState<Survey[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const data = await SurveyService.getSurveys();
        setSurveys(data as Survey[]);
        setFilteredSurveys(data as Survey[]);
      } catch (err) {
        setError('Failed to fetch surveys');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  useEffect(() => {
    // const filtered = surveys.filter((survey) =>
    //   survey.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // const sorted = [...filtered].sort((a, b) => {
    //   if (sortBy === 'date')
    //     return (
    //       new Date(b.createdAt).getTime() -
    //       new Date(a.createdAt).getTime()
    //     );
    //   if (sortBy === 'responses')
    //     return b.responseCount - a.responseCount;
    //   return 0;
    // });
    // setFilteredSurveys(sorted);
  }, [searchTerm, sortBy, surveys]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const totalSurveys = surveys.length;
  const totalResponses = 20;
  //  surveys.reduce(
  //   (sum, survey) => sum + survey.responseCount,
  //   0
  // );
  const averageResponsesPerSurvey =
    totalResponses / totalSurveys || 0;

  const chartData = surveys.slice(0, 5).map((survey) => ({
    name: survey.title,
    responses: 20,
    // survey.responseCount,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">
            Total Surveys
          </h2>
          <p className="text-3xl font-bold">{totalSurveys}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">
            Total Responses
          </h2>
          <p className="text-3xl font-bold">{totalResponses}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">
            Avg Responses/Survey
          </h2>
          <p className="text-3xl font-bold">
            {averageResponsesPerSurvey.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search surveys..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="date">Sort by Date</option>
          <option value="responses">Sort by Responses</option>
        </select>
        <Link
          to="/create-survey"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Survey
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredSurveys.map((survey) => (
          <SurveyCard key={survey.id} survey={survey} />
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">
          Top 5 Surveys by Responses
        </h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="responses" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
