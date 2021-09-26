import { Redirect, useLocation, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { useFetchMovie } from './rest';
import BreadCrumbLink from './BreadCrumbLink';
import { ReactComponent as Star } from './assets/Star.svg';
import { ReactComponent as Avatar } from './assets/Avatar.svg';

const Container = styled.div`
  padding: 0 var(--layout-side-gutter);
`;
const MainContainer = styled.main`
  display: flex;
  padding: 24px 0 48px;

  & > img {
    height: 488px;
    box-shadow: var(--default-box-shadow);
    border-radius: 5px;
  }
`;
const DetailsContainer = styled.div`
  padding: 28px;

  & > h2 {
    font-size: 3.5em;
    padding: 24px 0;

    & > span:last-of-type {
      color: #bbb;
      font-weight: 400;
    }
  }
`;
const RatingContainer = styled.div`
  display: flex;

  & svg {
    height: 24px;
    width: 24px;
  }
  & > div {
    color: #bbb;
    font-weight: 500;

    & > span:first-of-type {
      color: var(--palette-primary);
      font-size: 1.5em;
      padding: 0 4px;
    }
  }
`;
const Genres = styled.div`
  font-size: 1.5em;
  color: #63727d;
`;
const Director = styled.div`
  font-weight: 700;
  padding: 56px 0 12px;
`;
const Overview = styled.p`
  font-size: 1.25em;
  color: #63727d;
`;
const CastContainer = styled.div`
  & > h3 {
    font-size: 2em;
    font-weight: 400;
    line-height: 2;
  }
  & > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }
`;
const CastMember = styled.li`
  width: 200px;
`;
const CastImage = styled.img`
  width: 200px;
  height: 232px;
  border-radius: 5px;
  object-fit: cover;
`;
const CastNoImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 232px;
  border-radius: 5px;
  background-color: var(--palette-primary);
`;
const CastDetails = styled.div`
  font-weight: 500;
  margin-bottom: 16px;

  & > div:first-of-type {
    padding: 16px 0 4px;
    font-size: 1.15em;
  }
  & > div:last-of-type {
    color: #bbb;
  }
`;

const MovieDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { loading, data, error } = useFetchMovie(id, !!state?.movie);

  const movie = state?.movie ?? data;

  if (error) return <Redirect to="/" />;
  if (loading && !movie) return <div>Loading movie...</div>;

  return (
    <Container>
      <BreadCrumbLink
        browserBack={!!state?.breadCrumb}
        url={!state?.breadCrumb ? '/' : undefined}
        title={state?.breadCrumb ?? 'All Movies'}
      />
      <MainContainer>
        <img src={movie.posterPath} alt="" />
        <DetailsContainer>
          <RatingContainer>
            <Star />
            <div>
              <span>{movie.voteAverage.toFixed(1)}</span>
              <span>/10</span>
            </div>
          </RatingContainer>
          <h2>
            <span>{movie.title}</span>
            <span> ({new Date(movie.releaseDate).getFullYear()})</span>
          </h2>
          <Genres>{movie.genres.join(', ')}</Genres>
          <Director>Director: {movie.director.name}</Director>
          <Overview>{movie.overview}</Overview>
        </DetailsContainer>
      </MainContainer>
      <CastContainer>
        <h3>Cast</h3>
        <ul>
          {movie.cast.map(member => (
            <CastMember key={`${member.name}-${member.character}`}>
              {member.profilePath ? (
                <CastImage src={member.profilePath} alt="" />
              ) : (
                <CastNoImage>
                  <Avatar />
                </CastNoImage>
              )}
              <CastDetails>
                <div>{member.name}</div>
                <div>{member.character}</div>
              </CastDetails>
            </CastMember>
          ))}
        </ul>
      </CastContainer>
    </Container>
  );
};

export default MovieDetails;
