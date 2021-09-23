import { arrayOf, number, object, shape, string } from 'prop-types';
import Top5 from './Top5';
import Genres from './Genres';
import BrowseAll from './BrowseAll';

/**
 * You have the option to use either REST
 * or GraphQL, whichever you prefer.
 *
 * Defaults to REST.
 *
 * Use `graphql/useAllMoviesQuery` instead for
 * GraphQL.
 **/
const Home = ({ allMovies, moviesByGenre }) => {
  return (
    <>
      <Top5 allMovies={allMovies} />
      <Genres moviesByGenre={moviesByGenre} />
      <BrowseAll allMovies={allMovies} />
    </>
  );
};
Home.propTypes = {
  allMovies: arrayOf(
    shape({
      id: string.isRequired,
      genres: arrayOf(string).isRequired,
      popularity: number.isRequired,
      posterPath: string.isRequired,
      releaseDate: string.isRequired,
      title: string.isRequired,
      voteAverage: number.isRequired
    })
  ),
  moviesByGenre: object.isRequired
};

export default Home;
