import { useState } from 'react';
import { Form, Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { Plus, X } from 'lucide-react';
import { createSurvey } from '@app/services/api_not-used';

const QuestionSchema = Yup.object().shape({
  text: Yup.string().required('Question text is required'),
});

// Validation schema for the entire survey
const SurveySchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  questions: Yup.array()
    .of(QuestionSchema)
    .min(1, 'At least one question is required'),
});

const SurveyCreation = () => {
  const [error, setError] = useState<string>('');

  const initialValues = {
    title: 'kk',
    description: 'kk',
    questions: [{ text: 'kk' }],
  };

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      setError('');
      // Here you would typically make an API call to save the survey
      createSurvey(values);
      console.log('Survey data:', values);
    } catch (err) {
      setError('Failed to create survey. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Survey</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <Formik
          initialValues={initialValues}
          validationSchema={SurveySchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter survey title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
                {touched.title && errors.title && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.title}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Enter survey description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border min-h-[100px]"
                />
                {touched.description && errors.description && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </div>
                )}
              </div>

              <FieldArray name="questions">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-medium text-gray-900">
                        Questions
                      </h2>
                      <button
                        type="button"
                        onClick={() => push({ text: '' })}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Question
                      </button>
                    </div>

                    {values.questions.map((_, index) => (
                      <div
                        key={index}
                        className="relative bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <label
                              htmlFor={`questions.${index}.text`}
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Question {index + 1}
                            </label>
                            <Field
                              type="text"
                              name={`questions.${index}.text`}
                              placeholder="Enter your question"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                            />
                            {
                              touched.questions?.[index]?.text
                              // &&
                              // errors.questions?.[index]?.text && (
                              //   <div className="text-red-500 text-sm mt-1">
                              //     {errors.questions[index].text}
                              //   </div>
                              // )
                            }
                          </div>
                          {values.questions.length > 1 && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Creating Survey...'
                  : 'Create Survey'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SurveyCreation;
