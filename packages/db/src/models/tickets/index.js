/**
 * Use mongo as model
 */

// class Ticket {
//   constructor(db) {
//     this._db = db;
//   }
//   async create(item) {}
//   async update(id, item) {}
//   async remove(id) {}
//   async query() {}
//   async import() {}
//   async export() {}
// }

// export default async function (db) {
//   // Create collection
//   return new Ticket(db);
// }
/**
 * Use mongo as model
 */
// More sold
// More expensive
// Cheapest Stocks
// Has discount (offer)
// last sold
// Cat Women
// Cat Men
// Cat Children
// All
import { isRxCollection, isRxDatabase } from 'rxdb';
import schema from './schema';
import uuidv1 from 'uuid/v1';
import { isEmpty, first, omit } from 'lodash';
import { DEFAULT_LIMIT_AMOUNT } from './config';
import { TicketNoSavedError, TicketsNotFoundError } from '../../errors/tickets';

class Tickets {
  defaults = { limit: DEFAULT_LIMIT_AMOUNT, skip: 0 };
  queries = {
    dailyTickets: (limit, skip) => ({
      match: {
        created_at: {
          $gte: new Date().setHours(0, 0, 0, 0),
        },
      },
      sort: 'created_at',
      limit,
      skip,
    }),
    weeklyTickets: (limit = Number.MAX_SAFE_INTEGER, skip) => {
      const today = new Date();
      today.setDate(today.getDate() - today.getDay());
      return {
        match: {
          created_at: {
            $gte: today.setHours(0, 0, 0, 0),
          },
        },
        sort: 'created_at',
        limit,
        skip,
      };
    },
  };

  constructor(db, collection, stock) {
    if (!isRxDatabase(db)) {
      throw new Error('A valid RxDatabase is required!');
    }
    if (!isRxCollection(collection)) {
      throw new Error('A valid RxCollection is required!');
    }
    this.db = db;
    this.collection = collection;
    this.stock = stock;
  }

  /**
   * @method save
   * Saves a new ticket document
   * @param {array|object} ticket/s item/s
   */
  async save(ticket) {
    try {
      const validationError = this.validateTicket(ticket);
      if (validationError) {
        throw new Error(validationError);
      }
      return await this.createOne(ticket);
    } catch (e) {
      throw new TicketNoSavedError(e, ticket);
    }
  }

  /**
   * @method sell
   * Saves a new ticket document
   * @param {array|object} ticket/s item/s
   */
  async sell(ticket) {
    try {
      const validationError = this.validateTicket(ticket);
      if (validationError) {
        throw new Error(validationError);
      }
      await Promise.all(ticket.items.map((stockItem) => this.stock.decreaseAmount(stockItem)));
      ticket.items = ticket.items.map((stockItem) => omit(stockItem, 'added'));
      return await this.createOne(ticket);
    } catch (e) {
      throw new TicketNoSavedError(e, ticket);
    }
  }

  /**
   * @method sellBack
   * It returns an existing ticket document by creating a new one
   * @param {array|object} ticket/s item/s
   */
  async sellBack(ticket) {
    try {
      const validationError = this.validateTicketReturn(ticket);
      if (validationError) {
        throw new Error(validationError);
      }
      const newTicket = await this.createOne(omit(ticket, '_rev'));
      console.log(ticket.created_at, newTicket.created_at);
      await this.updateBy(
        { created_at: { $eq: Number(ticket.created_at) } },
        { relatesTo: String(newTicket.created_at) }
      );
      await Promise.all(
        ticket.items.map((stockItem) => {
          if (stockItem.added) {
            return this.stock.decreaseAmount({ ...stockItem, amount: stockItem.amount });
          }

          if (stockItem.toReturn) {
            return this.stock.increaseAmount({ ...stockItem, amount: stockItem.amount_return });
          }
        })
      );
      return newTicket;
    } catch (e) {
      throw new TicketNoSavedError(e, ticket);
    }
  }

  /**
   * @method query
   * Get the list of tickets filtered by a given query
   * @param {object} tickets query
   */
  async query(query = this.queries.dailyTickets()) {
    try {
      return await this.get(query);
    } catch (e) {
      throw new TicketsNotFoundError(e);
    }
  }

  /**
   * @method get
   * This fetches the ticket items given a filter
   * @param {object} {match, limit, skip, count, sort}
   */
  async get({
    match,
    limit = this.defaults.limit,
    skip = this.defaults.skip,
    count = true,
    sort = { created_at: 'asc' },
  } = {}) {
    const foundTickets = this.collection
      .find(match)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .exec();
    if (!count) return foundTickets;
    const totalAmount = new Promise(async (resolve) => {
      const allTickets = await this.collection.find(match).exec();
      resolve(allTickets.length);
    });
    const [items, total] = await Promise.all([foundTickets, totalAmount]);
    return { items, total, limit, skip };
  }

  /**
   * @method matches
   * This looks for a all tickets items maching the field and value given
   * @param {string} field
   * @param {string} value
   */
  async matches(field, value) {
    try {
      if (!value) return { value, items: [] };
      const matches = await this.get({
        match: { [field]: { $regex: new RegExp(`^${value}`) } },
      });
      return { value, items: matches.items.map((i) => i[field]) };
    } catch (e) {
      throw new TicketsNotFoundError(e, field, value);
    }
  }

  /** ***************************************************** */
  /*                  PRIVATE METHODS                      */
  /** ***************************************************** */

  /**
   * @method createOne
   * Cretes a new ticket document in db
   * @param {array|object} ticket/s item/s
   * @param {string} state
   */
  async createOne(ticket) {
    try {
      const newTicket = { ...ticket, id: uuidv1(), created_at: new Date().getTime() };
      console.log(ticket, newTicket);

      return this.upsert(newTicket);
    } catch (e) {
      throw new Error('createOne function');
    }
  }

  /**
   * @method updateBy
   * Cretes a new ticket document in db
   * @param {array|object} ticket/s item/s
   * @param {string} state
   */
  async updateBy(criteria, data) {
    try {
      const ticketFound = first(await this.collection.find(criteria).exec());
      if (!ticketFound) {
        throw new TicketsNotFoundError(null, criteria, data);
      }
      return this.upsert({ ...ticketFound._data, ...data });
    } catch (e) {
      throw new Error('updateBy function');
    }
  }

  async upsert(ticket) {
    return this.collection.atomicUpsert(ticket);
  }

  validateTicket(ticket) {
    if (isEmpty(ticket.items)) return 'Ticket items cannot be empty';
    if (ticket.totalAmount <= 0) return 'Ticket total amount must be positive number';
    if (ticket.givenAmount <= 0) return 'Ticket given amount by customer must be positive number';
    return false;
  }
  validateTicketSold(ticket) {
    if (isEmpty(ticket.items)) return 'Ticket items cannot be empty';
    if (ticket.givenAmount <= 0) return 'Ticket given amount by customer must be positive number';
    return false;
  }
  validateTicketReturn(ticket) {
    if (isEmpty(ticket.items)) return 'Ticket items cannot be empty';
    return false;
  }
}

export default async function(db, stockInstance) {
  // Create or Retrieve collection first
  const collection = db.collections.tickets
    ? db.collections.tickets
    : await db.collection({
        name: 'tickets',
        schema,
      });
  // Return an Tickets instance
  return new Tickets(db, collection, stockInstance);
}
