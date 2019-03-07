/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  border-bottom: 1px solid rgba(163, 168, 174, 0.1);
  padding: ${(props) =>
    props.theme && props.theme.app.padding ? props.theme.app.padding : '0px'};
`;

export default Container;
