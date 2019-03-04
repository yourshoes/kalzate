import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const colorFn = (props) => (props.theme.charts.axis ? props.theme.charts.axis : props.color);

const G = styled.g`    
    stroke: 'solid'
`;
const Line = styled.line`
    stroke: ${colorFn};
`;
const Text = styled.text`
    fill: ${colorFn};
    text-anchor: end;
    alignment-baseline: middle;
`;

function TickY({ y, content, color }) {
  return (
    <G transform={`translate(0, ${y})`}>
      <Line x1={0} x2={-5} y1={0} y2={0} color={color} />
      <Text x={-10} y={0} color={color}>{content}</Text>
    </G>
  );
}

TickY.propTypes = {
  y: PropTypes.number,
  content: PropTypes.string,
  color: PropTypes.string,
};

TickY.defaultProps = {
  y: 0,
  content: 0,
  color: 'white',
};

export default TickY;
