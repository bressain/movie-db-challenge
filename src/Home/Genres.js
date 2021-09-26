import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { SectionTitle } from './shared';
import { getGenreId } from '../util';

const BrowseContainer = styled.div`
  background-color: #f4f5fb;
  padding: 60px calc(var(--layout-side-gutter) - 8px);

  & > h2 {
    padding: 0 8px;
  }
`;
const BrowseList = styled.ul`
  display: flex;
  column-gap: 18px;
  padding: 28px 8px;
  width: 100%;
  overflow: auto;
`;
const GenreLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 312px;
  height: 200px;
  background: linear-gradient(120deg, #994ded 10%, #7fc5f2 100%);
  border-radius: 5px;
  color: #fff;
  font-size: 2em;
  font-weight: 700;
  text-decoration: none;
  box-shadow: var(--default-box-shadow);
`;

const Genres = ({ moviesByGenre }) => {
  return (
    <BrowseContainer>
      <SectionTitle>
        <div>Browse</div>
        <div>by Genre</div>
      </SectionTitle>
      <BrowseList>
        {Object.keys(moviesByGenre).map(genre => (
          <li key={genre}>
            <GenreLink
              to={{
                pathname: `/browse/${getGenreId(genre)}`,
                state: { moviesByGenre }
              }}
            >
              {genre}
            </GenreLink>
          </li>
        ))}
      </BrowseList>
    </BrowseContainer>
  );
};
Genres.propTypes = {
  moviesByGenre: object.isRequired
};

export default Genres;
