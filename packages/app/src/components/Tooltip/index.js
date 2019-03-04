import React from 'react';
import Octicon from 'react-octicon';
import { Animate, Container, ToolTip } from './wrappers';

class Tip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  startReadingTip() {
    this.setState({ visible: true });
  }

  stopReadingTip() {
    this.setState({ visible: false });
  }

  remove() {
    // @todo is this fine? maybe we should re-render parent component to unmount child by publishing
    // PubSub.publish(PubSub.topics.HELPER_TOUR_TIP_REMOVED, null);
    this.tip.remove();
  }

  render() {
    return (
      <Container
        innerRef={(tip) => {
          this.tip = tip;
        }}
        onMouseEnter={(event) => this.startReadingTip(event)}
        onMouseLeave={(event) => this.stopReadingTip(event)}
        left={this.props.left}
        top={this.props.top}
        right={this.props.right}
        bottom={this.props.bottom}
        color={this.props.color}
        onClick={(event) => this.props.onClick ? this.props.onClick(event) : null}
      >
        {this.props.animated ? (<Animate>
          <Octicon name={this.props.icon || 'unverified'} />
        </Animate>) : <Octicon name={this.props.icon || 'unverified'} />}
        <ToolTip direction={this.props.direction} visible={this.state.visible}>
          {this.props.children}
        </ToolTip>
      </Container>
    );
  }
}

Tip.propTypes = {
  children: React.PropTypes.node,
  direction: React.PropTypes.string,
  left: React.PropTypes.string,
  top: React.PropTypes.string,
  right: React.PropTypes.string,
  bottom: React.PropTypes.string,
  icon: React.PropTypes.string,
  animated: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  color: React.PropTypes.string,
};

export default Tip;
