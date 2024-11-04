import { useState, useEffect, useCallback } from 'react';
import {
  getSurveyResponses,
  submitSurveyResponse,
  SurveyResponse,
  Answer,
} from '../services/api';
// import {
//   connectWebSocket,
//   sendWebSocketMessage,
// } from '../services/websocket';

export const useSurveyResponses = (surveyId: string) => {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchResponses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSurveyResponses(surveyId);
      setResponses(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error(
              'An error occurred while fetching survey responses.'
            )
      );
    } finally {
      setLoading(false);
    }
  }, [surveyId]);

  useEffect(() => {
    fetchResponses();
  }, [fetchResponses]);

  // useEffect(() => {
  //   const socket = connectWebSocket(surveyId);

  //   socket.onmessage = (event) => {
  //     const newResponse = JSON.parse(event.data);
  //     setResponses((prevResponses) => [
  //       ...prevResponses,
  //       newResponse,
  //     ]);
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, [surveyId]);

  const submitResponse = useCallback(
    async (answers: Answer[]) => {
      setLoading(true);
      setError(null);
      try {
        const newResponse = await submitSurveyResponse(
          surveyId,
          answers
        );
        setResponses((prevResponses) => [
          ...prevResponses,
          newResponse,
        ]);
        return newResponse;
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error(
                'An error occurred while submitting the survey response.'
              )
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [surveyId]
  );

  return {
    responses,
    loading,
    error,
    fetchResponses,
    submitResponse,
  };
};
