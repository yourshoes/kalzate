/**
 *
 * App Wrappers
 */

/* System imports */
import React, { PropTypes } from 'react';
import SearchInput from '../atoms/SearchInput';

export class InteractiveField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value || '' };
  }
  // @todo replace componentWillReceiveProps by getDerivedStateFromProps
  // from React 17
  componentWillReceiveProps(props) {
    this.setState({ value: props.value });
  }

  stopPropagation(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }

  render() {
    return (
      !this.props.readonly && (
        <SearchInput
          type="text"
          placeholder={this.props.placeholder}
          onChange={({ target }) =>
            this.setState({ value: target.value }, () => this.props.onChange(target.value))
          }
          onKeyDown={(event) => {
            const { target, key } = event;
            switch (key) {
              case 'Enter':
                this.props.onEnter && this.props.onEnter(target.value);
                return this.stopPropagation(event);
              case 'ArrowUp':
                this.props.onMoveUp && this.props.onMoveUp(target.value);
                return this.stopPropagation(event);
              case 'ArrowDown':
                this.props.onMoveDown && this.props.onMoveDown(target.value);
                return this.stopPropagation(event);
              case 'Escape':
                this.props.onEscape && this.props.onEscape(target.value);
                return this.stopPropagation(event);
              default:
            }
            return true;
          }}
          value={this.state.value}
        />
      )
    );
  }
}

InteractiveField.propTypes = {
  placeholder: PropTypes.any, // @todo move to string
  onChange: PropTypes.func,
};

export default InteractiveField;
