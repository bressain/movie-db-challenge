import { useState, useEffect } from 'react';
import { REST_API_ROOT_ENDPOINT } from './index';

const useFetchMovies = skip => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const endpoint = `${REST_API_ROOT_ENDPOINT}/movies`;

  useEffect(() => {
    if (skip) return;

    fetch(endpoint)
      .then(res => res.json())
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [endpoint]);

  return { data, loading, error };
};

export default useFetchMovies;
