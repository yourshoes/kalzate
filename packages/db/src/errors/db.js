/**
 * @class NoDatabaseFoundError
 * @desc throws when there no database is found
 */
export class NoDatabaseFoundError extends Error {
  constructor(e = { message: '' }) {
    super();
    this.title = 'Database could not be found';
    this.code = 'NoDatabaseFoundError';
    this.message = e.message || this.title;
  }
}
