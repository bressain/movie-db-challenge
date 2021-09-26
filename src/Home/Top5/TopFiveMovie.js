import { arrayOf, number, shape, string } from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ReactComponent as Star } from '../../assets/Star.svg';
import { Poster } from '../../shared';

const Container = styled.li`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  width: 264px;
  padding: 16px;
  border-radius: 5px;
  transition: box-shadow 0.25s ease-in-out;

  &:hover {
    box-shadow: var(--default-box-shadow);
    & a {
      opacity: 1;
    }
  }
`;
const TitleRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  overflow: hidden;
  & > h3 {
    flex: 1;
    font-size: 1.5em;
  }
  & > div {
    display: flex;
    padding: 4px 0 0 4px;
    column-gap: 4px;
    color: var(--palette-primary);
  }
`;
const Genres = styled.div`
  font-size: 0.75em;
  color: #555;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const DetailsButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  border: none;
  border-radius: 5px;
  background: var(--palette-primary);
  color: #fff;
  font-size: 0.85em;
  text-decoration: none;
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
`;

const TopFiveMovie = ({ movie }) => {
  return (
    <Container>
      <Poster src={movie.posterPath} alt="" />
      <TitleRatingContainer>
        <h3 title={movie.title}>{movie.title}</h3>
        <div>
          <Star />
          <span>{movie.voteAverage.toFixed(1)}</span>
        </div>
      </TitleRatingContainer>
      <Genres title={movie.genres.join(', ')}>{movie.genres.join(', ')}</Genres>
      <DetailsButton to={`/top-5/${movie.id}`}>View Details</DetailsButton>
    </Container>
  );
};
TopFiveMovie.propTypes = {
  movie: shape({
    id: number.isRequired,
    genres: arrayOf(string).isRequired,
    posterPath: string.isRequired,
    title: string.isRequired,
    voteAverage: number.isRequired
  })
};

export default TopFiveMovie;
