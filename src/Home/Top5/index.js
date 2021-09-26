import { useMemo } from 'react';
import { arrayOf, number, shape, string } from 'prop-types';
import styled from '@emotion/styled';
import { orderBy } from 'lodash-es';
import TopFiveMovie from './TopFiveMovie';

const Top5Container = styled.div`
  padding: 0 calc(var(--layout-side-gutter) - 16px) 48px;
`;
const Top5Title = styled.h2`
  padding: 0 16px;
  color: var(--palette-title);

  & > span:first-of-type {
    color: var(--palette-subtitle);
  }
`;
const Top5List = styled.ol`
  display: flex;
  justify-content: space-between;

  padding-top: 24px;
`;

const Top5 = ({ allMovies }) => {
  const topFiveMovies = useMemo(() => {
    return orderBy(allMovies, ['voteAverage'], ['desc']).slice(0, 5);
  }, [allMovies]);

  return (
    <Top5Container>
      <Top5Title>
        <span>Movies: </span>
        <span>Top 5</span>
      </Top5Title>
      <Top5List>
        {topFiveMovies.map(movie => (
          <TopFiveMovie key={movie.id} movie={movie} />
        ))}
      </Top5List>
    </Top5Container>
  );
};
Top5.propTypes = {
  allMovies: arrayOf(
    shape({
      id: number.isRequired,
      genres: arrayOf(string).isRequired,
      posterPath: string.isRequired,
      title: string.isRequired,
      voteAverage: number.isRequired
    })
  )
};

export default Top5;
