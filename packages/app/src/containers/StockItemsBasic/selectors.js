import { createSelector } from 'reselect';

/**
 * Direct selector to the stockItems state domain
 */
const selectStockItemsDomain = () => (state) => state.stock;
const selectTmpData = () => (state) => state.tmp;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StockItems
 */

const makeSelectStockItems = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.items);

const makeSelectStockLimit = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.limit);

const makeSelectStockOffset = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.skip);

const makeSelectStockCount = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.total);

const makeSelectStockLoading = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.loading);

const makeSelectSearch = () =>
  createSelector(selectTmpData(), (substate) => substate.search);

const makeSelectMatches = () =>
  createSelector(selectTmpData(), (substate) => substate.matches);

const makeSelectStockReferenceMatches = () =>
  createSelector(makeSelectMatches(), (substate) =>
    substate.stock.reference
  );

const makeSelectStockSearch = () =>
  createSelector(makeSelectSearch(), (substate) => substate.stock);

const makeSelectStockTmpData = () =>
  createSelector(selectTmpData(), (substate) => substate.stock);

const makeSelectStockModalOptions = () =>
  createSelector(selectTmpData(), (substate) => substate.modal);

const makeSelectStockModalRemoveOption = () =>
  createSelector(selectTmpData(), (substate) =>
    substate.modal.removeStock
  );

const makeSelectStockModalArchiveOption = () =>
  createSelector(selectTmpData(), (substate) =>
    substate.modal.archiveStock
  );

export default selectStockItemsDomain;
export {
  selectStockItemsDomain,
  makeSelectStockItems,
  makeSelectStockLimit,
  makeSelectStockOffset,
  makeSelectStockCount,
  makeSelectStockLoading,
  makeSelectStockSearch,
  makeSelectStockTmpData,
  makeSelectStockModalOptions,
  makeSelectStockModalRemoveOption,
  makeSelectStockModalArchiveOption,
  makeSelectStockReferenceMatches,
};
