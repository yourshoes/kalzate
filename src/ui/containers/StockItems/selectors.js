import { createSelector } from 'reselect';

/**
 * Direct selector to the stockItems state domain
 */
const selectStockItemsDomain = () => (state) => state.get('stock');
const selectTmpData = () => (state) => state.get('tmp');

/**
 * Other specific selectors
 */

/**
 * Default selector used by StockItems
 */

const makeSelectStockItems = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.get('items'));

const makeSelectStockLimit = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.get('limit'));

const makeSelectStockOffset = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.get('skip'));

const makeSelectStockCount = () =>
  createSelector(selectStockItemsDomain(), (substate) => substate.get('total'));

const makeSelectSearch = () =>
  createSelector(selectTmpData(), (substate) => substate.get('search'));

const makeSelectMatches = () =>
  createSelector(selectTmpData(), (substate) => substate.get('matches'));

const makeSelectStockReferenceMatches = () =>
  createSelector(makeSelectMatches(), (substate) =>
    substate.get('stock').get('reference')
  );

const makeSelectStockSearch = () =>
  createSelector(makeSelectSearch(), (substate) => substate.get('stock'));

const makeSelectStockTmpData = () =>
  createSelector(selectTmpData(), (substate) => substate.get('stock'));

const makeSelectStockModalOptions = () =>
  createSelector(selectTmpData(), (substate) => substate.get('modal'));

const makeSelectStockModalRemoveOption = () =>
  createSelector(selectTmpData(), (substate) =>
    substate.get('modal').get('removeStock')
  );

const makeSelectStockModalArchiveOption = () =>
  createSelector(selectTmpData(), (substate) =>
    substate.get('modal').get('archiveStock')
  );

export default selectStockItemsDomain;
export {
  selectStockItemsDomain,
  makeSelectStockItems,
  makeSelectStockLimit,
  makeSelectStockOffset,
  makeSelectStockCount,
  makeSelectStockSearch,
  makeSelectStockTmpData,
  makeSelectStockModalOptions,
  makeSelectStockModalRemoveOption,
  makeSelectStockModalArchiveOption,
  makeSelectStockReferenceMatches,
};
