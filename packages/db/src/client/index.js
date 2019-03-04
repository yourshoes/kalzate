import * as RxDB from 'rxdb';
import { SCHEMA_SHOES } from '../config';
import Stock from '../models/stock';
import StockBasic from '../models/stock_basic';
import Tickets from '../models/tickets';
import Settings from '../models/settings';
import Charts from '../models/charts';
import PouchdbAdapterIdb from 'pouchdb-adapter-idb';
// import PouchdbAdapterWebSQL from 'pouchdb-adapter-websql';
// import PouchdbAdapterLocalstorage from 'pouchdb-adapter-localstorage';

RxDB.plugin(PouchdbAdapterIdb);
// RxDB.plugin(PouchdbAdapterWebSQL);
// RxDB.plugin(PouchdbAdapterLocalstorage);

const defaultOptions = {
  name: 'kalzatedb',
  adapter: 'idb',
  multiInstance: true,
};

function stockInstance(db, schema) {
  switch (schema) {
    case SCHEMA_SHOES:
      return Stock(db);
    default:
      return StockBasic(db);
  }
}

export default async function(dbOptions = {}, schema = SCHEMA_SHOES) {
  const options = { ...defaultOptions, ...dbOptions };
  const db = await RxDB.create(options);
  const stock = await stockInstance(db, schema);
  const tickets = await Tickets(db, stock);
  const settings = await Settings(db, schema);
  const charts = await Charts(db, stock, tickets);
  return { db, stock, tickets, settings, charts };
}
