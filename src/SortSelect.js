import { useCallback, useMemo, useState } from 'react';
import { func, oneOf } from 'prop-types';
import styled from '@emotion/styled';
import { orderBy } from 'lodash-es';

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

const SortSelect = ({ onSort, sort }) => {
  const handleOnSort = useCallback(
    e => {
      onSort(e.target.value);
    },
    [onSort]
  );

  return (
    <SortContainer>
      <label htmlFor="sort">Sort by</label>
      <select id="sort" onChange={handleOnSort} value={sort}>
        <option value="popularity" label="Popularity" />
        <option value="title" label="Name" />
        <option value="releaseDate" label="Release Date" />
      </select>
    </SortContainer>
  );
};
SortSelect.propTypes = {
  onSort: func.isRequired,
  sort: oneOf(['popularity', 'releaseDate', 'title']).isRequired
};

export function useSortMovies(movies) {
  const [sort, setSort] = useState('popularity');

  const sortedMovies = useMemo(() => {
    if (!movies) return [];

    return orderBy(movies, [sort], [sort === 'title' ? 'asc' : 'desc']);
  }, [movies, sort]);

  return { sort, sortedMovies, setSort };
}

export default SortSelect;
