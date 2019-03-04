/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import Octicon from 'react-octicon';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100%;
  z-index: 2;
  min-width: 300px;
  width: 300px;
  max-width: 300px;
  background-color: ${(props) =>
    props.theme && props.theme.app.bgColor
      ? props.theme.app.bgColor
      : '#161719'};
  color: ${(props) =>
    props.theme && props.theme.app.color ? props.theme.app.color : ' #a3a8ae'};
  padding: 0;
  border-left: ${(props) =>
    props.theme && props.theme.app.border
      ? props.theme.app.border
      : '1px solid #27292c'};
  border-bottom: ${(props) =>
    props.theme && props.theme.app.border
      ? props.theme.app.border
      : '1px solid #27292c'};
`;

export const ContainerSwitcher = styled.span`
  position: absolute;
  display: inline-block;
  top: 4px;
  left: ${(props) => (props.expanded ? '6' : '3')}px;
  cursor: pointer;
  z-index: 99;
  color: ${(props) =>
    props.theme && props.theme.app.switchPanelIconColor ? props.theme.app.switchPanelIconColor : 'rgba(255, 255, 255, 0.4)'};
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
// content: ${(props) => (props.expanded ? '"\\F04E"' : '"\\F105"')};
export const TicketTemplateViewerSwitcher = styled.span`
  position: absolute;
  display: inline-block;
  top: 4px;
  right: ${(props) => (props.expanded ? '6' : '3')}px;
  cursor: pointer;
  z-index: 99;
  color: ${(props) =>
    props.theme && props.theme.app.switchPanelIconColor ? props.theme.app.switchPanelIconColor : 'rgba(255, 255, 255, 0.4)'};
  &:before {
    transform: translate(8px, 8px);
    content: ${(props) => (props.expanded ? '"\\F011"' : '"\\F051"')};
    font-family: 'octicons';
    font-weight: normal;
    font-style: normal;
    font-size: 16px;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    position: relative;
    top: 3px;
    right: 20px;
  }
`;
// export const ContainerSwitcher = styled.span`
//   position: absolute;
//   background: rgba(163, 168, 174, 0.1);
//   display: inline-block;
//   border-bottom-left-radius: 60px;
//   border-top-left-radius: 60px;
//   height: 44px;
//   width: 20px;
//   top: 50%;
//   left: -20px;
//   padding: 0;
//   margin: 0;
//   cursor: pointer;
//   z-index: 99;
//   &:before {
//     transform: translate(8px, 8px);
//     content: ${(props) => (props.expanded ? '"\\F078"' : '"\\F0A4"')};
//     font-family: 'octicons';
//     font-weight: normal;
//     font-style: normal;
//     font-size: 16px;
//     display: inline-block;
//     -webkit-font-smoothing: antialiased;
//     position: relative;
//     top: 3px;
//   }
// `;

export const SectionContainer = styled.div`
  height: 100%;
  padding: ${(props) =>
    props.theme && props.theme.app.padding ? props.theme.app.padding : '0px'};
`;
export const FirstSectionContainer = SectionContainer.extend``;
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
