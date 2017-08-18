/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import Octicon from 'react-octicon';
import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex: 1 1 auto;
`;

const TicketContainerSection = styled.section`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
`;
const TicketContainerItem = styled.div`
  height: 50%;
  width: 100%;
`;
const TicketCartContainerItem = TicketContainerItem.extend`
  border-bottom: 1px solid rgba(163, 168, 174, 0.1);
`;
const TicketCartContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
`;
const TicketStockEditorContainer = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
`;
const Section50 = styled.div`
  width: 50%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: table;
`;
const Section10 = styled.div`
  width: 12.5%;
  height: 100%;
  margin: 0;
  padding: 0;
  border-right: 1px solid rgba(163, 168, 174, 0.1);
  background-color: rgba(163, 168, 174, 0.1);
`;
const SectionLeft = styled.div`
  display: table-cell;
  vertical-align: middle;
`;
const SectionRight = styled.div`
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
`;
function StockField(props) {
  return (
    <FloatLabel>
      <StockInput type="text" placeholder={props.placeholder} />
      <StockLabel for="first">
        {props.placeholder}
      </StockLabel>
    </FloatLabel>
  );
}

function Search(props) {
  return (
    <SearchContainer>
      <Octicon name="search" />
      <SearchInput type="text" placeholder="Ticket ID" />
    </SearchContainer>
  );
}
const CheckoutContainer = styled.div`
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
`;
const CheckoutButton = styled.button`
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
  margin-right: 10px;
  border: 1px solid rgb(115, 201, 144);
  color: rgb(115, 201, 144);
`;
function Checkout(props) {
  return (
    <CheckoutButton>
      <Octicon name="check" /> Checkout
    </CheckoutButton>
  );
}
export function TicketContainer(props) {
  return (
    <TicketContainerSection>
      <TicketCartContainerItem>
        <TicketCartContainer>
          <Section50>
            <SectionLeft>
              <Search />
            </SectionLeft>
          </Section50>
          <Section50>
            <SectionRight>
              <Checkout />
            </SectionRight>
          </Section50>
        </TicketCartContainer>
      </TicketCartContainerItem>
      <TicketContainerItem>
        <TicketStockEditorContainer>
          <Section10>
            <StockField placeholder="Reference" />
          </Section10>
          <Section10>
            <StockField placeholder="Brand" />
          </Section10>
          <Section10>
            <StockField placeholder="Gender" />
          </Section10>
          <Section10>
            <StockField placeholder="Color" />
          </Section10>
          <Section10>
            <StockField placeholder="Size" />
          </Section10>
          <Section10>
            <StockField placeholder="Price" />
          </Section10>
          <Section10>
            <StockField placeholder="Amount" />
          </Section10>
          <Section10>
            <Octicon name="search" /> Search
            <Octicon name="save" /> Save
          </Section10>
        </TicketStockEditorContainer>
      </TicketContainerItem>
    </TicketContainerSection>
  );
}
