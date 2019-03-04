import React from 'react';
import PropTypes from 'prop-types';
import Tick from './TickY';
import { G, Line } from '../atoms/Axis';

/**
 * Left Axis.
 * Renders a vertical left
 * oriented axis
 */
function LeftAxis({
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
      <Line y1={0} y2={0} x1={0} x2={-5} color={color} />
      <Line y1={0} y2={height} x1={0} x2={0} color={color} />
      <Line y1={height} y2={height} x1={0} x2={-5} color={color} />
      {
        ticks
          .map((tick) =>
            (
              <Tick
                y={scale(tick)}
                content={tickFormat(tick)}
                key={tickFormat(tick)}
                color={color}
              />
            ))
      }
    </G>
  );
}


LeftAxis.propTypes = {
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

LeftAxis.defaultProps = {
  x: 0,
  y: 0,
  color: 'white',
  nticks: 5,
  fields: ['y'],
  tickFormat: (d) => d.toString(),
};

export default LeftAxis;
