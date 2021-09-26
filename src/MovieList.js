import { arrayOf, number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Poster } from './shared';

const List = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-row-gap: 18px;
  justify-content: space-between;
  margin-top: 34px;
`;

const MovieList = ({ breadCrumb, movies }) => {
  return (
    <List>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/${breadCrumb}/${movie.id}`}>
            <Poster src={movie.posterPath} alt={movie.title} />
          </Link>
        </li>
      ))}
    </List>
  );
};
MovieList.propTypes = {
  breadCrumb: string.isRequired,
  movies: arrayOf(
    shape({
      id: number.isRequired,
      posterPath: string.isRequired,
      title: string.isRequired
    })
  )
};

export default MovieList;
