/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateplane = keyframes`
  0% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 100% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
    opacity: 0;
  }
`;

export const Spinner = styled.div`
  width: 35px;
  height: 30px;
  background-color: rgba(187, 183, 183, 0.5);
  border-radius: 100%;  
  animation: ${rotateplane} 1.0s infinite ease-in-out;
`;

export default () => (
  <Spinner />
);
