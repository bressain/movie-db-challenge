import { useMemo } from 'react';
import { Link, Redirect, useLocation, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import MovieList from './MovieList';
import { ReactComponent as BackArrow } from './assets/BackArrow.svg';
import SortSelect, { useSortMovies } from './SortSelect';
import { useFetchAllMovies } from './rest';
import { getGenreId, getMoviesByGenre } from './util';

const Container = styled.div`
  padding: 0 var(--layout-side-gutter);
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TitleLinkContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  & > h2 {
    color: var(--palette-title);
    font-size: 1.5em;
    margin-left: 16px;

    & > span:first-of-type {
      color: var(--palette-subtitle);
    }
  }
`;

const GenreList = () => {
  const { genreId } = useParams();
  const { state } = useLocation();
  const { loading, data } = useFetchAllMovies(!!state?.moviesByGenre);

  const moviesByGenre = useMemo(() => {
    return state?.moviesByGenre ?? getMoviesByGenre(data);
  }, [state?.moviesByGenre, data]);
  const genreIdToGenre = useMemo(() => {
    return Object.keys(moviesByGenre).reduce((dict, genre) => {
      dict[getGenreId(genre)] = genre;
      return dict;
    }, {});
  }, [moviesByGenre]);

  const genre = genreIdToGenre[genreId];
  const movies = moviesByGenre[genre];
  const { sort, sortedMovies, setSort } = useSortMovies(movies);

  if (loading && !genre) return <div>Loading movies...</div>;

  if (!genre) return <Redirect to="/" />;

  return (
    <Container>
      <HeaderContainer>
        <TitleLinkContainer to="/">
          <BackArrow />
          <h2>
            <span>Movies: </span>
            <span>{genre}</span>
          </h2>
        </TitleLinkContainer>
        <SortSelect sort={sort} onSort={setSort} />
      </HeaderContainer>
      <MovieList movies={sortedMovies} />
    </Container>
  );
};

export default GenreList;
