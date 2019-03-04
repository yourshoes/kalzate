/**
 *
 * App Wrappers
 */

/* System imports */
import Amount from './Amount';

export const GivenAmount = Amount.withComponent('input').extend.attrs({ type: 'text' }) `
  border-left: 4px solid #73c990;
  outline: none;
  width: 100%;
  height: 100%;
  border-right: 4px solid #73c990;
  color: #73c990;
`;

export default GivenAmount;
