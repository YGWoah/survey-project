import { useState, useEffect, useCallback } from 'react';
import {
  getSurvey,
  createSurvey,
  updateSurvey,
  deleteSurvey,
  Survey,
} from '../services/api';

export const useSurvey = (id?: string) => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchSurvey = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getSurvey(id);
      setSurvey(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred while fetching the survey.')
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchSurvey();
    }
  }, [id, fetchSurvey]);

  const create = useCallback(
    async (newSurvey: Omit<Survey, 'id'>) => {
      setLoading(true);
      setError(null);
      try {
        const createdSurvey = await createSurvey(newSurvey);
        setSurvey(createdSurvey);
        return createdSurvey;
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error(
                'An error occurred while creating the survey.'
              )
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const update = useCallback(
    async (updatedSurvey: Partial<Survey>) => {
      if (!survey) return;
      setLoading(true);
      setError(null);
      try {
        const updated = await updateSurvey(survey.id, updatedSurvey);
        setSurvey(updated);
        return updated;
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error(
                'An error occurred while updating the survey.'
              )
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [survey]
  );

  const remove = useCallback(async () => {
    if (!survey) return;
    setLoading(true);
    setError(null);
    try {
      await deleteSurvey(survey.id);
      setSurvey(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error('An error occurred while deleting the survey.')
      );
      throw err;
    } finally {
      setLoading(false);
    }
  }, [survey]);

  return {
    survey,
    loading,
    error,
    fetchSurvey,
    create,
    update,
    remove,
  };
};
