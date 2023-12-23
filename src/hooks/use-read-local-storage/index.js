import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../../constexts/CurrentUserContext';

function useReadLocalStorage(isSavedMoviesPage) {
  const currentUser = useContext(CurrentUserContext);
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const loadInitialValues = () => {
      if (isSavedMoviesPage) {
        setInitialValues({});
      } else {
        const searchFromStorage = localStorage.getItem(currentUser.email);
        const values = searchFromStorage ? JSON.parse(searchFromStorage) : {};
        setInitialValues(values);
      }
    };

    loadInitialValues();
  }, [isSavedMoviesPage, currentUser]);

  return initialValues;
}

export default useReadLocalStorage;
