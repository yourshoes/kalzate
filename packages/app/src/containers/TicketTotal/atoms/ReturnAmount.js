/**
 *
 * App Wrappers
 */

/* System imports */
import Amount from './Amount';

export const ReturnAmount = Amount.extend`
border-left: 4px solid rgb(226, 192, 141);
border-right: 4px solid rgb(226, 192, 141);
color: rgb(226, 192, 141);
`;

export default ReturnAmount;
