/* eslint-disable */
'use strict';

import { TicketNoSavedError, TicketsNotFoundError } from '../../../errors/tickets';
import { getTicketsInstance, isErrorInstanceOf } from './common';
import { validTicketDocument } from './fixtures';

describe('open ticket method', function () {
  let ticketInstance;
  beforeAll(async () => {
    ticketInstance = await getTicketsInstance();
  });

  describe('dailyTickets', function () {
    it('should retrieve no tickets if there is no tickets', async function () {
      const case1 = await isErrorInstanceOf(
        () => ticketInstance.open(),
        TicketsNotFoundError
      );
      expect(case1.hasError).toBe(true);
    });

    it('should retrieve the ticket if ticket exits', async function () {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const case1 = await isErrorInstanceOf(
        () =>
          ticketInstance.create({ ...validTicketDocument, created_at: yesterday.getTime() }),
        TicketNoSavedError
      );
      expect(case1.hasError).toBe(false)
      const case2 = await isErrorInstanceOf(
        () => ticketInstance.open({ field: 'createdAt', value: yesterday.getTime() }),
        TicketsNotFoundError
      );
      expect(case2.hasError).toBe(false);
      expect(case2.data).toHaveProperty('prevNode', undefined);
      expect(case2.data).toHaveProperty('nextNode', undefined);
      expect(case2.data.history).not.toHaveLength(0);
      expect(case2.data.operations).toHaveLength(0);
      expect(case2.data.payments).toHaveLength(0);
    });
  });
});
