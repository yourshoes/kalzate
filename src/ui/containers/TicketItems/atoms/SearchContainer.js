/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const SearchContainer = styled.div`
color: ${(props) => props.theme && props.theme.tickets.searchColor
  ? props.theme.tickets.searchColor : 'rgba(163, 168, 174, 0.5)'};
margin-left: 10px;
`;

export default SearchContainer;
