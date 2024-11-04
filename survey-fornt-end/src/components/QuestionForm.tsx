import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface QuestionFormProps {
  // onSubmit: (question: QuestionFormData) => void;
  initialData?: QuestionFormData;
}

type QuestionFormData = Omit<Question, 'id'>;

const QuestionForm: React.FC<QuestionFormProps> = ({
  // onSubmit,
  initialData,
}) => {
  const [values, setValues] = useState<QuestionFormData>(
    initialData || {
      text: '',
    }
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof QuestionFormData, string>>
  >({});

  useEffect(() => {
    if (initialData) {
      setValues(initialData);
    }
  }, [initialData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700"
        >
          Question Text
        </label>
        <input
          type="text"
          id="text"
          name="text"
          value={values.text}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.text && (
          <p className="mt-2 text-sm text-red-600">{errors.text}</p>
        )}
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Question
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
