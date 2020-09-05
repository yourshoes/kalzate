import {hydrate} from './app';
import * as actionTypes from '/app/actions';

// Initial App State
export const init = (props) => ({
  ready: false,
  // Whenever a global async action triggers an error
  error: null,
});

export default function reducer(state, action) {
  switch (action.type) {
    case actionTypes.HYDRATE_SUCCESS_ACTION:
      return hydrate(state, action.data);
    default:
      return state;
  }
}