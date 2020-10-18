import React from 'react';

import styled from 'styled-components';

/* eslint-disable-next-line */
export interface DbProps {}

const StyledDb = styled.div`
  color: pink;
`;

export const Db = (props: DbProps) => {
  return (
    <StyledDb>
      <h1>Welcome to db!</h1>
    </StyledDb>
  );
};

export default Db;
