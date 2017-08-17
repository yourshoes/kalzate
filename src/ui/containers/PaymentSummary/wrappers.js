/**
 *
 * App Wrappers
 */

/* System imports */
import React from 'react';
import styled from 'styled-components';

export const PaymentSectionContainer = styled.div`
  height: calc(100% - 35px);
  padding: 10px;
`;
export const PaymentSection = styled.div`
  height: 33.333%;
  width: 100%;
  display: table;
  text-align: center;
`;
const Amount = styled.p`
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

const TotalAmount = Amount.extend`
  border-left: 4px solid #6494ed;
  border-right: 4px solid #6494ed;
  color: #6494ed;
`;
const TakeAmount = Amount.withComponent('input').extend`
  border-left: 4px solid #73c990;
  outline: none;
  width: 100%;
  height: 100%;
  border-right: 4px solid #73c990;
  color: #73c990;
`;
const ReturnAmount = Amount.extend`
  border-left: 4px solid rgb(226, 192, 141);
  border-right: 4px solid rgb(226, 192, 141);
  color: rgb(226, 192, 141);
`;

export function Total(props) {
  return (
    <TotalAmount>
      {props.amount} {props.currency}
    </TotalAmount>
  );
}
Total.propTypes = {
  amount: React.PropTypes.string,
  currency: React.PropTypes.string,
};

export function Returns(props) {
  return (
    <ReturnAmount>
      {props.amount} {props.currency}
    </ReturnAmount>
  );
}
Returns.propTypes = {
  amount: React.PropTypes.string,
  currency: React.PropTypes.string,
};

export function Take(props) {
  console.log(props.amount);
  return (
    <TakeAmount
      type="text"
      onBlur={(event) =>
        (event.target.value = `${props.amount} ${props.currency}`)}
      onDoubleClick={(event) => (event.target.value = '')}
      defaultValue={`${props.amount} ${props.currency}`}
      onChange={(event) => props.onTakeChange(event.target.value)}
    />
  );
}
Take.propTypes = {
  amount: React.PropTypes.string,
  currency: React.PropTypes.string,
  onTakeChange: React.PropTypes.func,
};
