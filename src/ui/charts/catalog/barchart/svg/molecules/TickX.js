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
  text-anchor: middle;
  alignment-baseline: hanging;
`;

function TickX({ x, content, color }) {
  return (
    <G transform={`translate(${x}, 0)`}>
      <Line x1={0} x2={0} y1={0} y2={5} color={color} />
      <Text x={0} y={10} color={color}>{content}</Text>
    </G>
  );
}

TickX.propTypes = {
  x: PropTypes.number,
  color: PropTypes.string,
  content: PropTypes.string,

};

TickX.defaultProps = {
  x: 0,
  content: 0,
  color: 'white',
};

export default TickX;
