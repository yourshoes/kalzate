import { hydrate } from './app';
import * as actionTypes from '/app/actions';

function asyncMiddleware(action) {
  switch (action.type) {
    case actionTypes.HYDRATE_ACTION: {
      return hydrate();
    }
    default:
      return;
  }
}

export default async function (dispatch, action) {
  const otherAction = await asyncMiddleware(action);
  if (otherAction) {
    dispatch(otherAction);
  }
}
