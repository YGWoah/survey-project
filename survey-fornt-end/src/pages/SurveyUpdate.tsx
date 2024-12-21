// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Form, Field, FieldArray, Formik } from 'formik';
// import * as Yup from 'yup';
// import { Plus, X, Loader2 } from 'lucide-react';
// import { getSurvey } from '@app/services/api_not-used';
// import { Survey } from '@app/types';
// import { SurveyService } from '@app/services/surveyService';

// const QuestionSchema = Yup.object().shape({
//   text: Yup.string().required('Question text is required'),
// });

// const SurveySchema = Yup.object().shape({
//   title: Yup.string().required('Title is required'),
//   description: Yup.string().required('Description is required'),
//   questions: Yup.array()
//     .of(QuestionSchema)
//     .min(1, 'At least one question is required'),
// });

// const SurveyUpdate: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const [survey, setSurvey] = useState<Survey | null>(null);
//   const [error, setError] = useState<string>('');
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchSurvey = async () => {
//       try {
//         if (id) {
//           const fetchedSurvey = await getSurvey(id);
//           setSurvey(fetchedSurvey);
//         }
//       } catch (err) {
//         setError('Failed to fetch survey. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSurvey();
//   }, [id]);

//   const handleSubmit = async (
//     values: Survey,
//     {
//       setSubmitting,
//     }: { setSubmitting: (isSubmitting: boolean) => void }
//   ) => {
//     try {
//       if (!id) {
//         setError('Survey ID is required');
//         return;
//       }
//       await SurveyService.updateServey(id, values);
//       navigate(`/survey/${id}`);
//     } catch (err) {
//       setError('Failed to update survey. Please try again.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
//       </div>
//     );
//   }

//   if (!survey) {
//     return (
//       <div className="text-center text-red-500">Survey not found</div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-2xl">
//       <h1 className="text-3xl font-bold mb-6">Update Survey</h1>

//       <div className="bg-white rounded-lg shadow p-6">
//         <Formik
//           initialValues={survey}
//           validationSchema={SurveySchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values, errors, touched, isSubmitting }) => (
//             <Form className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="title"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Title
//                 </label>
//                 <Field
//                   type="text"
//                   id="title"
//                   name="title"
//                   placeholder="Enter survey title"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
//                 />
//                 {touched.title && errors.title && (
//                   <div className="text-red-500 text-sm mt-1">
//                     {errors.title}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label
//                   htmlFor="description"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Description
//                 </label>
//                 <Field
//                   as="textarea"
//                   id="description"
//                   name="description"
//                   placeholder="Enter survey description"
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border min-h-[100px]"
//                 />
//                 {touched.description && errors.description && (
//                   <div className="text-red-500 text-sm mt-1">
//                     {errors.description}
//                   </div>
//                 )}
//               </div>

//               <FieldArray name="questions">
//                 {({ push, remove }) => (
//                   <div className="space-y-4">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-lg font-medium text-gray-900">
//                         Questions
//                       </h2>
//                       <button
//                         type="button"
//                         onClick={() => push({ text: '' })}
//                         className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                       >
//                         <Plus className="w-4 h-4 mr-2" />
//                         Add Question
//                       </button>
//                     </div>

//                     {values.questions.map((_, index) => (
//                       <div
//                         key={index}
//                         className="relative bg-gray-50 rounded-lg p-4 border border-gray-200"
//                       >
//                         <div className="flex items-start gap-4">
//                           <div className="flex-1">
//                             <label
//                               htmlFor={`questions.${index}.text`}
//                               className="block text-sm font-medium text-gray-700 mb-1"
//                             >
//                               Question {index + 1}
//                             </label>
//                             <Field
//                               type="text"
//                               name={`questions.${index}.text`}
//                               placeholder="Enter your question"
//                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
//                             />
//                             {/* {touched.questions?.[index]?.text &&
//                               errors.questions?.[index]?.text && (
//                                 <div className="text-red-500 text-sm mt-1">
//                                   {errors.questions[index]?.text}
//                                 </div>
//                               )} */}
//                           </div>
//                           {values.questions.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => remove(index)}
//                               className="text-gray-400 hover:text-red-500 p-1"
//                               aria-label={`Remove question ${
//                                 index + 1
//                               }`}
//                             >
//                               <X className="w-4 h-4" />
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </FieldArray>

//               {error && (
//                 <div className="text-red-500 text-sm">{error}</div>
//               )}

//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={() => navigate(`/survey/${id}`)}
//                   className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting
//                     ? 'Updating Survey...'
//                     : 'Update Survey'}
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default SurveyUpdate;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import { Plus, X, Loader2 } from 'lucide-react';
import { getSurvey } from '@app/services/api_not-used';
import { Survey } from '@app/types';
import { SurveyService } from '@app/services/surveyService';

// Types
interface Question {
  text: string;
}

// Validation Schemas
const ValidationSchemas = {
  question: Yup.object().shape({
    text: Yup.string().required('Question text is required'),
  }),
  survey: Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          id: Yup.string(),
          text: Yup.string().required('Question text is required'),
        })
      )
      .min(1, 'At least one question is required'),
  }),
};

// Components
const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
    <p className="text-gray-500">Loading survey...</p>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-50 border-l-4 border-red-400 p-4 my-4">
    <div className="flex">
      <div className="flex-1">
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  </div>
);

const QuestionField: React.FC<{
  index: number;
  onRemove: () => void;
  showRemove: boolean;
  error?: string;
  touched?: boolean;
}> = ({ index, onRemove, showRemove, touched }) => (
  <div className="relative bg-gray-50 rounded-lg p-4 border border-gray-200">
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
          id={`questions.${index}.text`}
          name={`questions.${index}.text`}
          placeholder="Enter your question"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
        />
        {/* {touched && error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )} */}
      </div>
      {showRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500 p-1"
          aria-label={`Remove question ${index + 1}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  </div>
);

// Custom Hook
const useSurveyData = (surveyId: string | undefined) => {
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (!surveyId) {
        setError('Survey ID is required');
        setIsLoading(false);
        return;
      }

      try {
        const fetchedSurvey = await getSurvey(surveyId);
        setSurvey(fetchedSurvey);
      } catch (err) {
        setError('Failed to fetch survey. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurvey();
  }, [surveyId]);

  return { survey, error, isLoading, setError };
};

// Main Component
const SurveyUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { survey, error, isLoading, setError } = useSurveyData(id);

  const handleSubmit = async (
    values: Survey,
    {
      setSubmitting,
    }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      if (!id) {
        setError('Survey ID is required');
        return;
      }
      await SurveyService.updateServey(id, values)
        .then(() => {
          console.log('succufelly updated');
        })
        .catch((error) => {
          console.log(error);
        });
      // navigate(`/survey/${id}`);
    } catch (err) {
      setError('Failed to update survey. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!survey) return <ErrorMessage message="Survey not found" />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Update Survey</h1>

        <Formik
          initialValues={survey}
          validationSchema={ValidationSchemas.survey}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, isSubmitting }) => (
            <Form className="space-y-6">
              <div className="space-y-4">
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

                      <div className="space-y-4">
                        {values.questions.map((_, index) => (
                          <QuestionField
                            key={index}
                            index={index}
                            onRemove={() => remove(index)}
                            showRemove={values.questions.length > 1}
                            // error={errors.questions?.[index]?.text as string}
                            touched={
                              touched.questions?.[index]
                                ?.text as boolean
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>

              {error && <ErrorMessage message={error} />}

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate(`/survey/${id}`)}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[150px]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Updating...
                    </div>
                  ) : (
                    'Update Survey'
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SurveyUpdate;
