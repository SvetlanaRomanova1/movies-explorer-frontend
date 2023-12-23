import { useContext } from 'react';
import { CurrentUserContext } from '../../constexts/CurrentUserContext';

function useWriteLocalStorage(isSavedMoviesPage) {
  const currentUser = useContext(CurrentUserContext);

  return (values) => {
    if (!isSavedMoviesPage) {
      localStorage.setItem(currentUser.email, JSON.stringify(values));
    }
  };
}

export default useWriteLocalStorage;
