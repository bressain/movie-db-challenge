import { arrayOf, number, shape, string } from 'prop-types';
import styled from '@emotion/styled';
import { SectionTitle } from './shared';
import MovieList from '../MovieList';
import SortSelect, { useSortMovies } from '../SortSelect';

const BrowseAllContainer = styled.div`
  padding: 60px var(--layout-side-gutter);
`;
const BrowseAllHeader = styled.div`
  display: flex;
  align-items: last baseline;
  justify-content: space-between;
`;

const BrowseAll = ({ allMovies }) => {
  const { sort, sortedMovies, setSort } = useSortMovies(allMovies);

  return (
    <BrowseAllContainer>
      <BrowseAllHeader>
        <SectionTitle>
          <div>Movies</div>
          <div>Browse All</div>
        </SectionTitle>
        <SortSelect onSort={setSort} sort={sort} />
      </BrowseAllHeader>
      <MovieList breadCrumb="all" movies={sortedMovies} />
    </BrowseAllContainer>
  );
};
BrowseAll.propTypes = {
  allMovies: arrayOf(
    shape({
      id: number.isRequired,
      popularity: number.isRequired,
      posterPath: string.isRequired,
      releaseDate: string.isRequired,
      title: string.isRequired
    })
  )
};

export default BrowseAll;
