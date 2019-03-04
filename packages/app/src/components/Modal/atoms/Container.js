import styled, { keyframes } from 'styled-components';

const fadeAnimation = keyframes`
from,
to {
  animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}

from {
  transform: translate(50%, -0%);
  opacity: 0;
}

to {
  transform: translate(50%, -50%);
  opacity: 1;
}
`;

export const Container = styled.div`
  margin: 0;
  padding: 0;
  opacity: 1;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  animation: ${fadeAnimation} 1.5s ease-in-out;
`;

export default Container;
