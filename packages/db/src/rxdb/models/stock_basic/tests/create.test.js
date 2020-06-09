/* eslint-disable */
'use strict';

import { NoStockCreatedError } from '../../../errors/stock';
import { getStockInstance, isErrorInstanceOf } from './common';
import { expect } from 'chai';

describe('create stock method', function() {
  let stockInstance;
  beforeAll(async () => {
    stockInstance = await getStockInstance();
  });

  it('should throw error if empty stock item is given when creating a new stock', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await stockInstance.create(),
      NoStockCreatedError
    );
    expect(case1.result).to.be.true;
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: '',
          brand: '',
          gender: '',
          size: 0,
          price: 0,
          amount: 0,
          colors: [],
        }),
      NoStockCreatedError
    );
    expect(case2.result).to.be.true;
  });

  it('should throw error if stock already exists', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: '1',
          price: 1,
        }),
      NoStockCreatedError
    );
    expect(case1.result).to.be.false;
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: '1',
          price: 1,
        }),
      NoStockCreatedError
    );
    expect(case2.result).to.be.true;
  });

  it('should throw error if reference is not an string', async () => {
    // Number
    const case1 = await isErrorInstanceOf(
      async () => await stockInstance.create({ reference: 2 }),
      NoStockCreatedError
    );
    expect(case1.result).to.be.true;
    // undefined
    const case2 = await isErrorInstanceOf(
      async () => await stockInstance.create({ reference: void 0 }),
      NoStockCreatedError
    );
    expect(case2.result).to.be.true;
    // Boolean
    const case3 = await isErrorInstanceOf(
      async () => await stockInstance.create({ reference: true }),
      NoStockCreatedError
    );
    expect(case3.result).to.be.true;
    // function
    const case4 = await isErrorInstanceOf(
      async () => await stockInstance.create({ reference: () => null }),
      NoStockCreatedError
    );
    expect(case4.result).to.be.true;
  });

  it('should throw error if no reference is given when creating an item', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          brand: 'brand',
          gender: 'man',
          size: 1,
          price: 1,
          amount: 2,
          colors: ['white'],
        }),
      NoStockCreatedError
    );
    expect(case1.result).to.be.true;
  });

  it('should throw error if no price is given when creating an item', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: '1',
          price: 0,
        }),
      NoStockCreatedError
    );
    expect(case1.result).to.be.true;
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: '2',
          price: -0.5,
        }),
      NoStockCreatedError
    );
    expect(case2.result).to.be.true;
    const case3 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: '3',
          brand: 'brand',
          gender: 'man',
          size: 1,
          amount: 2,
          colors: ['white'],
        }),
      NoStockCreatedError
    );
    expect(case3.result).to.be.true;
  });

  it('should create an item using a reference and a price', async function() {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: 'reference',
          price: 1,
        }),
      NoStockCreatedError
    );
    expect(case1.result).to.be.false;
    expect(case1.data).to.have.property('id');
    expect(case1.data).to.have.property('created_at');
    expect(case1.data).to.have.property('reference');
    expect(case1.data).to.have.property('price');
  });
});
