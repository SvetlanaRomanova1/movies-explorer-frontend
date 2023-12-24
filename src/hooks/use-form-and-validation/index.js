import { useCallback, useEffect, useState } from 'react';
import isEmail from 'validator/es/lib/isEmail';

const noop = () => {};
const initDefault = {};
export default function useFormAndValidation(initialValues = initDefault, writeToStorage = noop) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const checkValidity = useCallback(() => {
    const isFormValid = document.forms[0].checkValidity();
    setIsValid(isFormValid);
  }, [setIsValid]);

  useEffect(() => {
    setValues(initialValues);
    checkValidity();
  }, [initialValues]);

  const handleChange = (e) => {
    const input = e.target;
    const { value, name, checked } = input;
    const regexPatternName = /^[A-Za-zА-Яа-яЁё\s-]+$/;

    if (name === 'name') {
      if (name === 'name' && !regexPatternName.test(value)) {
        input.setCustomValidity('Имя должно содержать только латиницу, кириллицу, пробел или дефис.');
      } else if (name === 'name' && input.validity.valueMissing) {
        input.setCustomValidity('Пожалуйста, введите ваше имя.');
      } else {
        input.setCustomValidity('');
      }
    }

    if (name === 'email') {
      if (!isEmail(value)) {
        input.setCustomValidity('Введите корректный адрес электронной почты.');
      } else if (input.validity.valueMissing) {
        input.setCustomValidity('Пожалуйста, введите адрес электронной почты.');
      } else {
        input.setCustomValidity('');
      }
    }
    let result = {};
    setValues((prevValues) => {
      result = { ...prevValues, [name]: input.type !== 'checkbox' ? value : checked };
      writeToStorage(result);
      return result;
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: input.validationMessage }));
    setIsValid(Object.values(result).every((val) => val !== '') && input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values,
    errors,
    isValid,
    handleChange,
    resetForm,
    checkValidity,
    setIsValid,
    setValues,
  };
}
