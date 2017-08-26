
import { fromJS } from 'immutable';
import ticketItemsReducer from '../reducer';

describe('ticketItemsReducer', () => {
  it('returns the initial state', () => {
    expect(ticketItemsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
