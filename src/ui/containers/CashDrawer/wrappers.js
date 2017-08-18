/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import Octicon from 'react-octicon';
import styled from 'styled-components';

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
  // overflow: hidden;
  // min-width: 300px;
  width: 300px;
  max-width: 300px;
  min-width: 300px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  padding: 0;
  border-left: ${(props) =>
    props.theme && props.theme.app.border
      ? props.theme.app.border
      : '1px solid #27292c'};
  ${(props) => !props.expanded && 'max-width: 0px;min-width:0px;'};
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
  height: 44px;
  width: 20px;
  position: relative;
  top: 50%;
  // left: ${(props) => (props.expanded ? '280' : '-20')}px;
  left: -20px;
  padding: 0;
  margin: 0;
  cursor: pointer;
  z-index: 99;
  &:before {
    transform: translate(8px, 8px);
    content: ${(props) => (props.expanded ? '"\\F078"' : '"\\F0A4"')};
    font-family: 'octicons';
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    position: relative;
    top: 3px;
  }
`;

export const SectionContainer = styled.div`
  height: 50%;
  width: 100%;
`;
export const FirstSectionContainer = SectionContainer.extend`
  border-bottom: ${(props) =>
    props.theme && props.theme.app.border
      ? props.theme.app.border
      : '1px solid #27292c'};
`;
export const SectionTitle = styled.p`
  width: 100%;
  height: 44px;
  background-color: rgba(163, 168, 174, 0.1);
  color: rgba(163, 168, 174, 0.6);
  margin: 0;
  padding: 0;
  line-height: 2.5em;
  font-size: 1.5em;
  text-align: center;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
`;
export function FirstSection(props) {
  return (
    <FirstSectionContainer>
      <SectionTitle>
        {props.title}
      </SectionTitle>
      {props.children}
    </FirstSectionContainer>
  );
}
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
  // background-color: rgba(163, 168, 174, 0.05);
  background-color: rgba(163, 168, 174, 0.1);
  color: #6494ed;
  margin: 0;
  padding-left: 30px;
  font-size: 1.8em;
  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu,
    Cantarell, Arial, sans-serif;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
  font-variant: all-petite-caps;
  font-style: normal;
  // margin: 25px 0;
  &::selection {
    color: rgba(163, 168, 174, 0.6);
    background-color: rgba(163, 168, 174, 0.1);
  }
`;
const PaymentMethodsItem = styled.div`
  margin: 0;
  padding: 0;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
  transition: color .5s ease-in-out;
  &:hover {
    color: #73c990;
  }
`;
const PaymentMethodsItemTitle = styled.span`margin-left: 10px;`;
export function PaymentMethods(props) {
  return (
    <PaymentSectionContainer>
      <PaymentMethodsSection>
        <PaymentMethodsItem>
          <Octicon mega name="credit-card" />{' '}
          <PaymentMethodsItemTitle>Credit Card</PaymentMethodsItemTitle>
        </PaymentMethodsItem>
      </PaymentMethodsSection>
      <PaymentMethodsSection>
        <PaymentMethodsItem>
          <Octicon mega name="gift" />{' '}
          <PaymentMethodsItemTitle>Cheque</PaymentMethodsItemTitle>
        </PaymentMethodsItem>
      </PaymentMethodsSection>
      <PaymentMethodsSection>
        <PaymentMethodsItem>
          <Octicon mega name="credit-card" />{' '}
          <PaymentMethodsItemTitle>Efectivo</PaymentMethodsItemTitle>
        </PaymentMethodsItem>
      </PaymentMethodsSection>
      <PaymentMethodsSection>
        <PaymentMethodsItem>
          <Octicon mega name="device-mobile" />{' '}
          <PaymentMethodsItemTitle>Phone</PaymentMethodsItemTitle>
        </PaymentMethodsItem>
      </PaymentMethodsSection>
    </PaymentSectionContainer>
  );
}
const PaymentSectionContainer = styled.div`
  height: calc(100% - 44px);
  padding: 10px;
`;
