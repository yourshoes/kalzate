/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import Octicon from 'react-octicon';
import styled from 'styled-components';
import Button2 from 'components/Button';

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
  padding: ${(props) =>
    props.theme && props.theme.app.padding ? props.theme.app.padding : '0px'};
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
const TicketCartSummaryContainer = styled.div`
  width: 100%;
  height: calc(100% - 88px);
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
const TicketStockItemsContainer = styled.div`
  width: 100%;
  height: calc(100% - 44px);
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
const Section30 = styled.div`
  width: 37.5%;
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
  user-select: none;
`;
function StockField(props) {
  let inputElement;
  return (
    <FloatLabel>
      <StockInput
        innerRef={(input) => (inputElement = input)}
        type="text"
        placeholder={props.placeholder}
      />
      <StockLabel onClick={() => inputElement.focus()} for="first">
        {props.placeholder}
      </StockLabel>
    </FloatLabel>
  );
}
const Button = styled.button`
  width: 100%;
  height: 100%;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  width: 50%;
  height: 100%;
  font-size: 1.8em;
  border: 5px solid rgba(163, 168, 174, 0.1);
  cursor: pointer;
  transition: all .5s ease-in-out;
  outline: 0;
  line-height: 1em;
  &:hover {
    color: #73c990;
    border: 5px solid rgba(115, 201, 144, 0.6);
  }
`;
function StockButton(props) {
  return (
    <Button>
      <Octicon name={props.icon} /> {props.children}
    </Button>
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
// const CheckoutButton = styled.button`
//   outline: none;
//   font-size: 1.3em;
//   margin-left: 5px;
//   height: 35px;
//   width: 115px;
//   font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
//     Cantarell, Arial, sans-serif;
//   font-weight: 100;
//   -webkit-font-smoothing: antialiased;
//   font-variant: all-petite-caps;
//   font-style: normal;
//   margin-right: 10px;
//   border: 1px solid rgb(115, 201, 144);
//   color: rgb(115, 201, 144);
//   cursor: pointer;
//   transition: all .4s ease-in-out;
//   font-weight: 400;
//   &:hover {
//     background-color: #73c990;
//     color: black;
//   }
// `;
// const ViewTicketButton = styled.button`
//   outline: none;
//   font-size: 1.3em;
//   margin-left: 5px;
//   height: 35px;
//   width: 115px;
//   font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
//     Cantarell, Arial, sans-serif;
//   font-weight: 100;
//   -webkit-font-smoothing: antialiased;
//   font-variant: all-petite-caps;
//   font-style: normal;
//   margin-right: 10px;
//   border: 1px solid rgb(226, 192, 141);
//   color: rgb(226, 192, 141);
//   cursor: pointer;
//   transition: all .4s ease-in-out;
//   font-weight: 400;
//   &:hover {
//     background-color: rgb(226, 192, 141);
//     color: black;
//   }
// `;
// function Checkout(props) {
//   return (
//     <CheckoutButton>
//       <Octicon name="check" /> Checkout
//     </CheckoutButton>
//   );
// }
// function ViewTicket(props) {
//   return (
//     <ViewTicketButton>
//       <Octicon name="checklist" /> Full Ticket
//     </ViewTicketButton>
//   );
// }
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
              <Button2 primary icon="check" title="Checkout" />
            </SectionRight>
          </Section50>
        </TicketCartContainer>
        <TicketCartSummaryContainer>1</TicketCartSummaryContainer>
        <TicketCartContainer>
          <Section50>
            <SectionLeft>
              <Search />
            </SectionLeft>
            <SectionLeft>
              <Search />
            </SectionLeft>
          </Section50>
          <Section50>
            <SectionRight>
              <Button2 icon="checklist" title="Full Ticket" />
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
          <Section30>
            <StockField placeholder="Description" />
          </Section30>
          <Section10>
            <StockField placeholder="Price" />
          </Section10>
          <Section10>
            <StockField placeholder="Amount" />
          </Section10>
          <Section10>
            <StockButton icon="search" />
            <StockButton icon="plus" />
          </Section10>
        </TicketStockEditorContainer>
        <TicketStockItemsContainer>2</TicketStockItemsContainer>
      </TicketContainerItem>
    </TicketContainerSection>
  );
}
