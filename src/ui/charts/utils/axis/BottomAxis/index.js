import React from 'react';
import PropTypes from 'prop-types';
import Tick from './Tick';
import { G, Line } from './styled';

/**
 * Bottom Axis descrription
 */
function BottomAxis({
  scale,
  x,
  y,
  color,
  nticks,
  tickFormat,
}) {
  const ticks = scale.ticks ? scale.ticks(nticks) : scale.domain();
  const width = scale.range()[1] - scale.range()[0];

  return (
    <G {...{ x, y }}>
      <Line x1={0} x2={0} y1={0} y2={5} color={color} />
      <Line x1={0} x2={width} y1={0} y2={0} color={color} />
      <Line x1={width} x2={width} y1={0} y2={5} color={color} />
      {
          ticks.map(tick =>
            (<Tick
              x={scale(tick)}
              content={tickFormat(tick)}
              key={`${tickFormat(tick)}-${Math.random()}`}
              color={color}
            />))
      }
    </G>
  );
}


BottomAxis.propTypes = {
  /**
   * Associated scale.
   */
  scale: PropTypes.func.isRequired,
  /**
   * horizontal translation in px.
   */
  x: PropTypes.number,
  /**
   * vertical translation in px.
   */
  y: PropTypes.number,
  /**
   * Line and text color
   */
  color: PropTypes.string,
  /**
   * Number of ticks to be displayed
   */
  nticks: PropTypes.number,
  /**
   * Tick Format
   */
  tickFormat: PropTypes.func,
};

BottomAxis.defaultProps = {
  x: 0,
  y: 0,
  color: 'black',
  nticks: 5,
  tickFormat: d => d.toString(),
};

export default BottomAxis;