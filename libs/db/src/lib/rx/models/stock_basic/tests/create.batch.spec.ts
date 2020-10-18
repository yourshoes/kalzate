import { NoStockCreatedError } from '../../../errors/stock';
import { getStockInstance, isErrorInstanceOf } from './common';

describe('create batch stock method', function() {
  let stockInstance;
  beforeEach(async () => {
    stockInstance = await getStockInstance();
  });

  it('should throw error if stock items is empty', async () => {
    const case1 = await isErrorInstanceOf(
      async () => await stockInstance.create([]),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(true);
  });
  // it('should throw error if any of the items is not a stock-schema compilant', async () => {
  //   const case1 = await isErrorInstanceOf(
  //     () =>
  //       stockInstance.create([
  //         {
  //           reference: 'reference787',
  //           price: 1,
  //         },
  //         null,
  //       ]),
  //     NoStockCreatedError
  //   );
  //   console.log(case1);
  //   expect(case1.hasError).to.be.true;

  //   const stockItems = await stockInstance.get();
  //   console.log(stockItems.total);
  //   expect(stockItems.total).toEqual(1);

  //   const case2 = await isErrorInstanceOf(
  //     () =>
  //       stockInstance.create([
  //         {
  //           reference: 'reference1',
  //           price: 1,
  //         },
  //         {
  //           reference: 'reference1',
  //           price: 1,
  //         },
  //       ]),
  //     NoStockCreatedError
  //   );
  //   expect(case2.hasError).to.be.false;
  //   const stockItems2 = await stockInstance.get();
  //   console.log(stockItems2.total);
  //   expect(stockItems.total).toEqual(2);
  // });

  it('should not throw error if any of the items is duplicated', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create([
          {
            reference: 'reference1',
            price: 1,
          },
          {
            reference: 'reference1',
            price: 1,
          },
        ]),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    const stockItems = await stockInstance.get();
    expect(stockItems.total).toEqual(1);
  });

  it('should not throw error if any of the items already exist', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: 'reference1',
          price: 1,
        }),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    let stockItems = await stockInstance.get();
    expect(stockItems.total).toEqual(1);
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create([
          {
            reference: 'reference2',
            price: 1,
          },
          {
            reference: 'reference1',
            price: 2,
          },
        ]),
      NoStockCreatedError
    );
    expect(case2.hasError).toBe(false);

    stockItems = await stockInstance.get();
    expect(stockItems.total).toEqual(2);
  });
  it('should not throw error and aggregate amount if any of the items already', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create({
          reference: 'reference1',
          price: 1,
          amount: 2,
        }),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    let stockItems = await stockInstance.get();
    expect(stockItems.total).toEqual(1);
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create([
          {
            reference: 'reference2',
            price: 1,
          },
          {
            reference: 'reference1',
            price: 2,
            amount: 3,
          },
        ]),
      NoStockCreatedError
    );
    expect(case2.hasError).toBe(false);

    stockItems = await stockInstance.get();
    expect(stockItems.total).toEqual(2);
    expect(stockItems.items.find(({ reference }) => reference === 'reference1').amount).toEqual(5);
  });
  it('should not throw error if stock items are correct', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create([
          {
            reference: 'reference2',
            price: 1,
          },
          {
            reference: 'reference3',
            price: 1,
          },
        ]),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    const stockItems = await stockInstance.get();
    expect(stockItems.total).toEqual(2);
  });
  it('should remove current stock if remove option is set to true', async () => {
    const case1 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create([
          {
            reference: 'reference1',
            price: 1,
          },
          {
            reference: 'reference2',
            price: 1,
          },
        ]),
      NoStockCreatedError
    );
    expect(case1.hasError).toBe(false);

    let stockItems = await stockInstance.get();
    expect(stockItems.total).toEqual(2);
    const case2 = await isErrorInstanceOf(
      async () =>
        await stockInstance.create(
          [
            {
              reference: 'reference1',
              price: 2,
            },
          ],
          { remove: true }
        ),
      NoStockCreatedError
    );
    expect(case2.hasError).toBe(false);
    stockItems = await stockInstance.get();
    expect(stockItems.total).toEqual(1);
    expect(stockItems.items[0].price).toEqual(2);
  });
});
