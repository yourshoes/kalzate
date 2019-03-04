/*
 *
 * WorkSpacePage
 *
 */

import React, { PropTypes } from 'react';
import { max } from 'lodash';
import { scaleLinear, scaleBand } from 'd3-scale';
import Rect from './atoms/Rect';
import BottomAxis from './molecules/BottomAxis';
import LeftAxis from './molecules/LeftAxis';
import { G, Line } from './atoms/Axis';

export class BoxPlot extends React.Component {
  static axisXSize = 30;
  static axisYSize = 30;

  shouldComponentUpdate({ width, height, data }) {
    return (
      this.props.width !== width ||
      this.props.height !== height ||
      this.props.data.length !== data.length
    );
  }

  createScales() {
    this.yScale = scaleLinear()
      .rangeRound([this.props.height - BoxPlot.axisXSize, 0])
      .domain([0, max(this.props.data.map(({ maximum }) => maximum))]);
    this.xScale = scaleBand()
      .rangeRound([0, this.props.width])
      .padding(0.1)
      .domain(this.props.data.map(({ day }) => day));
  }

  createBoxPlot() {
    return this.props.data.map(({ maximum, minimum, median, quartile1, quartile3, day }, i) => (
      // fill={this.props.color || '#fe9922'}
      <G
        x={this.xScale(day) + BoxPlot.axisYSize + this.xScale.bandwidth() / 2}
        y={this.yScale(median)}
      >
        <Line
          color={this.props.color || 'rgb(115, 201, 144)'}
          x1={0}
          y1={this.yScale(maximum) - this.yScale(median)}
          x2={0}
          y2={this.yScale(minimum) - this.yScale(median)}
          stroke={'darkgray'}
          stroke-width={'4px'}
        />
        <Line
          color={this.props.color || 'rgb(115, 201, 144)'}
          x1={-10}
          y1={this.yScale(maximum) - this.yScale(median)}
          x2={10}
          y2={this.yScale(maximum) - this.yScale(median)}
          stroke={'darkgray'}
          stroke-width={'4px'}
        />
        <Line
          color={this.props.color || 'rgb(115, 201, 144)'}
          x1={-10}
          y1={this.yScale(minimum) - this.yScale(median)}
          x2={10}
          y2={this.yScale(minimum) - this.yScale(median)}
          stroke={'darkgray'}
          stroke-width={'4px'}
        />
        <Rect
          key={i}
          color={this.props.color || 'rgb(115, 201, 144)'}
          x={-10}
          y={this.yScale(quartile3) - this.yScale(median)}
          height={this.yScale(quartile1) - this.yScale(quartile3)}
          width={20}
          onMouseOver={() =>
            this.props.onMouseOver
              ? this.props.onMouseOver({ maximum, minimum, median, quartile1, quartile3, day })
              : null
          }
          onMouseOut={() => (this.props.onMouseOut ? this.props.onMouseOut() : null)}
        />
        <Line
          color={this.props.color || 'rgb(115, 201, 144)'}
          x1={-10}
          y1={0}
          x2={10}
          y2={0}
          stroke={'darkgray'}
          stroke-width={'4px'}
        />
      </G>
    ));
  }

  render() {
    this.createScales();
    return (
      <div
        style={{ textAlign: 'center', padding: '15px', width: '100%', height: 'calc(100% - 60px)' }}
      >
        <svg width={'100%'} height={'100%'}>
          <G x={0} y={5}>
            {this.createBoxPlot()}
            <LeftAxis scale={this.yScale} x={BoxPlot.axisYSize} />
            <BottomAxis
              scale={this.xScale}
              y={this.props.height - BoxPlot.axisXSize}
              x={BoxPlot.axisYSize}
            />
          </G>
        </svg>
      </div>
    );
  }
}

BoxPlot.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  color: React.PropTypes.string,
  data: React.PropTypes.array,
  onMouseOver: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
};

export default BoxPlot;
