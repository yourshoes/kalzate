/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const Amount = styled.p`
margin: 0;
padding: 0;
display: table-cell;
vertical-align: middle;
font-size: 5em;
text-align: center;
font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
  Cantarell, Arial, sans-serif;
font-weight: 400;
-webkit-font-smoothing: antialiased;
font-variant: all-petite-caps;
font-style: normal;

&::selection {
  color: rgba(163, 168, 174, 0.6);
  background-color: rgba(163, 168, 174, 0.1);
}
`;

export default Amount;
