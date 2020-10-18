/**
 * @class NoStockCreatedError
 * @desc throws when stock cannot be created
 */
export class NoStockCreatedError extends Error {
  public title;
  public code;
  public message;
  public data;
  constructor(e, stock = {}) {
    super(e);
    this.title = 'Stock could not be created';
    this.code = 'NoStockCreatedError';
    this.data = stock;
    this.message = `Stock ${JSON.stringify(
      stock
    )} could not be created. Please, check extra info: ${e?.message}`;
  }
}

/**
 * @class NoStockUpdatedError
 * @desc throws when stock cannot be updated
 */
export class NoStockUpdatedError extends Error {
  public title;
  public code;
  public message;
  public data;
  constructor(e, stock = {}) {
    super(e);
    this.title = 'Stock could not be updated';
    this.code = 'NoStockUpdatedError';
    this.data = stock;
    this.message = `Stock ${JSON.stringify(
      stock
    )} could not be updated. To update an stock, it has to exist and fit the stock schema. Have a look a it on src/models/stock/schema.js. Please, check extra info: ${
      e?.message
    }`;
  }
}

/**
 * @class NoStockMatchesFoundError
 * @desc throws when no matches are found
 */
export class NoStockMatchesFoundError extends Error {
  public title;
  public code;
  public message;
  public data;
  constructor(e, field = '', value = '') {
    super(e);
    this.title = 'Stock matches not found';
    this.code = 'NoStockMatchesFoundError';
    this.data = { field, value };
    this.message = `No matches found for field "${field}" with value ${value}.Please, check extra info: ${
      e?.message
    }`;
  }
}

/**
 * @class QueryStockError
 * @desc throws when no matches are found
 */
export class QueryStockError extends Error {
  
  public title;
  public code;
  public message;
  public data;constructor(e, query = '') {

    super(e);
    this.title = 'Stock query could not be executed';
    this.code = 'QueryStockError';
    this.data = { query, e };
    this.message = `Stock Query did not run.Please, check extra info: 
    ${JSON.stringify(query)}
    Error: ${e?.message}`;
  }
}
