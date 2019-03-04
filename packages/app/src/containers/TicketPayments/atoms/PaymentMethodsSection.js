/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const PaymentMethodsSection = styled.div`
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

export default PaymentMethodsSection;
