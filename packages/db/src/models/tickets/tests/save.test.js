import { TicketNoSavedError } from '../../../errors/tickets';
import { expect } from 'chai';
import { getTicketsInstance, isErrorInstanceOf } from './common';
import { validTicketDocument, noItemsTicketDocument, noMethodTicketDocument } from './fixtures';

describe('save ticket method', function() {
  let ticketInstance;
  beforeAll(async () => {
    ticketInstance = await getTicketsInstance();
  });

  it('should throw error if empty ticket document is given', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.save(),
      TicketNoSavedError
    );
    expect(case1.result).to.be.true;
  });

  it('should throw error if ticket already exists', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.save(validTicketDocument),
      TicketNoSavedError
    );
    expect(case1.result).to.be.false;
    const case2 = await isErrorInstanceOf(
      async () => await ticketInstance.save(case1.data),
      TicketNoSavedError
    );
    expect(case2.result).to.be.true;
  });

  it('should throw error if ticket items list is empty', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.save(noItemsTicketDocument),
      TicketNoSavedError
    );
    expect(case1.result).to.be.true;
  });

  it('should throw error if no payment method is given', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.save(noMethodTicketDocument),
      TicketNoSavedError
    );
    expect(case1.result).to.be.true;
  });

  it('should save a new ticket document if ticket is valid', async function() {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.save(validTicketDocument),
      TicketNoSavedError
    );
    expect(case1.result).to.be.false;
    expect(case1.data).to.have.property('id');
    expect(case1.data).to.have.property('created_at');
    expect(case1.data).to.have.property('items');
    expect(case1.data).to.have.property('state');
    expect(case1.data).to.have.property('totalAmount');
  });
});
