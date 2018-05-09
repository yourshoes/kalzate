/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const TicketLabel = styled.label`
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
-webkit-transition: all 0.2s;
transition: all 0.2s;
margin-left: 10px;
font-size: 14px;
user-select: none;
`;

export default TicketLabel;
