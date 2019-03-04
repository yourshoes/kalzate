/**
 *
 * Button
 *
 */

import styled, { keyframes } from 'styled-components';

const rippleAnimation = keyframes`
  0% {
    transform: scale(0, 0);
    opacity: 1;
  }
  20% {
    transform: scale(20, 20);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(40, 40);
  }
`;

const inactiveButton = (props) => props.disabled ? '' :
  ` 
`;

const Button = styled.button`
  outline: none;
  pointer-events: ${(props) => (props.inactive ? 'none' : 'auto')};
  margin-left: 5px;
  height: 35px;
  width: 115px;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-size: 1.3em;
  font-style: normal;
  font-weight: 400;
  border: 1px solid rgba(163, 168, 174, 0.6);
  color: rgba(163, 168, 174, 0.6);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  position: relative;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5px;
    height: 5px;
    opacity: 0;
    border-radius: 100%;
    background-color: ${(props) => props.color[1]};
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  &:hover {
    border: 1px solid ${(props) => props.color[0]};
    color: ${(props) => props.color[0]};
  }
  &:focus:not(:active)::after {
    animation: ${rippleAnimation} 1s ease-out;
  }
`;

export default Button;
