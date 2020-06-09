/* eslint-disable */
'use strict';

import { TicketNoSavedError } from '../../../errors/tickets';
import { expect } from 'chai';
import { getTicketsInstance, isErrorInstanceOf } from './common';
import { validTicketDocument } from './fixtures';

describe('query ticket method', function() {
  let ticketInstance;
  beforeAll(async () => {
    ticketInstance = await getTicketsInstance();
  });

  describe('dailyTickets', function() {
    it('should retrieve no tickets if there is no tickets', async function() {
      const case1 = await isErrorInstanceOf(
        async () => await ticketInstance.query(),
        TicketNoSavedError
      );
      expect(case1.result).to.be.false;
      expect(case1.data.total).to.equal(0);
      expect(case1.data.items.length).to.equal(0);
    });

    it('should retrieve no tickets if tickets have not been created today', async function() {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const case1 = await isErrorInstanceOf(
        async () =>
          await ticketInstance.save({ ...validTicketDocument, created_at: yesterday.getTime() }),
        TicketNoSavedError
      );
      expect(case1.result).to.be.false;
      const case2 = await isErrorInstanceOf(
        async () => await ticketInstance.query(),
        TicketNoSavedError
      );
      expect(case2.result).to.be.false;
      expect(case2.data.total).to.equal(0);
      expect(case2.data.items.length).to.equal(0);
    });

    it('should retrieve all tickets created today', async function() {
      const case1 = await isErrorInstanceOf(
        async () => await ticketInstance.save(validTicketDocument),
        TicketNoSavedError
      );
      expect(case1.result).to.be.false;
      const case2 = await isErrorInstanceOf(
        async () => await ticketInstance.query(ticketInstance.queries.dailyTickets()),
        TicketNoSavedError
      );
      expect(case2.result).to.be.false;
      expect(case2.data.total).to.equal(1);
      expect(case2.data.items.length).to.equal(1);
    });
  });
});
