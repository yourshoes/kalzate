import { TicketNoSavedError } from '../../../errors/tickets';
import { getTicketsInstance, isErrorInstanceOf } from './common';
import { validTicketDocument, noOperationsTicketDocument, noPaymentsTicketDocument } from './fixtures';

describe('save ticket method', function () {
  let ticketInstance;
  beforeAll(async () => {
    ticketInstance = await getTicketsInstance();
  });

  it('should throw error if empty ticket document is given', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.create(),
      TicketNoSavedError
    );
    expect(case1.result).toBe(true);
  });

  it('should throw error if ticket already exists', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.create(validTicketDocument),
      TicketNoSavedError
    );
    expect(case1.result).toBe(false);
    const case2 = await isErrorInstanceOf(
      async () => await ticketInstance.create(case1.data),
      TicketNoSavedError
    );
    expect(case2.result).toBe(true);
  });

  it('should throw error if ticket operations list is empty', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.create(noOperationsTicketDocument),
      TicketNoSavedError
    );
    expect(case1.result).toBe(true);
  });

  it('should throw error if no payments are given', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.create(noPaymentsTicketDocument),
      TicketNoSavedError
    );
    expect(case1.result).toBe(true);
  });

  it('should create a new ticket document if ticket is valid', async function () {
    const case1 = await isErrorInstanceOf(
      async () => await ticketInstance.create(validTicketDocument),
      TicketNoSavedError
    );
    expect(case1.result).toBe(false);
    expect(case1.data).toHaveLength(36);
    expect(typeof case1.data).toBe('string');

  });

  it('should create prev & next nodes properly', async function () {
    const firstTicket = await isErrorInstanceOf(
      async () => await ticketInstance.create(validTicketDocument),
      TicketNoSavedError
    );
    expect(firstTicket.result).toBe(false);
    expect(firstTicket.data).toHaveLength(36);
    expect(typeof firstTicket.data).toBe('string');

    const secondTicket = await isErrorInstanceOf(
      async () => await ticketInstance.create({ ...validTicketDocument, prevNode: firstTicket.data }),
      TicketNoSavedError,
      true
    );
    expect(secondTicket.result).toBe(false);
    expect(secondTicket.data).toHaveLength(36);
    expect(typeof secondTicket.data).toBe('string');

    const thirdTicket = await isErrorInstanceOf(
      async () => await ticketInstance.create({ ...validTicketDocument, prevNode: secondTicket.data }),
      TicketNoSavedError,
      true
    );
    expect(thirdTicket.result).toBe(false);
    expect(thirdTicket.data).toHaveLength(36);
    expect(typeof thirdTicket.data).toBe('string');

    // Assert there are only 3 tickets in db

    // Assert first ticket has prevNode to undefined & nextNode to second ticker
    // Assert second ticket has prevNode to first ticket & nextNode to third ticker
    // Assert third ticket has prevNode to second ticket & nextNode to undefined

  });
});