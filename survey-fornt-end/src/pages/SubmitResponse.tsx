import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Response, Survey } from '../types';
import { submitResponse, getSurvey } from '../services/api';

const SubmitResponse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!id) return <div>No survey ID provided</div>;

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        const surveyData = await getSurvey(id);
        setSurvey(surveyData);
      } catch (err) {
        setError('Failed to load survey');
      }
    };

    loadSurvey();
  }, [id]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!survey) {
    return <div>Loading...</div>;
  }

  // Create initial values based on survey questions
  const initialValues = {
    responses: survey.questions.map((question) => ({
      id: question.id,
      text: '',
    })),
  };

  const validationSchema = Yup.object({
    responses: Yup.array().of(
      Yup.object({
        id: Yup.string().required(),
        text: Yup.string().required('Response is required'),
      })
    ),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{survey.title}</h1>
      <p className="mb-8 text-gray-600">{survey.description}</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await submitResponse({
              surveyId: id,
              responses: values.responses,
            });
            alert('Response submitted successfully');
          } catch (err) {
            setError('Failed to submit response');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            <FieldArray name="responses">
              {() => (
                <div className="space-y-6">
                  {survey.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className="bg-gray-50 rounded-lg p-6"
                    >
                      <label
                        htmlFor={`responses.${index}.text`}
                        className="block text-lg font-medium text-gray-900 mb-3"
                      >
                        {question.text}
                      </label>
                      <Field
                        as="textarea"
                        id={`responses.${index}.text`}
                        name={`responses.${index}.text`}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border min-h-[100px]"
                      />
                      {/* {touched.responses?.[index]?.text &&
                        errors.responses?.[index]?.text && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.responses[index].text}
                          </div>
                        )} */}
                    </div>
                  ))}
                </div>
              )}
            </FieldArray>

            {error && (
              <div className="text-red-500 text-sm mt-1">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Response'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubmitResponse;
