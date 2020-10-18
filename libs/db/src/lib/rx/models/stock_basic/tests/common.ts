import { createRxDatabase, addRxPlugin } from 'rxdb';
import MemoryAdapter from 'pouchdb-adapter-memory';
import Stock from '../';

addRxPlugin(MemoryAdapter);

export const counter = (function* counter() {
  let countId = 0;
  while (true) {
    countId += 1;
    yield countId;
  }
})();

export const getStockInstance = async (
  dbOptions = {
    name: `kalzatedb${new Date().getTime()}`,
    adapter: 'memory',
    multiInstance: true,
  }
) => Stock(await createRxDatabase(dbOptions));

export const isErrorInstanceOf = async (fn, ErrorType, debug = false) => {
  let data;
  const { title, code } = new ErrorType();
  try {
    data = await fn();
  } catch (error) {
    if (debug) {
      console.error(error)
    }
    return { data, hasError: error?.title === title && error?.code === code, error };
  }
  return { data, hasError: false, error: null };
};
