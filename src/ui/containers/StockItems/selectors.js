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

const makeSelectStockItems = () =>
  createSelector(selectStockItemsDomain(), (substate) =>
    substate.get('items').toJS()
  );

const makeSelectStockLimit = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.get('limit'));

const makeSelectStockOffset = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.get('offset'));

const makeSelectStockCount = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.get('count'));

export default selectStockItemsDomain;
export {
  selectStockItemsDomain,
  makeSelectStockItems,
  makeSelectStockLimit,
  makeSelectStockOffset,
  makeSelectStockCount,
};
