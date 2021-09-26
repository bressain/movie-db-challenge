import { bool, string } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { ReactComponent as BackArrow } from './assets/BackArrow.svg';

const ContainerLink = styled(Link)`
  text-decoration: none;
`;
const ContainerButton = styled.button`
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  & > h2 {
    color: var(--palette-title);
    font-size: 1.5em;
    margin-left: 16px;

    & > span:first-of-type {
      color: var(--palette-subtitle);
    }
  }
`;

const BreadCrumbLink = ({ browserBack, title, url }) => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  };

  const content = (
    <Container>
      <BackArrow />
      <h2>
        <span>Movies: </span>
        <span>{title}</span>
      </h2>
    </Container>
  );

  return browserBack ? (
    <ContainerButton onClick={goBack}>{content}</ContainerButton>
  ) : (
    <ContainerLink to={url}>{content}</ContainerLink>
  );
};
BreadCrumbLink.propTypes = {
  browserBack: bool,
  title: string.isRequired,
  url: string
};

export default BreadCrumbLink;
