/*
 *
 * WorkSpacePage
 *
 */

import React, { PropTypes } from 'react';
import { max } from 'lodash';
import { scaleLinear } from 'd3-scale';
import Rect from './atoms/Rect';

export class BarChart extends React.Component {

  static barSize = 30;

  createBarChart() {
    const yScale = scaleLinear()
    .domain([0, max(this.props.data.map(({ amount }) => amount))])
    .range([0, this.props.width]);
    
    const barSize = BarChart.barSize;

    const xPadding = 8;
    //((this.props.width - (this.props.data.length * 25)) / this.props.data.length);

    const leftPadding = (this.props.width - ((this.props.data.length * barSize)) - (this.props.data.length * xPadding)) / 2;

    return this.props.data.map(({ amount }, i) =>
    // fill={this.props.color || '#fe9922'}
      <Rect
        fill={this.props.color || 'rgb(115, 201, 144)'}
        x={leftPadding + (i * (barSize + xPadding))}
        y={this.props.height - yScale(amount)}
        height={yScale(amount)}
        width={barSize}
      />);
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <svg width={this.props.width} height={this.props.height}>
          {this.createBarChart()}
        </svg>
      </div>
    );
  }
}

BarChart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  color: React.PropTypes.string,
  data: React.PropTypes.array,
};


export default BarChart;

