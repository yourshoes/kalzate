import { createRxDatabase, addRxPlugin } from 'rxdb';
import { SCHEMA_SHOES } from '../config';
import Stock from '../models/stock';
import StockBasic from '../models/stock_basic';
import Tickets from '../models/tickets';
import Settings from '../models/settings';
import Charts from '../models/charts';
import PouchdbAdapterIdb from 'pouchdb-adapter-idb';

addRxPlugin(PouchdbAdapterIdb);

const defaultOptions = {
  name: 'kalzatedb',
  adapter: 'idb',
  multiInstance: true,
};

function stockInstance(db, schemaType) {
  switch (schemaType) {
    case SCHEMA_SHOES:
      return Stock(db);
    default:
      return StockBasic(db);
  }
}

export default async function (dbOptions = {}, schemaType = SCHEMA_SHOES) {
  const options = { ...defaultOptions, ...dbOptions };
  const db = await createRxDatabase(options);
  const stock = await stockInstance(db, schemaType);
  const tickets = await Tickets(db, stock);
  const settings = await Settings(db);
  const charts = await Charts(db, stock, tickets);
  return { db, stock, tickets, settings, charts };
}
