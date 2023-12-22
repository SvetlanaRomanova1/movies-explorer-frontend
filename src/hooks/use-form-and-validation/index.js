import { useState, useCallback, useContext } from 'react';
import isEmail from 'validator/es/lib/isEmail';
import { CurrentUserContext } from '../../constexts/CurrentUserContext';

export default function useFormAndValidation(isSaveToLocalStorage = false) {
  const currentUser = useContext(CurrentUserContext);
  const searchFromStorage = localStorage.getItem(currentUser.email);
  const initialValues = searchFromStorage ? JSON.parse(searchFromStorage) : {};
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const input = e.target;
    const { value, name, checked } = input;
    // eslint-disable-next-line
    const regexPatternName = /[A-Za-zА-Яа-яЁё \-]+$/;

    if (name === 'name' && !regexPatternName.test(value)) {
      input.setCustomValidity('Имя должно содержать только латиницу, кириллицу, пробел или дефис.');
    } else if (name === 'name' && input.validity.valueMissing) {
      input.setCustomValidity('Пожалуйста, введите ваше имя.');
    } else {
      input.setCustomValidity('');
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

    setValues((prevValues) => {
      const result = { ...prevValues, [name]: input.type !== 'checkbox' ? value : checked };
      if (isSaveToLocalStorage) {
        localStorage.setItem(currentUser.email, JSON.stringify(result));
      }
      return result;
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: input.validationMessage }));
    setIsValid(Object.values(values).every((val) => val !== '') && input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  const checkValidity = useCallback(() => {
    const isFormValid = document.forms[0].checkValidity();
    setIsValid(isFormValid);
  }, [setIsValid]);

  return {
    values, errors, isValid, handleChange, resetForm, checkValidity, setIsValid, setValues,
  };
}
