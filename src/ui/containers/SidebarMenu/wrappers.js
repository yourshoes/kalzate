/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import styled from 'styled-components';
import Octicon from 'react-octicon';
import { Link } from 'react-router';

export const Container = styled.div`
  display: flex;
  background-color: ${(props) =>
    props.theme && props.theme.app.bgColor
      ? props.theme.app.bgColor
      : '#161719'};
  color: ${(props) =>
    props.theme && props.theme.app.color ? props.theme.app.color : ' #a3a8ae'};
  position: relative;
  box-sizing: border-box;
  height: initial;
  overflow: hidden;
  cursor: default;
  -webkit-user-select: none;
  user-select: none;
  min-width: 200px;
  width: 200px;
  max-width: 200px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0;
  margin: 0;
  border-right: ${(props) =>
    props.theme && props.theme.app.border
      ? props.theme.app.border
      : '1px solid #27292c'};
`;

export const MenuGroup = styled.ul`
  list-style: none;
  padding: 0;
`;

const Footer = styled.div`
  height: 70px;
  width: 100%;
  font-size: 1.5em;
  text-align: center;
  display: table;
  border-top: ${(props) =>
    props.theme && props.theme.app.border
      ? props.theme.app.border
      : '1px solid #27292c'};
`;
const EM = styled.em`
  font-size: 1em;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  letter-spacing: 0.12em;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  margin-left: 10px;
  font-style: normal;
`;
const FooterContent = styled(Link) `
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
  height: 100%;
  width: 100%;
  text-decoration:none;
  padding: 0;
  margin: 0;
  transition: color .5s ease-in-out;
  color: ${(props) =>
    props.theme && props.theme.sidebar.color
      ? props.theme.sidebar.color
      : 'rgba(163, 168, 174, 0.5)'};
  &:hover {
    color: ${(props) =>
    props.theme && props.theme.sidebar.hoverColor
      ? props.theme.sidebar.hoverColor
      : 'rgba(163, 168, 174, 0.8)'};
  }
`;
export function MenuFooter(props) {
  return (
    <Footer>
      <FooterContent to={props.to}>
        <Octicon name={props.icon} /> <EM>{props.title}</EM>
      </FooterContent>
    </Footer>
  );
}

MenuFooter.propTypes = {
  icon: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  to: React.PropTypes.string,
};

const SearchContainer = styled.div`
  color: rgba(163, 168, 174, 0.5);
  width: 100%;
  text-align: center;
  padding: 8px 0px;
`;
const SearchInput = styled.input`
  outline: none;
  font-size: 1.3em;
  margin-left: 14px;
  width: 100px;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;

  &::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: rgba(163, 168, 174, 0.9);
  }
  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: rgba(163, 168, 174, 0.9);
    opacity: 1;
  }
  &::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: rgba(163, 168, 174, 0.9);
    opacity: 1;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: rgba(163, 168, 174, 0.9);
  }
  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: rgba(163, 168, 174, 0.9);
  }
`;

export function Search(props) {
  return (
    <SearchContainer>
      <Octicon name="search" />
      <SearchInput type="text" placeholder="Search Tickets" />
    </SearchContainer>
  );
}


export function MenuSearch(props) {
  return (
    <Search />
  );
}

export const Menu = styled.div`
  border: 0;
  outline: 0;
  border-image: none;
  border-bottom: ${(props) =>
    props.theme && props.theme.app.border
      ? props.theme.app.border
      : '1px solid #27292c'};
  order: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: calc(100% - 70px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const cursor = (props) => `
transition: color .5s ease-in-out;
cursor:pointer;
 &:hover {
    color: ${props.theme && props.theme.sidebar.hoverColor
    ? props.theme.sidebar.hoverColor
    : 'rgba(163, 168, 174, 0.8)'};
  }`;

const route = `
  border-left: 5px solid #73c990;
  background-color: rgba(163, 168, 174, 0.1);
`;

const Item = styled.li`
  color: ${(props) =>
    props.theme && props.theme.sidebar.color
      ? props.theme.sidebar.color
      : 'rgba(163, 168, 174, 0.5)'};
  font-size: ${(props) => (props.small ? '1.1' : '1.5')}em;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  letter-spacing: 0.15em;
  font-weight: ${(props) => (props.highlight ? '100' : '100')};
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  ${(props) => (props.cursor ? cursor(props) : '')};
  border-left: 5px solid transparent;
  ${(props) => (props.actived ? route : '')};
`;
const P = styled.p`
  padding: 0 30px;
  margin: 4px;
  width: 190px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const actived = (props) => `
    color: ${props.theme && props.theme.sidebar.hoverColor
    ? props.theme.sidebar.hoverColor
    : 'rgba(163, 168, 174, 0.8)'};
`;
const notActived = (props) => `
    color: ${props.theme && props.theme.sidebar.color
    ? props.theme.sidebar.color
    : 'rgba(163, 168, 174, 0.5)'};
`;
const Route = styled(Link) `
  transition: color .5s ease-in-out;
  text-decoration:none;
  ${(props) => (props.actived ? actived(props) : notActived(props))};
  padding: 0;
  margin: 0;
  &:hover {
    color: ${(props) =>
    props.theme && props.theme.sidebar.hoverColor
      ? props.theme.sidebar.hoverColor
      : 'rgba(163, 168, 174, 0.8)'};
  }
`;
export function MenuItem(props) {
  return (
    <Item
      small={props.small}
      cursor={props.cursor}
      highlight={props.highlight}
      actived={props.actived}
    >
      {props.to
        ? <Route to={props.to} actived={props.actived}>
          <P>
            {props.title.toUpperCase()}
          </P>
        </Route>
        : <P>
          {props.title.toUpperCase()}
        </P>}
    </Item>
  );
}

MenuItem.propTypes = {
  title: React.PropTypes.string.isRequired,
  small: React.PropTypes.bool,
  highlight: React.PropTypes.bool,
  cursor: React.PropTypes.bool,
  actived: React.PropTypes.bool,
  to: React.PropTypes.string,
};
