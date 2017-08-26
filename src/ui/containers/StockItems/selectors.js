import { createSelector } from 'reselect';

/**
 * Direct selector to the stockItems state domain
 */
const selectStockItemsDomain = () => (state) => state.get('stockItems');

/**
 * Other specific selectors
 */


/**
 * Default selector used by StockItems
 */

const makeSelectStockItems = () => createSelector(
  selectStockItemsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectStockItems;
export {
  selectStockItemsDomain,
};
