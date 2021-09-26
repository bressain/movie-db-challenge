import { useState, useEffect } from 'react';
import { REST_API_ROOT_ENDPOINT } from './index';

const useFetchMovie = (id, skip) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const endpoint = `${REST_API_ROOT_ENDPOINT}/movies/${id}`;

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

export default useFetchMovie;
