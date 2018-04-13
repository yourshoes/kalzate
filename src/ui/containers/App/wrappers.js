/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const Section = styled.section`
  min-height: 100%;
  height: 100%;
  min-width: 100%;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${(props) =>
    props.theme && props.theme.app.bgColor
      ? props.theme.app.bgColor
      : '#161719'};
  color: ${(props) =>
    props.theme && props.theme.app.color ? props.theme.app.color : ' #a3a8ae'};
  font-size: 11px;
  filter: ${(props) => (props.blur ? 'blur(3px)' : 'none')};
`;

export const Article = styled.article`
  display: flex;
  flex: 1;
  min-width: 0;
  position: relative;
`;
