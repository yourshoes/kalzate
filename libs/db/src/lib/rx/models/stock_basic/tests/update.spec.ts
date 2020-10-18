/* eslint-disable */
'use strict';

import { NoStockCreatedError, NoStockUpdatedError } from '../../../errors/stock';
import { getStockInstance, isErrorInstanceOf } from './common';

describe('update stock method', function () {
  let stockInstance;
  beforeAll(async () => {
    stockInstance = await getStockInstance();
  });

  it('should throw error if empty stock item is given when updating a new stock', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await stockInstance.update(),
      NoStockUpdatedError
    );
    expect(case1.hasError).toBe(true);
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.update({
          id: '',
          createdAt: 0,
          reference: '',
          brand: '',
          gender: '',
          size: 0,
          price: 0,
          amount: 0,
          colors: [],
        }),
      NoStockUpdatedError
    );
    expect(case2.hasError).toBe(true);
  });

  it('should not throw error if stock exists', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: 'reference',
          price: 1,
        }),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.update({
          id: case1.data.id,
          createdAt: case1.data.createdAt,
          reference: 'reference',
          price: 2,
        }),
      NoStockUpdatedError
    );
    expect(case2.hasError).toBe(false);
  });

  it('should throw error if stock does not exist', async () => {
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.update({
          id: 'does not exist',
          createdAt: new Date().getTime(),
          reference: 'reference2',
        }),
      NoStockUpdatedError
    );
    expect(case2.hasError).toBe(true);
  });
});
