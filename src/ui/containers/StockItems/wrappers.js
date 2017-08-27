/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import Octicon from 'react-octicon';
import styled from 'styled-components';
import Button from 'ui/components/Button';

export const Container = styled.section`
  height: 100%;
  padding: ${(props) =>
    props.theme && props.theme.app.padding ? props.theme.app.padding : '0px'};
`;

export const StockTableHeader = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
`;
export const StockTableBody = styled.div`
  width: 100%;
  height: calc(100% - 44px);
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
`;
const Section10 = styled.div`
  width: 12.5%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-right: 1px solid rgba(163, 168, 174, 0.1);
  background-color: rgba(163, 168, 174, 0.1);
`;
const Section5 = styled.div`
  width: 6.25%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-right: 1px solid rgba(163, 168, 174, 0.1);
  background-color: rgba(163, 168, 174, 0.1);
`;
const SearchInput = styled.input`
  outline: none;
  font-size: 1.3em;
  margin-left: 5px;
  width: 150px;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;

  &::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: rgba(163, 168, 174, 0.9);
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgba(163, 168, 174, 0.9);
    opacity: 1;
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgba(163, 168, 174, 0.9);
    opacity: 1;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(163, 168, 174, 0.9);
  }
  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: rgba(163, 168, 174, 0.9);
  }
`;

const FloatLabel = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
`;
const StockInput = SearchInput.extend`
  width: 100%;
  height: 100%;
  margin: 0;
  margin-left: 10px;
  padding-top: 10px;
  padding-right: 10px;
  &::-webkit-input-placeholder {
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
  &::-moz-placeholder {
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
  &:-ms-input-placeholder {
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
  &::placeholder {
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
  &:placeholder-shown:not(:focus)::-webkit-input-placeholder {
    opacity: 0;
  }
  &:placeholder-shown:not(:focus)::-moz-placeholder {
    opacity: 0;
  }
  &:placeholder-shown:not(:focus):-ms-input-placeholder {
    opacity: 0;
  }
  &:placeholder-shown:not(:focus)::placeholder {
    opacity: 0;
  }
  &:placeholder-shown:not(:focus) + * {
    font-size: 1.7em;
    opacity: .5;
    top: .35em;
  }
  &:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.5);
  }
`;
const StockLabel = styled.label`
  position: absolute;
  left: 0;
  top: 0;
  cursor: text;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
  opacity: 1;
  -webkit-transition: all .2s;
  transition: all .2s;
  margin-left: 10px;
  font-size: 14px;
  user-select: none;
`;
export function StockField(props) {
  let inputElement;
  return (
    <Section10>
      <FloatLabel>
        <StockInput
          innerRef={(input) => (inputElement = input)}
          type="text"
          placeholder={props.placeholder}
        />
        <StockLabel onClick={() => inputElement.focus()}>
          {props.placeholder}
        </StockLabel>
      </FloatLabel>
    </Section10>
  );
}
const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  &:hover {
    border: none
  }
`;
export function StockButton(props) {
  return (
    <Section5>
      <StyledButton {...props} />
    </Section5>
  );
}

export const Title = styled.p`
  font-size: 1.1em;
  margin-bottom: 0;
`;
export const Subtitle = styled.p`
  font-size: .9em;
  font-weight: 200;
  margin-top: 5px;
`;
