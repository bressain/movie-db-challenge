import { object } from 'prop-types';
import { Link, Redirect, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import MovieList from './MovieList';
import { ReactComponent as BackArrow } from './assets/BackArrow.svg';
import SortSelect, { useSortMovies } from './SortSelect';

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

const GenreList = ({ genreIdToGenre, moviesByGenre }) => {
  const { genreId } = useParams();
  const genre = genreIdToGenre[genreId];
  const movies = moviesByGenre[genre];
  const { sort, sortedMovies, setSort } = useSortMovies(movies);

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
      <MovieList breadCrumb={genre} movies={sortedMovies} />
    </Container>
  );
};
GenreList.propTypes = {
  genreIdToGenre: object.isRequired,
  moviesByGenre: object.isRequired
};

export default GenreList;
