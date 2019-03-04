/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
// import Octicon from 'react-octicon';

export const Container = styled.section`
  height: 100%;
  padding: ${(props) =>
    props.theme && props.theme.app.padding ? props.theme.app.padding : '0px'};
`;

export default Container;
