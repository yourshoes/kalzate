/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
// import Octicon from 'react-octicon';

export const StockPaginationSection = styled.div`
height: 100%;
text-align: ${(props) =>
    props.right ? 'right' : 'left'};
display: table-cell;
vertical-align: middle;
`;

export default StockPaginationSection;
