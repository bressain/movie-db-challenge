import { Redirect, Route, Switch } from 'react-router-dom';
import styled from '@emotion/styled';
import Home from './Home';
import GenreList from './GenreList';
import { ReactComponent as Logo } from './assets/Logo.svg';
import Dots from './assets/Dots.svg';
import MovieDetails from './MovieDetails';

/**
 * This function is used to simulate performance benchmarking.
 *
 * Should you choose to complete this step, this
 * function should be called only on first page load.
 **/
export const trackInitialLoad = () => {
  console.log('First page load');
};

/**
 * This function is used to simulate performance benchmarking.
 *
 * Should you choose to complete this step, this
 * function should be called only once the page has completely
 * loaded.
 **/
export const trackPageCompletedLoading = () => {
  console.log('Page done loading');
};

const Container = styled.div`
  max-width: 1440px;
  background-color: #fff;
  margin: 0 auto;
  background-image: url(${Dots});
  background-repeat: repeat-x;
  background-position: 450px 10px;
`;
const Header = styled.header`
  height: 66px;
  box-shadow: var(--default-box-shadow);
  background: #fff;
  display: flex;
  align-items: center;
  column-gap: 34px;

  & > a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 100%;
    background-color: var(--palette-primary);
  }
`;
const Content = styled.div`
  padding: 44px 0 0;
  min-height: 100vh;
`;

const App = () => {
  return (
    <Container>
      <Header>
        <a href="/">
          <Logo />
        </a>
        <h1>Reel Cinema</h1>
      </Header>
      <Content>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/browse/:genreId" component={GenreList} />
          <Route path="/movie/:id" component={MovieDetails} />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Content>
    </Container>
  );
};

export default App;
