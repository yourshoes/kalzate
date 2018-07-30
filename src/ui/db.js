import kalzateDB from 'kalzate-db';
import { merge } from 'lodash';
import { DEFAULT_SETTINGS, DEFAULT_STOCK_ITEMS_LIMIT, DEFAULT_TICKET_ITEMS_LIMIT } from 'ui/constants';

let db;

export const STATE_LOADING_START = 'ui/STATE_LOADING_START';
export const STATE_LOADING_DONE = 'ui/STATE_LOADING_DONE';
export const STATE_LOADING_FAILED = 'ui/STATE_LOADING_FAILED';

export const Stock = () => db.stock;
export const Settings = () => db.settings;
export const Tickets = () => db.tickets;
export const Charts = () => db ? db.charts : db;

const initFromDB = (load) => (store) => {
  store.dispatch({
    type: STATE_LOADING_START,
  });
  load(store).then(
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

const loadStoreFromDatabase = (store) =>
  new Promise(async (resolve) => {
    // Get initialState({settings, tickets, stock, ticket, insights})
    db = await kalzateDB();
    const state = {
      settings: merge({}, DEFAULT_SETTINGS, await db.settings.init()),
      tickets: await db.tickets.query(db.tickets.queries.dailyTickets(DEFAULT_TICKET_ITEMS_LIMIT, 0)),
      stock: await db.stock.get({ limit: DEFAULT_STOCK_ITEMS_LIMIT, skip: 0 }),
      charts: await db.charts.init(),
    };
    // console.log(state.charts)
    const currentState = store.getState();
    resolve({ ...currentState, ...state });
  });

export const databaseAsyncReducer = (reducers) => (state, action) => {
  if (action.type === STATE_LOADING_DONE) {
    return reducers(action.payload.state, action);
  }
  return reducers(state, action);
};

export default initFromDB(loadStoreFromDatabase);
