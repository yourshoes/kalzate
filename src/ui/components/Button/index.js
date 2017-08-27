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
    <StyledButton {...props}>
      <Octicon name={props.icon} /> {props.title}
    </StyledButton>
  );
}

Button.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Button;
