/**
*
* Grid
*
*/

// import React from 'react';
import styled from 'styled-components';

export const Grid = styled.section`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;

export const Row2 = styled.section`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  min-width: 100%;
  ${(props) => (props.flat ? 'height: auto' : 'height: calc(50vh - 16px)')};
  ${(props) => (props.flat ? 'max-height: auto' : 'max-height: calc(50vh - 16px)')};
  ${(props) => (props.flat ? 'min-height: auto' : 'min-height: calc(50vh - 16px)')};
`;

const width = (w) => `width: ${w}; min-width: ${w}; max-width: ${w};`;
export const Column = styled.section`
  width: 100%;
  ${(props) => (props.w ? width(props.w) : '')};
`;

export const Column2 = styled.section`
  width: 50%;
  max-width: 50%;
  min-width: 50%;
`;

export const Column3 = styled.section`
  width: 33.33%;
  max-width: 33.33%;
  min-width: 33.33%;
`;

export const Column4 = styled.section`
  width: 25%;
  max-width: 25%;
  min-width: 25%;
`;
