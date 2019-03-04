/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
import Button from 'components/Button';

export const TicketButton = styled(Button) `
width: 100%;
height: 100%;
border: none;
margin: 0;
&:hover {
  border: none;
}
`;

export default TicketButton;
