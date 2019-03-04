/**
*
* A
*
*/

import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styled, { css } from 'styled-components';

const pickColor = (style) => {
  const defaultValue = '#a3a8ae';
  if (!style) return defaultValue;
  if (style.primary) return '#6494ed';
  if (style.secondary) return '#73c990';
  return defaultValue;
};
const linkStyles = css`
  text-decoration: none;
  color: ${(props) => pickColor(props.style)};
  font-style: normal;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  /* Octicon case */
  .octicon {
    margin: 0;
  }
  .octicon ~span {
    margin: auto 4px;
  }
`;

const RouteLink = styled(Link)`${linkStyles}`;
const ALink = styled.a`${linkStyles};`;

function A(props) {
  if (props.to) {
    return (
      <RouteLink {...props}>
        {props.children}
      </RouteLink>
    );
  }

  return (
    <ALink {...props}>
      {props.children}
    </ALink>
  );
}

A.propTypes = {
  to: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default A;
