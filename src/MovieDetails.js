import { Redirect, useLocation, useParams } from 'react-router-dom';
import { useFetchMovie } from './rest';

const MovieDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { loading, data, error } = useFetchMovie(id, !!state?.movie);

  const movie = state?.movie ?? data;

  if (error) return <Redirect to="/" />;
  if (loading && !movie) return <div>Loading movie...</div>;

  return <div />;
};

export default MovieDetails;
