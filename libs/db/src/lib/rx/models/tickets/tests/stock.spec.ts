import { TicketNoSavedError } from '../../../errors/tickets';
import { NoStockCreatedError } from '../../../errors/stock';
import { getTicketsInstance, isErrorInstanceOf } from './common';
import { getStockInstance } from '../../stock_basic/tests/common';
import { validTicketDocument, validStockItem, validAddOperation, validReturnOperation } from './fixtures';

describe('create ticket method (stock)', function () {
  let ticketInstance;
  let stockInstance;
  beforeAll(async () => {
    stockInstance = await getStockInstance();
    ticketInstance = await getTicketsInstance({ stockInstance });
  });

  beforeEach(async () => {
    await ticketInstance.collection.find().remove();
    await stockInstance.collection.find().remove();
  })

  it('should decrease the stock items amount when making a ticket', async () => {
    // Case 1: Create stock item
    const case1 = await isErrorInstanceOf(
      () =>
        stockInstance.create(validStockItem),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    //Case 2: Create ticket with add stock item operation
    const stockItemId = case1.data.get().id;
    const ticketDocument = {
      ...validTicketDocument,
      operations: [{
        ...validAddOperation,
        stock: { ...validAddOperation.stock, id: stockItemId }
      }]
    }
    const case2 = await isErrorInstanceOf(
      () => ticketInstance.create(ticketDocument),
      TicketNoSavedError,
    );
    expect(case2.hasError).toBe(false);
    expect(case2.data).toHaveLength(36);
    expect(typeof case2.data).toBe('string');

    // Case 3: read stock item document and check amount is decreased
    const expectedAmount = validStockItem.amount - validAddOperation.amount;
    const case3 = await stockInstance.fetchById({ id: stockItemId });
    expect(case3[0].get().amount).toBe(expectedAmount);
  });

  it('should increase the stock items amount when returning a ticket', async () => {
    // Case 1: Create stock item
    const case1 = await isErrorInstanceOf(
      () =>
        stockInstance.create(validStockItem),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    //Case 2: Create ticket with add stock item operation
    const stockItemId = case1.data.get().id;
    const ticketDocument = {
      ...validTicketDocument,
      operations: [{
        ...validReturnOperation,
        stock: { ...validAddOperation.stock, id: stockItemId }
      }]
    }
    const case2 = await isErrorInstanceOf(
      () => ticketInstance.create(ticketDocument),
      TicketNoSavedError
    );
    expect(case2.hasError).toBe(false);
    expect(case2.data).toHaveLength(36);
    expect(typeof case2.data).toBe('string');

    // Case 3: read stock item document and check amount is decreased
    const expectedAmount = validStockItem.amount + validAddOperation.amount;
    const case3 = await stockInstance.fetchById({ id: stockItemId });
    expect(case3[0].get().amount).toBe(expectedAmount);
  });

});