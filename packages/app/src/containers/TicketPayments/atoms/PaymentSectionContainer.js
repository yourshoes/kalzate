/**
 *
 * App Wrappers
 */

/* System imports */
import styled from 'styled-components';

export const PaymentSectionContainer = styled.div`
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  color: rgb(100, 148, 237);
  justify-content: space-evenly;
  padding-left: 40px;
  background-color: rgba(163, 168, 174, 0.1);
  margin: 10px;
  &::selection {
    color: rgba(163, 168, 174, 0.6);
    background-color: rgba(163, 168, 174, 0.1);
  }
`;

export default PaymentSectionContainer;
