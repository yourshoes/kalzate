
import { fromJS } from 'immutable';
import ticketPaymentsReducer from '../reducer';

describe('ticketPaymentsReducer', () => {
  it('returns the initial state', () => {
    expect(ticketPaymentsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
