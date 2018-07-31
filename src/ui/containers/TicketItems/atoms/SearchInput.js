/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const SearchInput = styled.input`
  outline: none;
  font-size: 1.2em;
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
    color: ${(props) => props.theme && props.theme.tickets.placeholderColor
      ? props.theme.tickets.placeholderColor : 'rgba(163, 168, 174, 0.3)'};
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: ${(props) => props.theme && props.theme.tickets.placeholderColor
      ? props.theme.tickets.placeholderColor : 'rgba(163, 168, 174, 0.3)'};
    opacity: 1;
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: ${(props) => props.theme && props.theme.tickets.placeholderColor
      ? props.theme.tickets.placeholderColor : 'rgba(163, 168, 174, 0.3)'};
    opacity: 1;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${(props) => props.theme && props.theme.tickets.placeholderColor
      ? props.theme.tickets.placeholderColor : 'rgba(163, 168, 174, 0.3)'};
  }
  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${(props) => props.theme && props.theme.tickets.placeholderColor
      ? props.theme.tickets.placeholderColor : 'rgba(163, 168, 174, 0.3)'};
  }
`;

export default SearchInput;
