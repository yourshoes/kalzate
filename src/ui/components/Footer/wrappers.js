/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  background-color: ${(props) =>
    props.theme && props.theme.app.bgColor
      ? props.theme.app.bgColor
      : '#161719'};
  color: ${(props) =>
    props.theme && props.theme.footer.color
      ? props.theme.footer.color
      : ' #a3a8ae'};
  height: 3.0em;
  border-top: ${(props) =>
    props.theme && props.theme.app.border
      ? props.theme.app.border
      : '1px solid #27292c'};
`;

export const StatusBar = styled.div`
  -webkit-user-select: none;
  cursor: default;
  overflow: hidden;
  white-space: nowrap;
  min-width: -webkit-min-content;
  display: flex;
  justify-content: space-between;
  padding: 0 0.75em;
  width: 100%;
  line-height: 3.0em;
`;

// StatusBarLeft is same as StatusBarRight, but it is intended
export const StatusBarLeft = styled.div``;

export const StatusBarRight = styled.div``;

export const StatusBarItem = styled.span`margin: auto 4px;`;
