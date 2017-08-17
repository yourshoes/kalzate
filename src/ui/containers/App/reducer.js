/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import _ from 'lodash';
import * as Resources from 'ui/utils/resources';
import {
  CHANGE_RESOURCE_SELECTED,
  ADD_RESOURCE,
  CHANGE_TAKE_AMOUNT,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  app: {
    license: 'MIT',
    loading: false,
    error: false,
    language: 'en',
    theme: 'default',
    resource: '', // 'tsur/octoql/example',
  },
  ticket: {
    totalAmount: '0.00',
    takeAmount: '0.00',
    returnAmount: '0.00',
    currency: '€',
  },
  resources: {
    tsur: {
      octoql: {
        example: { queries: [], meta: {}, id: '', title: 'Example' },
      },
      blockade: {
        notebook1: { queries: [], meta: {}, id: '', title: 'Notebook1' },
      },
    },
    angular: {
      angular2: {
        notebook1: { queries: [], meta: {}, id: '', title: 'Notebook1' },
      },
    },
  },
});

function createPath(pathRoute, localState) {
  const aNewResource = pathRoute.reverse().reduce((a, b) => {
    const temp = {};
    temp[b] = a;

    return temp;
  }, _.size(pathRoute) === 3
    ? {
      queries: [],
      meta: pathRoute,
      title: Resources.getNotebookTitle(pathRoute.join('')),
      id: pathRoute.join(''),
    }
    : {});
  return localState.setIn(
    ['resources'],
    localState.get('resources').mergeDeep(aNewResource)
  );
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TAKE_AMOUNT:
      const takeAmountString = action.amount
        .replace(state.getIn(['ticket', 'currency']), '')
        .trim();
      // validate takeAmountString
      if (!/^[0-9]+([,.]{1}[0-9]+)?$/.test(takeAmountString)) return state;
      // normalize takeAmountString
      console.log(
        'changing2',
        takeAmountString,
        parseFloat(takeAmountString, 10).toFixed(2)
      );

      const takeState = state.setIn(
        ['ticket', 'takeAmount'],
        parseFloat(takeAmountString.replace(',', '.'), 10).toFixed(2)
      );

      return takeState.setIn(
        ['ticket', 'returnAmount'],
        (parseFloat(takeAmountString.replace(',', '.'), 10) -
          parseFloat(state.getIn(['ticket', 'totalAmount']), 10)).toFixed(2)
      );
    default:
      return state;
  }
}

export default appReducer;
