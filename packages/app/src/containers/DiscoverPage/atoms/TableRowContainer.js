/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const TableRowContainer = styled.div`
width: 100%;
height: 44px;
display: flex;
flex: 0 1 auto;
flex-direction: row;
background-color: ${(props) =>
        props.even ? props.theme.tables.bgColorEven : props.theme.tables.bgColor};
color: ${(props) => (props.even ? props.theme.tables.colorEven : props.theme.tables.color)};
`;
export default TableRowContainer;
