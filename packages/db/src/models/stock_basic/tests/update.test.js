/* eslint-disable */
'use strict';

import { NoStockCreatedError, NoStockUpdatedError } from '../../../errors/stock';
import { getStockInstance, isErrorInstanceOf } from './common';
import { expect } from 'chai';

describe('update stock method', function() {
  let stockInstance;
  beforeAll(async () => {
    stockInstance = await getStockInstance();
  });

  it('should throw error if empty stock item is given when updating a new stock', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await stockInstance.update(),
      NoStockUpdatedError
    );
    expect(case1.result).to.be.true;
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.update({
          id: '',
          created_at: 0,
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
    expect(case2.result).to.be.true;
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
    expect(case1.result).to.be.false;
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.update({
          id: case1.data.id,
          created_at: case1.data.created_at,
          reference: 'reference2',
        }),
      NoStockUpdatedError
    );
    expect(case2.result).to.be.false;
  });

  it('should throw error if stock does not exist', async () => {
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.update({
          id: 'does not exist',
          created_at: new Date().getTime(),
          reference: 'reference2',
        }),
      NoStockUpdatedError
    );
    expect(case2.result).to.be.true;
  });
});
