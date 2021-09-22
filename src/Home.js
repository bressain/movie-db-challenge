import { arrayOf, number, shape, string } from 'prop-types';
import styled from '@emotion/styled';
import { useMemo } from 'react';
import Top5 from './Top5';

const SectionTitle = styled.h2`
  color: var(--palette-title);
  font-size: 3em;

  & > div:first-of-type {
    color: var(--palette-subtitle);
    font-size: 0.5em;
  }
`;
const BrowseContainer = styled.div`
  background-color: #f4f5fb;
  padding: 58px var(--layout-side-gutter) 84px;
`;
const BrowseList = styled.ul`
  display: inline-flex;
  overflow: auto;
`;
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
const Home = ({ allMovies }) => {
  const allGenres = useMemo(() => {
    return allMovies.reduce((genres, movie) => {
      movie.genres.forEach(g => {
        if (!genres.has(g)) genres.add(g);
      });
      return genres;
    }, new Set());
  }, [allMovies]);

  return (
    <div>
      <Top5 allMovies={allMovies} />
      <BrowseContainer>
        <SectionTitle>
          <div>Browse</div>
          <div>by Genre</div>
        </SectionTitle>
        <BrowseList>
          {[...allGenres].map(genre => (
            <li key={genre}>{genre}</li>
          ))}
        </BrowseList>
      </BrowseContainer>
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
  )
};

export default Home;
