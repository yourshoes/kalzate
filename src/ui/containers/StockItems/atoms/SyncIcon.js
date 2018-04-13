/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
// import Octicon from 'react-octicon';

export const SyncIcon = styled.span`
cursor: pointer;
z-index: 99;
color: rgba(255, 255, 255, 0.35);
&:before {
  content: "\\F087";
  font-family: 'octicons';
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
margin: 0 5px;
`;

export default SyncIcon;
