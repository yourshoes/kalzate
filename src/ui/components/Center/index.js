/**
*
* Center
*
*/

import React, { PropTypes } from 'react';
import styled from 'styled-components';

const CenterDiv = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: table;
`;
const CenterDivContent = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

export function Center(props) {
  return (
    <CenterDiv>
      <CenterDivContent>
        {props.children}
      </CenterDivContent>
    </CenterDiv>
  );
}

Center.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Center;
