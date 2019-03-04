/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';
// import Octicon from 'react-octicon';

export const DownloadIcon = styled.span`
  cursor: pointer;
  z-index: 99;
  color: rgba(255, 255, 255, 0.35);
  &:before {
    content: '\\F00B';
    font-family: 'octicons';
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
  }
  margin: 0 10px;
  transition: all 0.5s ease-in-out;
  &:hover {
    color: rgba(255, 255, 255, 0.55);
  }
`;

export const SyncIcon = styled.span`
  cursor: pointer;
  z-index: 99;
  color: rgba(255, 255, 255, 0.35);
  &:before {
    content: '\\F087';
    font-family: 'octicons';
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
  }
  margin: 0 5px;
  transition: all 0.5s ease-in-out;
  &:hover {
    color: rgba(255, 255, 255, 0.55);
  }
`;

export const PageIteratorIcon = styled.span`
  cursor: ${(props) => (props.enabled ? 'pointer' : 'default')};
  z-index: 99;
  color: ${(props) =>
    props.enabled ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.25)'};
  &:before {
    content: ${(props) => (props.next ? '"\\F078"' : '"\\F0A4"')};
    font-family: 'octicons';
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
  }
  margin: 0 5px;
  transition: all 0.5s ease-in-out;
  &:hover {
    color: ${(props) =>
      props.enabled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.25)'};
  }
`;
