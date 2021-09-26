import { ReactComponent as Logo } from './assets/Logo.svg';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const pulse = keyframes`
  from { opacity: 20% }
  to { opacity: 100% }
`;
const pulseAnimation = css`500ms ease-in alternate infinite ${pulse}`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25vh;
  animation: ${pulseAnimation};
  & svg {
    height: 72px;
    width: 72px;
  }
  & .path-fill {
    fill: var(--palette-primary);
  }
  & h2 {
    margin-top: 24px;
  }
`;

const Loading = () => {
  return (
    <Container>
      <Logo />
      <h2>Loading</h2>
    </Container>
  );
};

export default Loading;
