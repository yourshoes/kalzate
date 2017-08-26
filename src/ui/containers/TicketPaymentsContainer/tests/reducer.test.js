
import { fromJS } from 'immutable';
import ticketTotalReducer from '../reducer';

describe('ticketTotalReducer', () => {
  it('returns the initial state', () => {
    expect(ticketTotalReducer(undefined, {})).toEqual(fromJS({}));
  });
});
