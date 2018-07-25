/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const HelpTooltip = styled.div`
  display: none;
  transition: all 0.5s ease-in-out;
  font-size: 0.7em;
  padding: 15px;
  border-radius: 5px;
  background-color: rgba(51,51,51, .9);
  position: absolute;
  color: rgba(151,151,151,1);
  max-width: 230px;
  z-index: 10001;
  text-align: left;
`;
export default HelpTooltip;
