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
  background-color: #161719;
  color: #a3a8ae;
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
  border-right: 1px solid #27292c;
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
const FooterContent = styled(Link)`
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
  height: 100%;
  width: 100%;
  text-decoration:none;
  color: inherit;
  padding: 0;
  margin: 0;
  transition: color .5s ease-in-out;
  color: rgba(163, 168, 174, 0.5);
  &:hover {
    color: rgba(163, 168, 174, 0.8);
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

export const Menu = styled.div`
  border: 0;
  outline: 0;
  border-image: none;
  border-bottom: 1px solid #27292c;
  order: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: calc(100% - 70px);
  overflow-y: auto;
  overflow-x: hidden;
`;

const cursor = `
transition: color .5s ease-in-out;
cursor:pointer;
 &:hover {
    color: rgba(163, 168, 174, 0.8);
  }`;

const route = `
  border-left: 5px solid #73c990;
  background-color: rgba(163, 168, 174, 0.1);
`;

const Item = styled.li`
  color: rgba(163, 168, 174, 0.5);
  font-size: ${(props) => (props.small ? '1.1' : '1.5')}em;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  letter-spacing: 0.15em;
  font-weight: ${(props) => (props.highlight ? '100' : '100')};
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  ${(props) => (props.cursor ? cursor : '')};
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
const Route = styled(Link)`
  text-decoration:none;
  color: inherit;
  padding: 0;
  margin: 0;
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
        ? <Route to={props.to}>
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
