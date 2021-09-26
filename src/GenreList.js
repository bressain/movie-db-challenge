import { useMemo } from 'react';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import MovieList from './MovieList';
import SortSelect, { useSortMovies } from './SortSelect';
import { useFetchAllMovies } from './rest';
import { getGenreId, getMoviesByGenre } from './util';
import BreadCrumbLink from './BreadCrumbLink';

const Container = styled.div`
  padding: 0 var(--layout-side-gutter);
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
        <BreadCrumbLink browserBack title={genre} />
        <SortSelect sort={sort} onSort={setSort} />
      </HeaderContainer>
      <MovieList breadCrumb={genre} movies={sortedMovies} />
    </Container>
  );
};

export default GenreList;
