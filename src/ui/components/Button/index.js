/**
*
* Button
*
*/
import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import StyledButton from './StyledButton';

function Button(props) {
  return (
    <StyledButton primary={props.primary}>
      <Octicon name={props.icon} /> {props.title}
    </StyledButton>
  );
}

Button.propTypes = {
  primary: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button;
