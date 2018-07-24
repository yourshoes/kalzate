import styled from 'styled-components';

const color = props => props.color;
const transform = props => `translate(${props.x}px,${props.y}px)`;

export const G = styled.g`
  transform: ${transform};
`;

export const Line = styled.line`
  stroke: ${color};
  stroke-width: 1;
`;