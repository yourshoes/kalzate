/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
// import Octicon from 'react-octicon';

export const MatchesListContainer = styled.div`
  position: absolute;
  margin-top: -155px;
  background-color: rgba(100, 100, 100, 0.6);
  color: white;
  padding: 0;
`;

export const MatchesList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export const MatchesListItem = styled.li`
  width: 100%;
  padding: 5px 10px;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: ${({ selected }) => (selected ? '400' : '100')};
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
  font-size: 1.3em;
  color: ${({ selected }) => (selected ? '#73c990' : 'inherit')};
  background-color: ${({ selected }) =>
    selected ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
`;

export default MatchesListContainer;
