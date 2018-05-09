/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const SearchInput = styled.input`
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

export default SearchInput;
