import { isRxCollection, isRxDatabase } from 'rxdb';
import { size, fromPairs, map } from 'lodash';
import schema from './schema';

class Settings {

  public db;
  public collection;

  defaults = [];

  constructor(db, collection) {
    if (!isRxDatabase(db)) {
      throw new Error('A valid RxDatabase is required!');
    }
    if (!isRxCollection(collection)) {
      throw new Error('A valid RxCollection is required!');
    }
    this.db = db;
    this.collection = collection;
  }
  async init(defaultTo = this.defaults) {
    const settingsFound = await this.collection.find().exec();
    return fromPairs(
      map(size(settingsFound) ? settingsFound : defaultTo, ({ key, value }) => [key, value])
    );
  }
}

export default async function(db) {
  // Create or Retrieve collection first
  const collection = db.collections.settings
    ? db.collections.settings
    : await db.collection({
        name: 'settings',
        schema,
      });
  // Return an Stock instance
  return new Settings(db, collection);
}
