/*
 *
 * StockItems reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION } from './constants';

const initialState = fromJS({
  items: [
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
    {
      reference: '12ERF43',
      price: 34.4,
      size: 'M',
      brand: 'nike',
      amount: 10,
      color: 'red',
    },
  ],
  count: 1,
  limit: 10,
  offset: 0,
});

function stockItemsReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default stockItemsReducer;
