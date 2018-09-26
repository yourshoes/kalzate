/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const PaymentMethodsItem = styled.div`
  margin: 0;
  padding: 0;
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
  transition: color 0.5s ease-in-out;
  &:hover {
    color: #73c990;
  }
  color: ${(props) => (props.selected ? '#73c990' : '#6494ed')};
`;

export default PaymentMethodsItem;
