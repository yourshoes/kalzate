/*
 *
 * WorkSpacePage
 *
 */

import React, { PropTypes } from 'react';
import { max } from 'lodash';
import { scaleLinear, scaleBand } from 'd3-scale';
import BottomAxis from './molecules/BottomAxis';
import LeftAxis from './molecules/LeftAxis';
import { G, Line } from './atoms/Axis';

export class LineChart extends React.Component {
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
      .rangeRound([this.props.height - LineChart.axisXSize, 0])
      .domain([0, max(this.props.data.map(({ maximum }) => maximum))]);
    this.xScale = scaleBand()
      .rangeRound([0, this.props.width])
      .padding(0.1)
      .domain(this.props.data.map(({ day }) => day));
  }

  createLines() {
    const linePointsMax = [
      {
        x1: this.xScale(this.props.data[0].day) + (LineChart.axisXSize - 10),
        y1: this.yScale(0),
        x2: this.xScale(this.props.data[0].day) + LineChart.axisXSize + this.xScale.bandwidth() / 2,
        y2: this.yScale(this.props.data[0].maximum),
      },
    ];
    const linePointsMin = [
      {
        x1: this.xScale(this.props.data[0].day) + (LineChart.axisXSize - 10),
        y1: this.yScale(0),
        x2: this.xScale(this.props.data[0].day) + LineChart.axisXSize + this.xScale.bandwidth() / 2,
        y2: this.yScale(this.props.data[0].minimum),
      },
    ];
    const linePointsAvg = [
      {
        x1: this.xScale(this.props.data[0].day) + (LineChart.axisXSize - 10),
        y1: this.yScale(0),
        x2: this.xScale(this.props.data[0].day) + LineChart.axisXSize + this.xScale.bandwidth() / 2,
        y2: this.yScale(this.props.data[0].average),
      },
    ];

    for (let i = 0; i < this.props.data.length - 1; i++) {
      const { maximum, minimum, average, day } = this.props.data[i];
      linePointsMax.push({
        x1: this.xScale(day) + LineChart.axisXSize + this.xScale.bandwidth() / 2,
        y1: this.yScale(maximum),
        x2:
          this.xScale(this.props.data[i + 1].day) +
          LineChart.axisXSize +
          this.xScale.bandwidth() / 2,
        y2: this.yScale(this.props.data[i + 1].maximum),
      });
      linePointsMin.push({
        x1: this.xScale(day) + LineChart.axisXSize + this.xScale.bandwidth() / 2,
        y1: this.yScale(minimum),
        x2:
          this.xScale(this.props.data[i + 1].day) +
          LineChart.axisXSize +
          this.xScale.bandwidth() / 2,
        y2: this.yScale(this.props.data[i + 1].minimum),
      });
      linePointsAvg.push({
        x1: this.xScale(day) + LineChart.axisXSize + this.xScale.bandwidth() / 2,
        y1: this.yScale(average),
        x2:
          this.xScale(this.props.data[i + 1].day) +
          LineChart.axisXSize +
          this.xScale.bandwidth() / 2,
        y2: this.yScale(this.props.data[i + 1].average),
      });
    }

    return (
      <G>
        {linePointsMax.map(({ x1, x2, y1, y2 }) => (
          <Line
            color={this.props.color || 'rgb(115, 201, 144)'}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={'darkgray'}
            strokeWidth={'2px'}
          />
        ))}
        {linePointsMin.map(({ x1, x2, y1, y2 }) => (
          <Line
            color={this.props.color || 'rgb(115, 201, 144)'}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={'darkgray'}
            strokeWidth={'2px'}
          />
        ))}
        {linePointsAvg.map(({ x1, x2, y1, y2 }) => (
          <Line
            color={this.props.color || 'rgb(115, 201, 144)'}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={'darkgray'}
            strokeWidth={'2px'}
            strokeDasharray={'4'}
          />
        ))}
      </G>
    );
  }

  render() {
    this.createScales();
    return (
      <div
        style={{ textAlign: 'center', padding: '15px', width: '100%', height: 'calc(100% - 60px)' }}
      >
        <svg width={'100%'} height={'100%'}>
          <G x={0} y={5}>
            {this.createLines()}
            <LeftAxis scale={this.yScale} x={LineChart.axisYSize} />
            <BottomAxis
              scale={this.xScale}
              y={this.props.height - LineChart.axisXSize}
              x={LineChart.axisYSize}
            />
          </G>
        </svg>
      </div>
    );
  }
}

LineChart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  color: React.PropTypes.string,
  data: React.PropTypes.array,
  onMouseOver: React.PropTypes.func,
  onMouseOut: React.PropTypes.func,
};

export default LineChart;
