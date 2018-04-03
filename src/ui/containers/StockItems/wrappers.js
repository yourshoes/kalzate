/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import styled from 'styled-components';
// import Octicon from 'react-octicon';
import Button from 'ui/components/Button';
import { Grid, Row2, Column } from 'ui/components/Grid';

export const Container = styled.section`
  height: 100%;
  padding: ${(props) =>
    props.theme && props.theme.app.padding ? props.theme.app.padding : '0px'};
`;

export const StockTableHeader = styled.div`
  width: ${(props) => (props.content ? 'calc(100% - 5px)' : '100%')};
  height: 44px;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  background-color: ${(props) =>
    props.even ? 'rgba(163,168,174,0.2)' : 'rgba(163, 168, 174, 0.1)'};
  color: ${(props) => (props.even ? 'white' : 'rgba(187, 183, 183, 1)')};
`;
export const StockTableBody = styled.div`
  width: ${(props) => (props.content ? 'calc(100% - 5px)' : '100%')};
  /* width: 100%;*/
  height: calc(100% - 88px);
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
`;
const Section10 = styled.div`
  width: 12.5%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-right: 1px solid rgba(163, 168, 174, 0.1);
`;
const Section5 = styled.div`
  width: 6.25%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-right: 1px solid rgba(163, 168, 174, 0.1);
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

const FloatLabel = styled.div`
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
`;
const StockInput = SearchInput.extend`
  width: 100%;
  height: 100%;
  margin: 0;
  margin-left: 10px;
  padding-top: 10px;
  padding-right: 10px;
  &::-webkit-input-placeholder {
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
  &::-moz-placeholder {
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
  &:-ms-input-placeholder {
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
  &::placeholder {
    opacity: 1;
    -webkit-transition: all .2s;
    transition: all .2s;
  }
  &:placeholder-shown:not(:focus)::-webkit-input-placeholder {
    opacity: 0;
  }
  &:placeholder-shown:not(:focus)::-moz-placeholder {
    opacity: 0;
  }
  &:placeholder-shown:not(:focus):-ms-input-placeholder {
    opacity: 0;
  }
  &:placeholder-shown:not(:focus)::placeholder {
    opacity: 0;
  }
  &:placeholder-shown:not(:focus) + * {
    font-size: 1.7em;
    opacity: .5;
    top: .35em;
  }
  &:focus {
    outline: none;
    border-color: rgba(0, 0, 0, 0.5);
  }
`;
const StockLabel = styled.label`
  position: absolute;
  pointer-events: none; // makes the input ot get focus having the label on top of it
  left: 0;
  top: 0;
  cursor: text;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
  opacity: 1;
  -webkit-transition: all .2s;
  transition: all .2s;
  margin-left: 10px;
  font-size: 14px;
  user-select: none;
`;
export function StockField(props) {
  let inputElement;
  return (
    <Section10>
      <FloatLabel>
        <StockInput type="text" placeholder={props.placeholder} value={props.value} onChange={({ target }) => props.onChange(target.value)} />
        <StockLabel>
          {props.placeholder}
        </StockLabel>
      </FloatLabel>
    </Section10>
  );
}
const StyledButton = styled(Button) `
  width: 100%;
  height: 100%;
  border: none;
  margin: 0;
  &:hover {
    border: none
  }
`;
export function StockButton(props) {
  return (
    <Section5>
      <StyledButton {...props} />
    </Section5>
  );
}

export const Title = styled.p`
  font-size: 1.1em;
  margin-bottom: 0;
`;
export const Subtitle = styled.p`
  font-size: .9em;
  font-weight: 200;
  margin-top: 5px;
`;
const StockTableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;
export function StockTable(props) {
  return (
    <StockTableContainer>
      {props.items.map((item, i) =>
        <StockTableHeader even={(i + 1) % 2}>
          <StockField placeholder={item.reference || 'Reference'} />
          <StockField placeholder={item.brand || 'Brand'} />
          <StockField placeholder={item.gender || 'Gender'} />
          <StockField placeholder={item.colors.join() || 'Color'} />
          <StockField placeholder={item.size || 'Size'} />
          <StockField placeholder={item.price || 'Price'} />
          <StockField placeholder={item.amount || 'Amount'} />
          <StockButton primary icon="check" />
          <StockButton primary icon="remove-close" onClick={() => props.onRemove(item)} />
          <StockButton primary icon="link-external" />
        </StockTableHeader>
      )}
    </StockTableContainer>
  );
}

export const StockPaginationContainer = styled.div`
height: 44px;
background-color: ${(props) =>
    props.count % 2 === 0 ? 'rgba(163,168,174,0.2)' : 'rgba(163, 168, 174, 0.1)'};
width: ${(props) => (props.count ? 'calc(100% - 5px)' : '100%')};
display: table;
`;

const StockPaginationSection = styled.div`
height: 100%;
text-align: ${(props) =>
    props.right ? 'right' : 'left'};
display: table-cell;
vertical-align: middle;
`;

export const PageIteratorIcon = styled.span`
cursor: ${(props) => (props.enabled ? 'pointer' : 'default')};
z-index: 99;
color: ${(props) => (props.enabled ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.25)')};
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
`;
const DownloadIcon = styled.span`
cursor: pointer;
z-index: 99;
color: rgba(255, 255, 255, 0.35);
&:before {
  content: "\\F00B";
  font-family: 'octicons';
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
margin: 0 10px;
`;
const SyncIcon = styled.span`
cursor: pointer;
z-index: 99;
color: rgba(255, 255, 255, 0.35);
&:before {
  content: "\\F087";
  font-family: 'octicons';
  font-weight: normal;
  font-style: normal;
  font-size: 16px;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
margin: 0 5px;
`;

const PageIteratorContainer = styled.span`
margin: 0 10px;
`;
export function StockPagination({ total, limit, skip, refresh }) {
  const page = Math.floor(skip / limit);
  const lastPage = Math.ceil(total / limit) - 1;
  const enabledPrev = page > 0;
  const enabledNext = page < lastPage;
  return (<StockPaginationContainer>
    <StockPaginationSection >
      {/* <Octicon name={'sync'} onClick={() => refresh(limit, 0)} />*/}
      <DownloadIcon onClick={() => null} />
      <SyncIcon onClick={() => refresh(limit, 0)} />
    </StockPaginationSection>
    <StockPaginationSection right>
      <span>{skip + 1} ... {skip + limit} of {total}</span>
      <PageIteratorContainer>
        <PageIteratorIcon onClick={() => enabledPrev ? refresh(limit, skip - limit) : null} enabled={enabledPrev} />
        <PageIteratorIcon onClick={() => enabledNext ? refresh(limit, skip + limit) : null} enabled={enabledNext} next />
      </PageIteratorContainer>
    </StockPaginationSection>
  </StockPaginationContainer>);
}
