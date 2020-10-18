/**
 * Use mongo as model
 */
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
import { isEmpty, isString } from 'lodash';
import { ADD_ITEM_OPERATION, RETURN_ITEM_OPERATION, PAYMENT_METHOD_VOUCHER } from './config';
import { TicketNoSavedError, TicketsNotFoundError } from '../../errors/tickets';
import Queries from './queries';

class Tickets {

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

  // /**
  //  * * @ MARK TO REMOVE
  //  * @method save
  //  * Saves a new ticket document
  //  * @param {array|object} ticket/s item/s
  //  */
  // async save(ticket) {
  //   try {
  //     const validationError = this.validateTicket(ticket);
  //     if (validationError) {
  //       throw new Error(validationError);
  //     }
  //     return await this.createOne(ticket);
  //   } catch (e) {
  //     throw new TicketNoSavedError(e, ticket);
  //   }
  // }

  // /**
  //  * @ MARK TO REMOVE
  //  * @method sell
  //  * Saves a new ticket document
  //  * @param {array|object} ticket/s item/s
  //  */
  // async sell(ticket) {
  //   try {
  //     const validationError = this.validateTicket(ticket);
  //     if (validationError) {
  //       throw new Error(validationError);
  //     }
  //     await Promise.all(ticket.items.map((stockItem) => this.stock.decreaseAmount(stockItem)));
  //     ticket.items = ticket.items.map((stockItem) => omit(stockItem, 'added'));
  //     return await this.createOne(ticket);
  //   } catch (e) {
  //     throw new TicketNoSavedError(e, ticket);
  //   }
  // }

  // /**
  //  * * @ MARK TO REMOVE
  //  * @method sellBack
  //  * It returns an existing ticket document by creating a new one
  //  * @param {array|object} ticket/s item/s
  //  */
  // async sellBack(ticket) {
  //   try {
  //     const validationError = this.validateTicketReturn(ticket);
  //     if (validationError) {
  //       throw new Error(validationError);
  //     }
  //     await Promise.all(
  //       ticket.items.map((stockItem) => {
  //         if (stockItem.added) {
  //           return this.stock.decreaseAmount({ ...stockItem, amount: stockItem.amount });
  //         }

  //         if (stockItem.toReturn) {
  //           return this.stock.increaseAmount({ ...stockItem, amount: stockItem.amount_return });
  //         }
  //       })
  //     );
  //     ticket.items = ticket.items.map((item) => ({
  //       ...item,
  //       amount_return_prev_last:
  //         item.amount_return > 0 ? item.amount_return_prev || 0 : item.amount_return_prev_last || 0,
  //       amount_return_prev: (item.amount_return_prev || 0) + (item.amount_return || 0),
  //       amount_return: 0,
  //       added: false,
  //       wasAdded: item.added,
  //       wasReturned: item.amount_return,
  //     }));
  //     console.log('items', ticket.items);
  //     const newTicket = await this.createOne(omit(ticket, '_rev'));
  //     await this.updateBy(
  //       { created_at: { $eq: Number(ticket.created_at) } },
  //       { next: Number(newTicket.created_at) }
  //     );
  //     await this.updateBy(
  //       { created_at: { $eq: Number(newTicket.created_at) } },
  //       { prev: Number(ticket.created_at) }
  //     );
  //     return newTicket;
  //   } catch (e) {
  //     throw new TicketNoSavedError(e, ticket);
  //   }
  // }

  /**
   * @method create
   * Creates a new ticket in db
   * @return {String} ticket id
   * It return the ticket id as successful operation
   * but it could return a boolean also.
   * This does not return the whole ticket.
   * To retrieve the whole ticket document, 
   * you need to call read operation
   */
  async create(ticket, verbose) {
    try {
      const validationError = this.validateTicket(ticket);
      if (validationError) {
        throw new Error(validationError);
      }
      // Create ticket
      const { id, created_at, balance } = await this.createOne(ticket);

      // Update parent ticket to point/reference to this new one
      if (ticket.prevNode) {
        await this.updateBy({
          id: {
            $eq: ticket.prevNode,
          }
        }, { nextNode: id })
      }

      // Update Stock
      await Promise.all(
        ticket.operations.map(({ operation, stock, amount }) => {

          if (!operation || !stock || !amount) {
            return Promise.resolve();
          }

          const id = stock.id;

          if (operation === ADD_ITEM_OPERATION) {
            return this.stock && this.stock.decreaseAmount({ id, amount });
          }

          if (operation === RETURN_ITEM_OPERATION) {
            return this.stock && this.stock.increaseAmount({ id, amount });
          }
        })
      );

      // Update Voucher (set to expired)
      const voucher = ticket.payments.find(({ method }) => method === PAYMENT_METHOD_VOUCHER);
      if (voucher) {
        await this.updateBy({
          created_at: {
            $eq: voucher.concept,
          }
        }, { hasVoucherExpired: true })
      }

      return verbose ? { id, created_at, balance } : id;
    } catch (error) {
      throw new TicketNoSavedError(error, ticket);
    }
  }

  /**
   * @method open
   * Read a ticket from db
   * @param {String} field the field to look the ticket for (id or creation_date)
   * @param {String} value the field to look the ticket for value
   * @return {Object} Ticket Document
   */
  async open({ field = 'id', value } = {}) {

    const getQuery = (field, value) => {

      switch (field) {
        case 'id':
          return Queries.ticketById(value);
        case 'createdAt':
          return Queries.ticketByCreationDate(value);
        default:
          throw new Error(`no look up field "${field}" supported. Use id or creationDate fields`)
      }
    }

    try {

      // Read curren ticket
      const ticket = await this.findOne(getQuery(field, value));

      // Create history with all previous operations
      // In case of a readonly ticket (it has nextNode)
      // the history will no include current operations
      // otherwise current operations will be empty []
      // and historical operations will include all
      // previous operations plus current operations
      let parentTicketId = ticket.prevNode;
      const history = ticket.nextNode ? [] : ticket.operations;

      while (parentTicketId) {

        const parentTicket = await this.findOne(getQuery('id', parentTicketId));

        history.push(...parentTicket.operations);

        parentTicketId = parentTicket.prevNode;

      }

      // if we have nextNode it's a readonly ticket so we pass 
      // in the current operations and payments info for displaying it
      // otherwise no operations a no payments are given since
      // they will be created as part of the new ticket
      const payments = ticket.nextNode ? ticket.payments : [];
      const operations = ticket.nextNode ? ticket.operations : [];

      return { ...ticket, history, operations, payments };

    } catch (error) {
      throw new TicketsNotFoundError(error);
    }
  }

  /**
 * @method query
 * Get the list of tickets filtered by a given query
 * @param {String | Object} mangoQuery a mango compilant query object
 * or a query name
 */
  async query(mangoQuery, ...args) {
    try {
      const query = isString(mangoQuery) ? Queries[mangoQuery](...args) : mangoQuery;
      return await this.get(query);
    } catch (e) {
      throw new TicketsNotFoundError(e);
    }
  }

  /**
   * @method dump
   * This is a method to export the collection as JSON data
   * @param {boolean} decrypt
   */
  async dump(decrypt = true) {
    return this.collection.dump(decrypt);
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
      const timestamp = new Date().getTime();
      const newTicket = {
        created_at: timestamp,
        ...ticket,
        isChecked: true,
        id: uuidv1(),
      };

      return this.upsert(newTicket);
    } catch (e) {
      throw new Error('createOne function');
    }
  }

  /**
 * @method get
 * This fetches the ticket items given a filter
 * @param {object} {match, limit, skip, count, sort}
 */
  async get({
    match,
    fields,
    limit = 0,
    skip = 0,
    count = false,
    sort = { created_at: 'asc' },
  } = {}) {

    const tickets = await this.collection
      .find(match)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .exec();

    const mapTicketFields = ticket => {
      const rawTicket = ticket.toJSON();
      return fields ? fields(rawTicket) : rawTicket
    };
    const items = tickets.map(mapTicketFields);

    if (!count) {
      return { items, total: items.length };
    }

    const ticketsCount = await this.collection
      .find(match)
      .exec();

    return { items, total: ticketsCount.length };
  }

  /**
   * @method updateBy
   * updates a ticket document in db
   * @param {array|object} ticket/s item/s
   * @param {string} state
   */
  async updateBy(criteria, data) {
    try {
      const ticketFound = await this.collection.findOne(criteria).exec();
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

  async findOne({ match, fields }) {
    const ticket = await this.collection
      .findOne(match)
      .exec();

    return fields(ticket.toJSON());
  }

  validateTicket(ticket) {
    if (!ticket.balance) return 'Ticket balance cannot be empty, use either positive or negative';
    if (isEmpty(ticket.operations)) return 'Ticket operations cannot be empty';
    if (ticket.balance === 'positive' && !ticket.isChecked && isEmpty(ticket.payments)) return 'Ticket payments cannot be empty';
    return false;
  }
  // validateTicketSold(ticket) {
  //   if (isEmpty(ticket.items)) return 'Ticket items cannot be empty';
  //   if (ticket.givenAmount <= 0) return 'Ticket given amount by customer must be positive number';
  //   return false;
  // }
  // validateTicketReturn(ticket) {
  //   if (isEmpty(ticket.items)) return 'Ticket items cannot be empty';
  //   return false;
  // }
}

export default async function (db, stockInstance) {
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
