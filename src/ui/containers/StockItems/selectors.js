import { createSelector } from 'reselect';

/**
 * Direct selector to the stockItems state domain
 */
const selectStockItemsDomain = () => (state) => state.get('stock');

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
  createSelector(selectStockItemsDomain(), (substate) => substate.get('skip'));

const makeSelectStockCount = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.get('total'));

export default selectStockItemsDomain;
export {
  selectStockItemsDomain,
  makeSelectStockItems,
  makeSelectStockLimit,
  makeSelectStockOffset,
  makeSelectStockCount,
};
