import kalzateDB from 'kalzate-db';
import { DEFAULT_SETTINGS } from 'ui/constants';
import { assign } from 'lodash';

let db;

export const STATE_LOADING_START = 'ui/STATE_LOADING_START';
export const STATE_LOADING_DONE = 'ui/STATE_LOADING_DONE';
export const STATE_LOADING_FAILED = 'ui/STATE_LOADING_FAILED';

export const Stock = () => db.stock.collection;
export const Settings = () => db.settings.collection;
export const Tickets = () => db.tickets.collection;

const initFromDB = (load) => (store) => {
  store.dispatch({
    type: STATE_LOADING_START,
  });
  load(store.getState()).then(
    (state) => {
      store.dispatch({
        type: STATE_LOADING_DONE,
        payload: { state },
      });
    },
    (error) => {
      store.dispatch({
        type: STATE_LOADING_FAILED,
        payload: { error },
      });
    }
  );
  return (next) => (action) => next(action);
};

const loadStoreFromDatabase = (currentState) => new Promise(async (resolve) => {
  // Get initialState({settings, tickets, stock, ticket, insights})
  db = await kalzateDB();
  const state = currentState.merge({
    settings: assign({}, DEFAULT_SETTINGS, await db.settings.init()),
    tickets: await db.tickets.init(),
    stock: await db.stock.init(),
  });
  resolve(state);
});

export const databaseAsyncReducer = (reducers) => (state, action) => {
  if (action.type === STATE_LOADING_DONE) {
    return reducers(action.payload.state, action);
  }
  return reducers(state, action);
};

export default initFromDB(loadStoreFromDatabase);
