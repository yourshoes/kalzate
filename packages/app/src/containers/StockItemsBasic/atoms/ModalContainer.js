/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
// import Octicon from 'react-octicon';

export const ModalContainer = styled.section`
  width: 600px;
  color: rgba(163, 168, 174, 0.6);
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-size: 1.5em;
  font-style: normal;
  font-weight: 300;
`;

export const DottedContainer = styled.div`
  width: 550px;
  margin: auto;
  border: 2px dotted rgba(163, 168, 174, 0.6);
  height: 250px;
  letter-spacing: 0.15em;
  text-align: center;
  font-size: 1.7em;
  display: table;
  cursor: pointer;
`;

export const OptionsContainer = styled.div`
  width: 550px;
  margin: 10px auto;
`;

export default ModalContainer;
