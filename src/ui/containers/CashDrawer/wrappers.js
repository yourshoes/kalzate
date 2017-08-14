/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: #161719;
  color: #a3a8ae;
  position: relative;
  box-sizing: border-box;
  height: initial;
  // overflow: hidden;
  // min-width: 300px;
  width: 300px;
  max-width: 300px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0;
  border-left: 1px solid #27292c;
  ${(props) => !props.expanded && 'max-width: 0px;'};
`;

export const GlobalScroll = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
`;

export const ContainerSwitcher = styled.span`
  background: rgba(163, 168, 174, 0.1);
  display: inline-block;
  border-bottom-left-radius: 60px;
  border-top-left-radius: 60px;
  height: 35px;
  width: 20px;
  position: relative;
  top: 50%;
  left: -20px;
  padding: 0;
  margin: 0;
  cursor: pointer;

  &:before {
    transform: translate(8px, 8px);
    content: ${(props) => (props.expanded ? '"\\F078"' : '"\\F0A4"')};
    font-family: 'octicons';
    font-weight: normal;
    font-style: normal;
    font-size: 15px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
  }
`;

export const SectionContainer = styled.div`
  height: 50%;
  width: 100%;
`;
export const SectionTitle = styled.p`
  width: 100%;
  height: 35px;
  background-color: rgba(163, 168, 174, 0.1);
  color: rgba(163, 168, 174, 0.6);
  margin: 0;
  padding: 0;
  line-height: 1.9em;
  font-size: 1.5em;
  text-align: center;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
`;
export function Section(props) {
  return (
    <SectionContainer>
      <SectionTitle>
        {props.title}
      </SectionTitle>
      {props.children}
    </SectionContainer>
  );
}
Section.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.object,
};
const PaymentMethodsSection = styled.div`
  // height: calc(25% - 30px);
  height: 25%;
  width: 100%;
  display: table;
  text-align: center;
  background-color: rgba(163, 168, 174, 0.05);
  // margin: 25px 0;
`;
export function PaymentMethods(props) {
  return (
    <PaymentSectionContainer>
      <PaymentMethodsSection />
      <PaymentMethodsSection />
      <PaymentMethodsSection />
      <PaymentMethodsSection />
    </PaymentSectionContainer>
  );
}
const PaymentSection = styled.div`
  height: 33.333%;
  width: 100%;
  display: table;
  text-align: center;
`;
const Total = styled.p`
  border-left: 4px solid #6494ed;
  border-right: 4px solid #6494ed;
  color: #6494ed;
  margin: 0;
  padding: 0;
  display: table-cell;
  vertical-align: middle;
  font-size: 5em;
  text-align: center;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;

  &::selection {
    color: rgba(163, 168, 174, 0.6);
    background-color: rgba(163, 168, 174, 0.1);
  }
`;
const Take = styled.input`
  border-left: 4px solid #73c990;
  outline: none;
  width: 100%;
  height: 100%;
  border-right: 4px solid #73c990;
  color: #73c990;
  margin: 0;
  padding: 0;
  display: table-cell;
  vertical-align: middle;
  font-size: 5em;
  text-align: center;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;

  &::selection {
    color: rgba(163, 168, 174, 0.6);
    background-color: rgba(163, 168, 174, 0.1);
  }
`;
const Returns = styled.p`
  border-left: 4px solid rgb(226, 192, 141);
  border-right: 4px solid rgb(226, 192, 141);
  color: rgb(226, 192, 141);
  margin: 0;
  padding: 0;
  display: table-cell;
  vertical-align: middle;
  font-size: 5em;
  text-align: center;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;

  &::selection {
    color: rgba(163, 168, 174, 0.6);
    background-color: rgba(163, 168, 174, 0.1);
  }
`;

const PaymentSectionContainer = styled.div`
  height: calc(100% - 35px);
  padding: 10px;
`;
export function TicketPaymentSummary(props) {
  return (
    <PaymentSectionContainer>
      <PaymentSection>
        <Total>
          {props.total.toFixed(2)} €
        </Total>
      </PaymentSection>
      <PaymentSection>
        <Take
          defaultValue={`${props.take.toFixed(2)} €`}
          onChange={() => null}
          onFocus={(event) =>
            (event.target.value = `${event.target.value
              .trim()
              .replace('€', '')}`)}
          onBlur={(event) =>
            (event.target.value = `${event.target.value.trim()} €`)}
        />
      </PaymentSection>
      <PaymentSection>
        <Returns>
          {props.returns.toFixed(2)} €
        </Returns>
      </PaymentSection>
    </PaymentSectionContainer>
  );
}
TicketPaymentSummary.propTypes = {
  total: React.PropTypes.number,
  take: React.PropTypes.number,
  returns: React.PropTypes.number,
};
