import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getSurveyResponses,
  SurveyResponse,
} from '@app/services/api_not-used';
import { SurveyService } from '@app/services/surveyService';
import LoadingPage from '@app/components/LoadingSpinner';
import { Survey } from '@app/types';
import { Button } from '@app/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@app/components/ui/table';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card';
import { Download } from 'lucide-react';

const SurveyResponses: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [surveyResponses, setSurveyResponses] = useState<
    SurveyResponse[] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurveyAndResponses = async () => {
      if (!id) {
        setError('Invalid Survey ID');
        setLoading(false);
        return;
      }

      try {
        const [surveyData, responsesData] = await Promise.all([
          SurveyService.getSurvey(id),
          getSurveyResponses(id),
        ]);

        setSurvey(surveyData as Survey);
        setSurveyResponses(responsesData);
      } catch (err) {
        setError('Failed to fetch survey and responses');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyAndResponses();
  }, [id]);

  const exportData = () => {
    if (!survey || !surveyResponses) return;

    const headers = [
      'Username',
      ...survey.questions.map((q) => q.text),
    ];
    const csvData = [headers.join(',')];

    const userResponses: {
      [key: string]: { [key: string]: string };
    } = {};

    surveyResponses.forEach((response) => {
      Object.entries(response).forEach(([questionText, answers]) => {
        answers.forEach((answer) => {
          if (!answer) return;
          if (!answer.username) return;
          if (!userResponses[answer?.username]) {
            userResponses[answer.username] = {};
          }
          userResponses[answer.username][questionText] =
            answer.answer;
        });
      });
    });

    Object.entries(userResponses).forEach(([username, answers]) => {
      const row = [
        username,
        ...survey.questions.map((q) => answers[q.text] || ''),
      ];
      csvData.push(row.join(','));
    });

    const blob = new Blob([csvData.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${survey.title}_responses.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) return <LoadingPage />;
  if (error)
    return <div className="text-red-600 text-center">{error}</div>;
  if (!survey || !surveyResponses)
    return <div className="text-center">No data available</div>;

  const usernames = Array.from(
    new Set(
      surveyResponses.flatMap((response) =>
        Object.values(response).flatMap((answers) =>
          answers.map((a) => a.username)
        )
      )
    )
  );

  return (
    <Card className="container mx-auto px-4 py-8">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          {survey.title} by <i>{survey?.ownerUsername}</i> - Responses
        </CardTitle>
        <p className="text-gray-600">{survey.description}</p>
        <Button onClick={exportData} className="mt-4">
          <Download className="mr-2 h-4 w-4" /> Export Responses
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                {survey.questions.map((question) => (
                  <TableHead key={question.id}>
                    {question.text}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {usernames.map((username) => (
                <TableRow key={username}>
                  <TableCell>{username}</TableCell>
                  {survey.questions.map((question) => {
                    const answer = surveyResponses
                      .flatMap(
                        (response) => response[question.text] || []
                      )
                      .find((a) => a.username === username);
                    return (
                      <TableCell key={question.id}>
                        {answer ? answer.answer : '-'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SurveyResponses;
