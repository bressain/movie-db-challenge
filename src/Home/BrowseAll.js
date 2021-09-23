import { useMemo, useState } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { orderBy } from 'lodash-es';
import styled from '@emotion/styled';
import { SectionTitle } from './shared';
import { Poster } from '../shared';

const BrowseAllContainer = styled.div`
  padding: 60px var(--layout-side-gutter);
`;
const BrowseAllHeader = styled.div`
  display: flex;
  align-items: last baseline;
  justify-content: space-between;
`;
const SortContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;

  & > label {
    font-size: 0.85em;
    font-weight: 500;
    color: var(--palette-subtitle);
  }
`;
const BrowseAllList = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-row-gap: 18px;
  justify-content: space-between;
  margin-top: 34px;
`;

const BrowseAll = ({ allMovies }) => {
  const [sort, setSort] = useState('popularity');
  const sortedMovies = useMemo(() => {
    return orderBy(allMovies, [sort], [sort === 'title' ? 'asc' : 'desc']);
  }, [allMovies, sort]);

  const handleOnSort = e => {
    setSort(e.target.value);
  };

  return (
    <BrowseAllContainer>
      <BrowseAllHeader>
        <SectionTitle>
          <div>Movies</div>
          <div>Browse All</div>
        </SectionTitle>
        <SortContainer>
          <label htmlFor="sort">Sort by</label>
          <select id="sort" onChange={handleOnSort} value={sort}>
            <option value="popularity" label="Popularity" />
            <option value="title" label="Name" />
            <option value="releaseDate" label="Release Date" />
          </select>
        </SortContainer>
      </BrowseAllHeader>
      <BrowseAllList>
        {sortedMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/all/${movie.id}`}>
              <Poster src={movie.posterPath} alt={movie.title} />
            </Link>
          </li>
        ))}
      </BrowseAllList>
    </BrowseAllContainer>
  );
};
BrowseAll.propTypes = {
  allMovies: arrayOf(
    shape({
      id: string.isRequired,
      popularity: number.isRequired,
      posterPath: string.isRequired,
      releaseDate: string.isRequired,
      title: string.isRequired
    })
  )
};

export default BrowseAll;
