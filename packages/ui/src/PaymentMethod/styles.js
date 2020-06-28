
import styled from 'styled-components';

export const Container = styled.div`
    position:relative;  
    display: ${(props) => (props.visible ? 'flex' : 'none')};
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
  &::placeholder {
    /* WebKit, Blink, Edge */
    color: rgba(163, 168, 174, 0.9);
    opacity: 1;
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
  pointer-events: ${(props) => (props.readonly ? 'none' : 'auto')};

  &:placeholder {
    opacity: 1;
    transition: all 0.2s;
  }

  &:placeholder-shown:not(:focus)::placeholder {
    opacity: 0;
  }

  &:placeholder-shown:not(:focus) + * {
    opacity: 1;
    margin-left: 55px;
    top: 8px;
    font-size: 1.8em;
    font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
      Cantarell, Arial, sans-serif;
    font-weight: 100;
    -webkit-font-smoothing: antialiased;
    font-variant: all-petite-caps;
    font-style: normal;
    color: ${(props) => (props.disabled ? 'rgba(163, 168, 174, 0.6)' : 'rgb(100, 148, 237)')};
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

  &:disabled {
      color: rgba(163, 168, 174, 0.6);
  }

  &:disabled ~ * {
      color: rgba(163, 168, 174, 0.6);
  }
`;


export const Label = styled.label`
  position: absolute;
  pointer-events: none; // makes the input ot get focus having the label on top of it
  left: -10px;
  top: 35px;
  color: rgb(115, 201, 144);
  order: 3;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
  opacity: ${(props) => (props.readonly ? '.5' : '1')};
  transition: all 0.2s;
  margin-left: 10px;
  font-size: ${(props) => (props.readonly ? '1.7em' : '14px')};
  user-select: none;
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

