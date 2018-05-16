/**
 *
 * App Wrappers
 */

/* System imports */
import Amount from './Amount';

export const TotalAmount = Amount.extend`
  border-left: 4px solid #6494ed;
  border-right: 4px solid #6494ed;
  color: #6494ed;
`;

export default TotalAmount;
