/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import styled from 'styled-components';
// import Octicon from 'react-octicon';

export const InnerContainer = styled.div`
  padding: 10px;
  position: relative;
  top: 5px;
  display: inline-block;
`;

export const SwitchLabel = styled.label`
  align-items: center;
  display: flex;
`;

export const SwitchInput = styled.input`
  display: none;
  &:checked + div {
    background-color: rgba(163, 168, 174, 0.5);
    box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.21);
  }
  &:checked + div::before {
    transform: scale(0);
  }
  &:checked + div::after {
    left: 22px;
  }
`;

export const SwitchCheckbox = styled.div`
  background-color: rgba(163, 168, 174, 0.3);
  border-radius: 22px;
  cursor: pointer;
  height: 22px;
  position: relative;
  transition: all 300ms ease;
  width: 45px;

  &::before {
    content: '';
    bottom: 0;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 300ms ease;
    background-color: rgba(163, 168, 174, 0.2);
    box-shadow: none;
    border-radius: inherit;
    right: 0;
    transform: scale(0);
    margin: 2px;
  }

  &::after {
    content: '';
    bottom: 0;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 300ms ease;
    background-color: rgba(163, 168, 174, 0.3);
    border: 0 solid #dedede;
    border-radius: 22px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
    height: 22px;
    margin-bottom: auto;
    margin-top: auto;
    position: absolute;
    margin: auto 0;
    width: 22px;
  }
`;

export const Checkbox = ({ type }) => (
  <InnerContainer>
    <SwitchLabel>
      <SwitchInput type={type} />
      <SwitchCheckbox />
    </SwitchLabel>
  </InnerContainer>
);

export default Checkbox;
