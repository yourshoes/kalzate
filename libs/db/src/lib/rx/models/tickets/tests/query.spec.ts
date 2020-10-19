/* eslint-disable */
'use strict';

import { TicketNoSavedError } from '../../../errors/tickets';
import { dailyTicketIds } from '../queries';
import { getTicketsInstance, isErrorInstanceOf } from './common';
import { validTicketDocument } from './fixtures';

describe('query ticket method', function () {
  let ticketInstance;
  beforeAll(async () => {
    ticketInstance = await getTicketsInstance();
  });

  describe('dailyTicketIds query', function () {

    it('should not return tickets if there is no tickets', async function () {
      const case1 = await isErrorInstanceOf(
        () => ticketInstance.query(dailyTicketIds()),
        TicketNoSavedError
      );
      expect(case1.hasError).toBe(false);
      expect(case1.data.total).toBe(0);
      expect(case1.data.items.length).toBe(0);
    });

    it('should not return tickets if tickets have not been created today', async function () {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const case1 = await isErrorInstanceOf(
        () => ticketInstance.create({ ...validTicketDocument, createdAt: yesterday.getTime() }),
        TicketNoSavedError
      );
      expect(case1.hasError).toBe(false);
      const case2 = await isErrorInstanceOf(
        () => ticketInstance.query(dailyTicketIds()),
        TicketNoSavedError
      );
      expect(case2.hasError).toBe(false)
      expect(case2.data.total).toBe(0)
      expect(case2.data.items.length).toBe(0)
    });

    it('should return all ticket ids created today', async function () {
      const case1 = await isErrorInstanceOf(
        () => ticketInstance.create(validTicketDocument),
        TicketNoSavedError
      );
      expect(case1.hasError).toBe(false);
      const case2 = await isErrorInstanceOf(
        () => ticketInstance.query(dailyTicketIds()),
        TicketNoSavedError
      );
      expect(case2.hasError).toBe(false);
      expect(case2.data.total).toBe(1);
      expect(case2.data.items.length).toBe(1)
      expect(case2.data.items[0]).toHaveProperty('id');
      expect(case2.data.items[0]).toHaveProperty('balance');
    });
  });
});
