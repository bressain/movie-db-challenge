import { useMemo } from 'react';
import Top5 from './Top5';
import Genres from './Genres';
import BrowseAll from './BrowseAll';
import { useFetchAllMovies } from '../rest';
import { getMoviesByGenre } from '../util';

/**
 * You have the option to use either REST
 * or GraphQL, whichever you prefer.
 *
 * Defaults to REST.
 *
 * Use `graphql/useAllMoviesQuery` instead for
 * GraphQL.
 **/
const Home = () => {
  const { loading, data } = useFetchAllMovies();

  const moviesByGenre = useMemo(() => getMoviesByGenre(data), [data]);

  if (loading) return <div>Loading movies...</div>;

  return (
    <>
      <Top5 allMovies={data} />
      <Genres moviesByGenre={moviesByGenre} />
      <BrowseAll allMovies={data} />
    </>
  );
};

export default Home;
