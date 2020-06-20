
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  & > span {
    align-self: flex-end;
  }
`;

export const BaseInput = styled.input`
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
export const Input = BaseInput.extend`
  width: 100%;
  height: 100%;
  margin: 0;
  margin-left: 10px;
  padding-right: 10px;
  font-size: 2rem;
  color: rgb(115, 201, 144);
  order: 2;
  &::-webkit-input-placeholder {
    opacity: 1;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  &::-moz-placeholder {
    opacity: 1;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  &:-ms-input-placeholder {
    opacity: 1;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  &::placeholder {
    opacity: 1;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
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
    opacity: 1;
    left: 80px;
    top: 65px;
    font-size: 1em;
    color: rgb(100, 148, 237);
  }
  &:placeholder-shown:focus ~ * {
    color: rgb(115, 201, 144);
  }
  &:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.5);
  }
  &:not(:placeholder-shown) ~ * {
    color: rgb(115, 201, 144);
  }
`;


export const Label = styled.label`
  position: absolute;
  pointer-events: none; // makes the input ot get focus having the label on top of it
  left: 35px;
  top: 90px;
  color: rgb(115, 201, 144);
  order: 3;
  cursor: text;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
  opacity: ${(props) => (props.readonly ? '.5' : '1')};
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  margin-left: 10px;
  font-size: ${(props) => (props.readonly ? '1.7em' : '14px')};
  user-select: none;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

