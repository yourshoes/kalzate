/**
*
* NotFound
*
*/

import React, { PropTypes } from 'react';
import Octicon from 'react-octicon';
import styled from 'styled-components';

const Div = styled.div`
  font-size: 1.6em;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
  color: rgba(187, 183, 183, 0.8);
`;
const Icon = styled(Octicon)`
  font-size: 3em;
  display: block;
  margin-bottom: 20px;
  color: rgba(187, 183, 183, 0.5);
`;

function NotFound(props) {
  return (
    <Div>
      {props.icon && <Icon name={props.icon} />}
      {props.children}
    </Div>
  );
}

NotFound.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default NotFound;
