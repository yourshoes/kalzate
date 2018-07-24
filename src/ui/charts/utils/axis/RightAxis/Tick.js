import React from 'react';
import PropTypes from 'prop-types';
import Tick from './Tick';
import { G, Line } from './styled';

/**
 * Right Axis descrription
 */
function RightAxis({
  scale,
  x,
  y,
  color,
  nticks,
  tickFormat,
}) {
  const ticks = scale.ticks ? scale.ticks(nticks) : scale.domain();
  const height = Math.abs(scale.range()[1] - scale.range()[0]);

  return (
    <G {...{ x, y }}>
      <Line y1={0} y2={0} x1={0} x2={5} color={color} />
      <Line y1={0} y2={height} x1={0} x2={0} color={color} />
      <Line y1={height} y2={height} x1={0} x2={5} color={color} />
      {
        ticks
          .map(tick =>
            (<Tick
              y={scale(tick)}
              content={tickFormat(tick)}
              key={tickFormat(tick)}
              color={color}
            />))
      }
    </G>
  );
}


RightAxis.propTypes = {
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
   * Tick format
   */
  tickFormat: PropTypes.func,
};

RightAxis.defaultProps = {
  x: 0,
  y: 0,
  color: 'black',
  nticks: 5,
  tickFormat: d => d.toString(),
};

export default RightAxis;