/**
 *
 * Button
 *
 */
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import StyledButton from './StyledButton';

const getColor = (props) => {
  if (props.primary) return ['rgb(115, 201, 144)', 'rgba(115, 201, 144, .2)'];
  if (props.secundary) {
    return ['rgba(100, 148, 237)', 'rgba(100, 148, 237, .2)'];
  }
  return ['rgb(226, 192, 141)', 'rgba(226, 192, 141, .2)'];
};

function Button(props) {
  return (
    <StyledButton color={getColor(props)} {...props}>
      {props.icon && <Octicon name={props.icon} />} {props.title}
    </StyledButton>
  );
}

Button.propTypes = {
  icon: PropTypes.string, // @todo PropTypes.string.isRequired
  title: PropTypes.string,
};

export default Button;
