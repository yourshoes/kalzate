import styled from 'styled-components';

const colorAxis = (props) => (props.theme.charts.axis ? props.theme.charts.axis : props.color);
const color = (props) => props.color;
const transform = (props) => `translate(${props.x}px,${props.y}px)`;

export const G = styled.g`
    transform: ${transform}
`;

export const Line = styled.line`
    stroke: ${color};
`;

export const LineAxis = styled.line`
    stroke: ${colorAxis};
`;

