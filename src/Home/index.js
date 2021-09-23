import { arrayOf, number, object, shape, string } from 'prop-types';
import styled from '@emotion/styled';
import Top5 from './Top5';
import Genres from './Genres';
import { SectionTitle } from './shared';

const BrowseAllContainer = styled.div`
  padding: 60px var(--layout-side-gutter);
`;
const BrowseAllHeader = styled.div`
  display: flex;
  align-items: last baseline;
  justify-content: space-between;
`;
const BrowseAllList = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
`;

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
    <div>
      <Top5 allMovies={allMovies} />
      <Genres moviesByGenre={moviesByGenre} />
      <BrowseAllContainer>
        <BrowseAllHeader>
          <SectionTitle>
            <div>Movies</div>
            <div>Browse All</div>
          </SectionTitle>
          <div>
            <label htmlFor="sort">Sort by</label>
            <select>
              <option key="popularity" label="Popularity" selected />
              <option key="name" label="Name" />
              <option key="date" label="Release Date" />
            </select>
          </div>
        </BrowseAllHeader>
        <BrowseAllList>
          {allMovies.map(movie => (
            <li key={movie.id}>
              {movie.title} - {movie.posterPath}
            </li>
          ))}
        </BrowseAllList>
      </BrowseAllContainer>
    </div>
  );
};
Home.propTypes = {
  allMovies: arrayOf(
    shape({
      id: string.isRequired,
      genres: arrayOf(string).isRequired,
      posterPath: string.isRequired,
      title: string.isRequired,
      voteAverage: number.isRequired
    })
  ),
  moviesByGenre: object.isRequired
};

export default Home;
