
import { fromJS } from 'immutable';
import stockItemsReducer from '../reducer';

describe('stockItemsReducer', () => {
  it('returns the initial state', () => {
    expect(stockItemsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
