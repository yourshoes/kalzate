/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import Octicon from 'react-octicon';
import styled from 'styled-components';
import { remote } from 'electron';

export const Section = styled.section`
  min-height: 100%;
  height: 100%;
  min-width: 100%;
  width: 100%;
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

  *::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }

  *::-webkit-scrollbar-track {
      box-shadow: ${(props) => props.theme && props.theme.app.scrollTrackShadow ? props.theme.app.scrollTrackShadow : 'inset 0 0 6px rgba(0, 0, 0, 0.3)'};
  }

  *::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme && props.theme.app.scrollThumbBgColor ? props.theme.app.scrollThumbBgColor : 'rgba(100, 100, 100, 0.8)'};
  }

  *::-webkit-scrollbar-corner,
  *::-webkit-scrollbar-thumb:window-inactive {
      background: ${(props) => props.theme && props.theme.app.scrollThumbInactiveBgColor ? props.theme.app.scrollThumbInactiveBgColor : 'rgba(100, 100, 100, 0.4)'};
  }
`;

export const Article = styled.article`
  display: flex;
  flex: 1;
  min-width: 0;
  position: relative;
`;

const ToolbarContainer = styled.article`
-webkit-app-region: drag;
  background-color: ${(props) =>
    props.theme && props.theme.app.bgColor
      ? props.theme.app.bgColor
      : '#161719'};
  color: ${(props) =>
    props.theme && props.theme.app.color ? props.theme.app.color : ' #a3a8ae'};
  font-size: 15px;
  width: 100%;
  height: 35px;
  border-bottom: ${(props) =>
    props.theme && props.theme.app.border
      ? props.theme.app.border
      : '1px solid #27292c'};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const ToolbarIconContainer = styled.span`
-webkit-app-region: no-drag;
  height: 35px;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -ms-flex-align: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
  &:hover {
    background-color: ${(props) =>
    props.theme && props.theme.app.color ? props.theme.app.color : 'rgba(187, 183, 183, 0.6)'};
    color:  ${(props) =>
    props.theme && props.theme.app.bgColor ? props.theme.app.bgColor : 'transparent'};
  }
`;

const ToolbarIcon = styled.span`
-webkit-app-region: no-drag;
  padding: 0 10px;
  cursor: pointer;
`;

export const Toolbar = () => (
  <ToolbarContainer>
    <ToolbarIconContainer>
      <ToolbarIcon
        onClick={() => remote.getCurrentWindow().minimize()}
      ><Octicon name="dash" /></ToolbarIcon>
    </ToolbarIconContainer>
    <ToolbarIconContainer>
      <ToolbarIcon
        onClick={() => remote.getCurrentWindow().isMaximized() ? remote.getCurrentWindow().unmaximize() : remote.getCurrentWindow().maximize()}
      ><Octicon name="primitive-square" /></ToolbarIcon>
    </ToolbarIconContainer>
    <ToolbarIconContainer>
      <ToolbarIcon
        onClick={() => remote.getCurrentWindow().close()}
      ><Octicon name="x" /></ToolbarIcon>
    </ToolbarIconContainer>
  </ToolbarContainer>);

