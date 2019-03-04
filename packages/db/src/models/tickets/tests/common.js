import { create, plugin } from 'rxdb';
import MemoryAdapter from 'pouchdb-adapter-memory';
import Tickets from '../';

plugin(MemoryAdapter);

export const counter = (function* counter() {
  let countId = 0;
  while (true) {
    countId += 1;
    yield countId;
  }
})();

export const getTicketsInstance = async (
  dbOptions = {
    name: `kalzatedb${new Date().getTime()}`,
    adapter: 'memory',
    multiInstance: true,
  }
) => Tickets(await create(dbOptions));

export const isErrorInstanceOf = async (fn, ErrorType) => {
  let error = {};
  let data;
  try {
    data = await fn();
  } catch (e) {
    error = e;
  }
  const { title, code } = new ErrorType();
  return { data, result: error.title === title && error.code === code, error };
};
