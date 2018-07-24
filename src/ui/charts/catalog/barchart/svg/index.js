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
import Tooltip from './atoms/Tooltip';
import { G } from './atoms/Axis';

export class BarChart extends React.Component {

  static axisXSize = 30;
  static axisYSize = 30;

  // state = {
  //   tooltipLeftPosition: 0,
  //   tooltipTopPosition: 0,
  //   tooltipText: '',
  //   tooltipVisible: false,
  // }

  shouldComponentUpdate({ width, height, data }) {
    return this.props.width !== width || this.props.height !== height || this.props.data.length !== data.length;
  }

  createScales() {
    this.yScale = scaleLinear()
      .rangeRound([this.props.height - BarChart.axisXSize, 0])
      .domain([0, max(this.props.data.map(({ amount }) => amount))]);
    this.xScale = scaleBand()
      .rangeRound([0, this.props.width])
      .padding(0.1)
      .domain(this.props.data.map(({ day }) => day));
  }

  createBarChart() {
    return this.props.data.map(({ amount, day }, i) =>
      <Rect
        key={i}
        fill={this.props.color || 'rgb(115, 201, 144)'}
        x={this.xScale(day) + BarChart.axisYSize}
        y={this.yScale(amount)}
        height={this.props.height - BarChart.axisXSize - this.yScale(amount)}
        width={this.xScale.bandwidth()}
        onMouseOver={() => this.props.onMouseOver ? this.props.onMouseOver({ amount, day }) : null}
        onMouseOut={() => this.props.onMouseOut ? this.props.onMouseOut() : null}
      />);
    // onMouseOver={({ pageX, pageY }) => this.setState({
    //   tooltipVisible: true,
    //   tooltipText: `${amount} (${day})`,
    //   tooltipLeftPosition: pageX,
    //   tooltipTopPosition: pageY,
    // })}
    // onFocus={() => null}
    // onBlur={() => null}
    // onMouseOut={() => this.setState({
    //   tooltipVisible: false,
    // })}
  }

  render() {
    this.createScales();
    return (
      <div style={{ textAlign: 'center', padding: '15px', width: '100%', height: 'calc(100% - 60px)' }}>
        {/* <Tooltip
          visible={this.state.tooltipVisible}
          left={this.state.tooltipLeftPosition}
          right={this.state.tooltipTopPosition}
        >
          {this.state.tooltipText}
        </Tooltip>*/}
        <svg width={'100%'} height={'100%'}>
          <G x={0} y={5}>
            {this.createBarChart()}
            <LeftAxis scale={this.yScale} x={BarChart.axisYSize} />
            <BottomAxis scale={this.xScale} y={this.props.height - BarChart.axisXSize} x={BarChart.axisYSize} />
          </G>
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
  onMouseOver: React.PropTypes.function,
  onMouseOut: React.PropTypes.function,
};


export default BarChart;

