/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const TicketTableRowContainer = styled.div`
width: ${(props) => (props.content ? 'calc(100% - 5px)' : '100%')};
height: 44px;
display: flex;
flex: 0 1 auto;
flex-direction: row;
background-color: ${(props) =>
    props.even ? 'rgba(163,168,174,0.2)' : 'rgba(163, 168, 174, 0.1)'};
color: ${(props) => (props.even ? 'white' : 'rgba(187, 183, 183, 1)')};
`;
export default TicketTableRowContainer;
