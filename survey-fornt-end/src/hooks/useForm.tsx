import { useState, useCallback } from 'react';

export const useForm = <T extends Record<string, any>>(
  initialState: T
) => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<
    Partial<Record<keyof T, string>>
  >({});

  const handleChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = event.target;
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    []
  );

  const handleBlur = useCallback(
    (
      event: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = event.target;
      validate(name, value);
    },
    []
  );

  const validate = useCallback((name: keyof T, value: any) => {
    // Add your validation logic here
    // This is a simple example, you might want to use a validation library like Yup for more complex validations
    if (value.trim() === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'This field is required',
      }));
    } else {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, []);

  const handleSubmit = useCallback(
    (onSubmit: (values: T) => void) =>
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Validate all fields before submission
        Object.entries(values).forEach(([name, value]) =>
          validate(name as keyof T, value)
        );
        if (Object.keys(errors).length === 0) {
          onSubmit(values);
        }
      },
    [values, errors, validate]
  );

  const resetForm = useCallback(() => {
    setValues(initialState);
    setErrors({});
  }, [initialState]);

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};
