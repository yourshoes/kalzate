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
  height: 35px;
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
`;
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
      <TicketContainerItem>2</TicketContainerItem>
    </TicketContainerSection>
  );
}
