import { TicketNoSavedError, TicketsNotFoundError } from '../../../errors/tickets';
import { getTicketsInstance, isErrorInstanceOf } from './common';
import { validTicketDocument, noOperationsTicketDocument, noPaymentsTicketDocument } from './fixtures';

describe('create ticket method', function () {
  let ticketInstance;
  beforeAll(async () => {
    ticketInstance = await getTicketsInstance();
  });

  beforeEach(async () => {
    await ticketInstance.collection.find().remove();
  })

  it('should decrease the stock items amount when making a ticket', async () => {

  });

  it('should inrease the stock items amount when returning a ticket', async () => {

  });

});