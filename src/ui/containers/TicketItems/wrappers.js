/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import Octicon from 'react-octicon';
import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  border-bottom: 1px solid rgba(163, 168, 174, 0.1);
  padding: ${(props) =>
    props.theme && props.theme.app.padding ? props.theme.app.padding : '0px'};
`;
export const TicketCartContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
`;
export const TicketCartSummaryContainer = styled.div`
  width: 100%;
  height: calc(100% - 88px);
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
`;

export const Section50 = styled.div`
  width: 50%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: table;
`;

export const SectionLeft = styled.div`
  display: table-cell;
  vertical-align: middle;
`;
export const SectionRight = styled.div`
  display: table-cell;
  text-align: right;
  vertical-align: middle;
`;
const SearchContainer = styled.div`
  color: rgba(163, 168, 174, 0.5);
  margin-left: 10px;
`;
const SearchInput = styled.input`
  outline: none;
  font-size: 1.3em;
  margin-left: 5px;
  width: 150px;
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
      <SearchInput type="text" placeholder="Ticket ID" />
    </SearchContainer>
  );
}
