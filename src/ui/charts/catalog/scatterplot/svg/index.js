/*
 *
 * WorkSpacePage
 *
 */

import React, { PropTypes } from 'react';
import { max } from 'lodash';
import { scaleLinear } from 'd3-scale';
import Circle from './atoms/Circle';
import BottomAxis from './molecules/BottomAxis';
import LeftAxis from './molecules/LeftAxis';
import { G } from './atoms/Axis';

export class ScatterPlot extends React.Component {

  static axisXSize = 30;
  static axisYSize = 30;
  static radius = 14;

  shouldComponentUpdate({ width, height, data }) {
    return this.props.width !== width || this.props.height !== height || this.props.data.length !== data.length;
  }

  createScales() {
    this.yScale = scaleLinear()
      .range([this.props.height - ScatterPlot.axisXSize, 0])
      .domain([0, max(this.props.data.map(({ sold }) => sold))]);
    this.xScale = scaleLinear()
      // .range([0, this.props.width - ScatterPlot.radius - (this.props.width * 0.01) - (this.props.height * 0.01)])
      .range([0, this.props.width - ScatterPlot.radius])
      .domain([0, max(this.props.data.map(({ price }) => price))]);
    this.rScale = scaleLinear()
      // .range([0, ScatterPlot.radius + (this.props.width * 0.01) + (this.props.height * 0.01)])
      .range([1, ScatterPlot.radius])
      .domain([0, max(this.props.data.map(({ amount }) => amount))]);
  }

  createScatterPlot() {
    return this.props.data.map(({ amount, price, sold, title }, i) =>
      // fill={this.props.color || '#fe9922'}
      <Circle
        key={i}
        fill={this.props.color || 'rgb(115, 201, 144)'}
        cy={this.yScale(sold)}
        cx={this.xScale(price) + ScatterPlot.axisYSize}
        r={this.rScale(amount)}
        onMouseOver={() => this.props.onMouseOver ? this.props.onMouseOver({ amount, price, sold, title }) : null}
        onMouseOut={() => this.props.onMouseOut ? this.props.onMouseOut() : null}
      />);
  }

  render() {
    this.createScales();
    return (
      <div style={{ textAlign: 'center', padding: '15px', width: '100%', height: 'calc(100% - 60px)' }}>
        <svg width={'100%'} height={'100%'}>
          <G x={0} y={10}>
            {this.createScatterPlot()}
            <LeftAxis scale={this.yScale} x={ScatterPlot.axisYSize} />
            <BottomAxis scale={this.xScale} y={this.props.height - ScatterPlot.axisXSize} x={ScatterPlot.axisYSize} />
          </G>
        </svg>
      </div>
    );
  }
}

ScatterPlot.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  color: React.PropTypes.string,
  data: React.PropTypes.array,
  onMouseOver: React.PropTypes.function,
  onMouseOut: React.PropTypes.function,
};


export default ScatterPlot;

