/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

const bgColor = (props) => props.even ? props.theme.tables.bgColorEven : props.theme.tables.bgColor;

export const TicketTableRowContainer = styled.div`
// width: ${(props) => (props.content ? 'calc(100% - 5px)' : '100%')};
width: '100%';
height: 44px;
display: flex;
flex: 0 1 auto;
flex-direction: row;
background-color: ${(props) =>
        props.highlight ? props.theme.tables.highlightBgColor : bgColor(props)};
color: ${(props) => (props.even ? props.theme.tables.colorEven : props.theme.tables.color)};
`;
export default TicketTableRowContainer;
