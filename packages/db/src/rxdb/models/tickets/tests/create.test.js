import { TicketNoSavedError, TicketsNotFoundError } from '../../../errors/tickets';
import { getTicketsInstance, isErrorInstanceOf } from './common';
import { validTicketDocument, noOperationsTicketDocument, noPaymentsTicketDocument } from './fixtures';

describe('save ticket method', function () {
  let ticketInstance;
  beforeAll(async () => {
    ticketInstance = await getTicketsInstance();
  });

  beforeEach(async () => {
    await ticketInstance.collection.find().remove();
  })

  it('should throw error if empty ticket document is given', async () => {
    const case1 = await isErrorInstanceOf(
      () => ticketInstance.create(),
      TicketNoSavedError
    );
    expect(case1.hasError).toBe(true);
  });

  it('should throw error if ticket already exists', async () => {
    const case1 = await isErrorInstanceOf(
      () => ticketInstance.create(validTicketDocument),
      TicketNoSavedError,
    );
    expect(case1.hasError).toBe(false);
    const case2 = await isErrorInstanceOf(
      () => ticketInstance.create(case1.data),
      TicketNoSavedError
    );
    expect(case2.hasError).toBe(true);
  });

  it('should throw error if ticket operations list is empty', async () => {
    const case1 = await isErrorInstanceOf(
      () => ticketInstance.create(noOperationsTicketDocument),
      TicketNoSavedError
    );
    expect(case1.hasError).toBe(true);
  });

  it('should throw error if no payments are given', async () => {
    const case1 = await isErrorInstanceOf(
      () => ticketInstance.create(noPaymentsTicketDocument),
      TicketNoSavedError
    );
    expect(case1.hasError).toBe(true);
  });

  it('should create a new ticket document if ticket is valid', async function () {
    const case1 = await isErrorInstanceOf(
      () => ticketInstance.create(validTicketDocument),
      TicketNoSavedError
    );
    expect(case1.hasError).toBe(false);
    expect(case1.data).toHaveLength(36);
    expect(typeof case1.data).toBe('string');

  });

  it('should create prev & next nodes properly', async function () {

    const firstTicket = await isErrorInstanceOf(
      () => ticketInstance.create(validTicketDocument),
      TicketNoSavedError
    );
    expect(firstTicket.hasError).toBe(false);
    // firstTicket.data is the ticket id
    expect(firstTicket.data).toHaveLength(36);
    expect(typeof firstTicket.data).toBe('string');

    const secondTicket = await isErrorInstanceOf(
      () => ticketInstance.create({ ...validTicketDocument, prevNode: firstTicket.data }),
      TicketNoSavedError,
      true
    );
    expect(secondTicket.hasError).toBe(false);
    expect(secondTicket.data).toHaveLength(36);
    expect(typeof secondTicket.data).toBe('string');

    const thirdTicket = await isErrorInstanceOf(
      () => ticketInstance.create({ ...validTicketDocument, prevNode: secondTicket.data }),
      TicketNoSavedError,
      true
    );
    expect(thirdTicket.hasError).toBe(false);
    expect(thirdTicket.data).toHaveLength(36);
    expect(typeof thirdTicket.data).toBe('string');

    // Assert there are only 3 tickets in db
    const tickets = await ticketInstance.collection.find().exec();
    expect(tickets).toHaveLength(3)

    // Assert first ticket has prevNode to undefined & nextNode to second ticker
    // It also must not have history since it's the first ticket
    // and it must have operations and payments because it has nextNode(readonly)
    const firstTicketFromDatabase = await isErrorInstanceOf(
      () => ticketInstance.open({ field: 'id', value: firstTicket.data }),
      TicketsNotFoundError,
      true
    );
    expect(firstTicketFromDatabase.hasError).toBe(false);
    expect(firstTicketFromDatabase.data).toHaveProperty('prevNode', undefined);
    expect(firstTicketFromDatabase.data).toHaveProperty('nextNode', secondTicket.data);
    expect(firstTicketFromDatabase.data.history).toHaveLength(0);
    expect(firstTicketFromDatabase.data.operations).not.toHaveLength(0);
    expect(firstTicketFromDatabase.data.payments).not.toHaveLength(0);

    // Assert second ticket has prevNode to first ticket & nextNode to third ticker
    // It also must have history since it's the second ticket and has previous ticket
    // and it must have its own operations and payments because it has nextNode(readonly)
    const secondTicketFromDatabase = await isErrorInstanceOf(
      () => ticketInstance.open({ field: 'id', value: secondTicket.data }),
      TicketsNotFoundError
    );
    expect(secondTicketFromDatabase.hasError).toBe(false);
    expect(secondTicketFromDatabase.data).toHaveProperty('prevNode', firstTicket.data);
    expect(secondTicketFromDatabase.data).toHaveProperty('nextNode', thirdTicket.data);
    expect(secondTicketFromDatabase.data.history).not.toHaveLength(0);
    expect(secondTicketFromDatabase.data.operations).not.toHaveLength(0);
    expect(secondTicketFromDatabase.data.payments).not.toHaveLength(0);

    // Assert third ticket has prevNode to second ticket & nextNode to undefined
    // It also must have history since it's the third ticket and has previous ticket
    // and it must not have operations and payments because it has no nextNode (it is not readonly)
    const thirdTicketFromDatabase = await isErrorInstanceOf(
      () => ticketInstance.open({ field: 'id', value: thirdTicket.data }),
      TicketsNotFoundError
    );
    expect(thirdTicketFromDatabase.hasError).toBe(false);
    expect(thirdTicketFromDatabase.data).toHaveProperty('prevNode', secondTicket.data);
    expect(thirdTicketFromDatabase.data).toHaveProperty('nextNode', undefined);
    expect(thirdTicketFromDatabase.data.history).not.toHaveLength(0);
    expect(thirdTicketFromDatabase.data.operations).toHaveLength(0);
    expect(thirdTicketFromDatabase.data.payments).toHaveLength(0);

  });
});