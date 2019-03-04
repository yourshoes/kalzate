/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const HelpContainer = styled.span`
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  color: rgba(151, 151, 151, .8);
  &:hover {
    color: rgba(151, 151, 151, 1);
    ;
  }
  &:hover > div {
    display: block;
  }
`;
export default HelpContainer;
