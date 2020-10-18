/* eslint-disable */
'use strict';

import { NoStockMatchesFoundError, NoStockCreatedError } from '../../../errors/stock';
import { getStockInstance, isErrorInstanceOf } from './common';

describe('Stock matches method', function() {
  let stockInstance;
  beforeEach(async () => {
    stockInstance = await getStockInstance();
  });

  it('should return empty matches if no items', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await stockInstance.matches('reference', '123'),
      NoStockMatchesFoundError
    );
    expect(case1.hasError).toBe(false);
    expect(case1.data).toHaveProperty('items');
    expect(case1.data.items).toHaveLength(0);
  });
  it('should return matches if the field matches with stock collection field starting with given value', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create([
          {
            reference: '12345',
            price: 1,
          },
          {
            reference: 'reference',
            price: 1,
          },
        ]),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    const case2 = await isErrorInstanceOf(
      async () => await stockInstance.matches('reference', '123'),
      NoStockMatchesFoundError
    );
    expect(case2.hasError).toBe(false);
    expect(case2.data).toHaveProperty('items');
    expect(case2.data.items).toHaveLength(1);
    expect(case2.data.items[0]).toEqual('12345');
  });

  it('should return matches if the field matches with stock collection field containing the given value', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create([
          {
            reference: '123hi',
            price: 1,
          },
          {
            reference: '123bye',
            price: 1,
          },
          {
            reference: '1edrasd123',
            price: 1,
          },
        ]),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    const case2 = await isErrorInstanceOf(
      async () => await stockInstance.matches('reference', '123'),
      NoStockMatchesFoundError
    );
    expect(case2.hasError).toBe(false);
    expect(case2.data).toHaveProperty('items');
    expect(case2.data.items).toHaveLength(2);
  });
  it('should return no matches if the given field value is empty', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create([
          {
            reference: '123hi',
            price: 1,
          },
          {
            reference: '123bye',
            price: 1,
          },
          {
            reference: '1edrasd123',
            price: 1,
          },
        ]),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    const case2 = await isErrorInstanceOf(
      async () => await stockInstance.matches('reference', ''),
      NoStockMatchesFoundError
    );
    expect(case2.hasError).toBe(false);
    expect(case2.data).toHaveProperty('items');
    expect(case2.data.items).toHaveLength(0);
  });
});
