import './Home.css';
import { useFetchAllMovies } from './rest';

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
  const { data } = useFetchAllMovies();

  return (
    <div className="home-container">
      <h1>Popular Movies</h1>

      <ol>
        {data.map(movie => (
          <li key={movie.id}>
            {movie.title}
            <ul>
              <li>Release Date: {movie.releaseDate}</li>
              <li>Description: {movie.overview}</li>
              <li>Average Vote: {movie.voteAverage}</li>
              <li>Popularity: {movie.popularity}</li>
              <li>Total Votes: {movie.voteCount}</li>
              <li>Genres: {movie.genres.join(', ')}</li>
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
