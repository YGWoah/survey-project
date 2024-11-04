import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSurveyResponses } from '../services/api';
// import { connectWebSocket } from '../services/websocket';
import Chart from '../components/Chart';

interface Response {
  id: string;
  questionId: string;
  answer: string;
}

interface Question {
  id: string;
  text: string;
  type: 'text' | 'multipleChoice';
  options?: string[];
}

interface SurveyData {
  id: string;
  title: string;
  questions: Question[];
  responses: Response[];
}

const SurveyResponses: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [surveyData, setSurveyData] = useState<SurveyData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        // const data = await getSurveyResponses(id);
        // setSurveyData(data);
      } catch (err) {
        setError('Failed to fetch survey responses');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyResponses();

    // const socket = connectWebSocket(id);
    // socket.onmessage = (event) => {
    //   const newResponse = JSON.parse(event.data);
    //   setSurveyData((prevData) => {
    //     if (!prevData) return null;
    //     return {
    //       ...prevData,
    //       responses: [...prevData.responses, newResponse],
    //     };
    //   });
    // };

    return () => {
      // socket.close();
    };
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!surveyData) return <div>No data available</div>;

  const getChartData = (question: Question) => {
    if (question.type === 'multipleChoice' && question.options) {
      return question.options.map((option) => ({
        name: option,
        value: surveyData.responses.filter(
          (r) => r.questionId === question.id && r.answer === option
        ).length,
      }));
    }
    return [];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {surveyData.title} - Responses
      </h1>
      {surveyData.questions.map((question) => (
        <div key={question.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {question.text}
          </h2>
          {/* {question.type === 'multipleChoice' ? (
            <Chart data={getChartData(question)} />
          ) : (
            <ul className="list-disc pl-5">
              {surveyData.responses
                .filter((r) => r.questionId === question.id)
                .map((response) => (
                  <li key={response.id}>{response.answer}</li>
                ))}
            </ul>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default SurveyResponses;
