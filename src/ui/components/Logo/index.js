/**
*
* Logo
*
*/

import React from 'react';
import img from 'ui/assets/logo/zapatero.svg';
import styled from 'styled-components';
const Img = styled.img`
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

function Logo(props) {
  return (
    <div>
      <Img
        alt="Kalzate, a Serverless Point Of Sale App For Humans"
        src={img}
        width={props.width ? props.width : 400}
        height={props.height ? props.height : 200}
      />
    </div>
  );
}

Logo.propTypes = {
  width: React.PropTypes.string,
  height: React.PropTypes.string,
};

export default Logo;
