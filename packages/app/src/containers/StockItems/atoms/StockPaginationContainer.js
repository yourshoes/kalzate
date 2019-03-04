/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
// import Octicon from 'react-octicon';

export const StockPaginationContainer = styled.div`
height: 44px;
background-color: ${(props) =>
    props.count % 2 === 0 ? 'rgba(163,168,174,0.2)' : 'rgba(163, 168, 174, 0.1)'};
width: ${(props) => (props.count ? 'calc(100% - 5px)' : '100%')};
display: table;
`;

export default StockPaginationContainer;
