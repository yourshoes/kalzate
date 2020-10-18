/**
 * @class TicketNoSavedError
 * @desc throws when stock cannot be created
 */
export class TicketNoSavedError extends Error {
  constructor(e = { message: '' }, ticket = {}) {
    super(e);
    this.title = 'Ticket could not be saved';
    this.code = 'TicketNoSavedError';
    this.data = ticket;
    this.message = `Ticket ${JSON.stringify(
      ticket
    )} could not be saved. Please, check extra info: ${e.message}`;
  }
}

/**
 * @class TicketNoSavedError
 * @desc throws when stock cannot be created
 */
export class TicketsNotFoundError extends Error {
  constructor(e = { message: '' }, ticket = {}) {
    super(e);
    this.title = 'Tickets were not found';
    this.code = 'TicketsNotFoundError';
    this.data = ticket;
    this.message = `Please, check extra info: ${e.message}`;
  }
}
