/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
/* System imports */
import React from 'react';

export const Panel = styled.section`
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  background-color: ${(props) =>
    props.theme && props.theme.settings.panelBgColor
      ? props.theme.settings.panelBgColor
      : 'rgba(10, 10, 10, 0.2)'};
  margin: 15px;
`;
export const FormWrapper = styled.section`
  height: calc(100% - 60px);
  display: grid;
`;

export const Title = styled.h2`
color: ${(props) =>
    props.theme && props.theme.sidebar.color
      ? props.theme.sidebar.color
      : 'rgba(163, 168, 174, 0.5)'};
font-size: ${(props) => (props.small ? '1.1' : '1.8')}em;
font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
  Cantarell, Arial, sans-serif;
letter-spacing: 0.15em;
font-weight: ${(props) => (props.highlight ? '100' : '100')};
-webkit-font-smoothing: antialiased;
font-variant: all-petite-caps;
text-align: center;
padding: 15px;
margin: 0;
`;

/**
 *
 * App Wrappers
 */


export const Container = styled.section`
  height: 100%;
  padding: ${(props) =>
    props.theme && props.theme.app.padding ? props.theme.app.padding : '0px'};
`;

export const StockTableHeader = styled.div`
  width: ${(props) => (props.content ? 'calc(100% - 5px)' : '100%')};
  height: 44px;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  background-color: ${(props) =>
    props.even ? 'rgba(163,168,174,0.2)' : 'rgba(163, 168, 174, 0.1)'};
  color: ${(props) => (props.even ? 'white' : 'rgba(187, 183, 183, 1)')};
`;
export const StockTableBody = styled.div`
  width: 100%;
  height: calc(100% - 44px);
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
`;
const Section10 = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid rgba(163, 168, 174, 0.1);
  border-bottom: none;
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
const Textarea = styled.textarea`
width: 100%;
height: calc(100% - 20px);
margin: 0;
margin-left: 10px;
margin-top: 20px;
padding-right: 10px;
font-size: 1.4em;
resize: none;
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

const StockInput = SearchInput.extend`
  width: 100%;
  height: 100%;
  margin: 0;
  margin-left: 10px;
  padding-top: 10px;
  padding-right: 20px;
  font-size: 2em;
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
  pointer-events: none; // makes the input ot get focus having the label on top of it
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
export class TextField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  render() {
    return (
      <Section10>
        <FloatLabel>
          <StockInput placeholder={this.props.placeholder} onChange={({ target }) => this.setState({ value: target.value })} value={this.state.value} onBlur={(event) => this.props.onBlur ? this.props.onBlur(event.target.value) : null} />
          <StockLabel>
            {this.props.placeholder}
          </StockLabel>
        </FloatLabel>
      </Section10>
    );
  }
}
export class AreaField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: props.value ? props.value.trim() : props.noValue };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value || props.noValue });
  }

  render() {
    return (<Section10>
      <FloatLabel>
        <Textarea type="text" placeholder={this.props.placeholder} onChange={({ target }) => this.setState({ value: target.value || this.props.noValue })} value={this.state.value} onBlur={(event) => this.props.onBlur ? this.props.onBlur(event.target.value) : null} />
        <StockLabel>
          {this.props.placeholder}
        </StockLabel>
      </FloatLabel>
    </Section10>
    );
  }
}
