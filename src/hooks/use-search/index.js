/* eslint-disable no-console */
import { useState, useEffect } from 'react';

const useSearch = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://api.nomoreparties.co/beatfilm-movies=${query}`);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim() !== '') {
      fetchData();
    }
  }, [query]);

  return { data, loading };
};

export default useSearch;
