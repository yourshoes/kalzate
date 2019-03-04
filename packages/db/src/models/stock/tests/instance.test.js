/* eslint-disable */
'use strict';

import { expect } from 'chai';
import Stock, { Stock as StockModel } from 'models/stock';
import { NoDatabaseFoundError } from '../../../errors/db';
import { getStockInstance, isErrorInstanceOf } from './common';

describe('Stock instance', function() {
  it('should throw error if no rx database is given', async () => {
    //@todo waiting for https://github.com/chaijs/chai/issues/930
    //expect(e).to.be.an.error(NoDatabaseFoundError);
    // expect(async () => await Stock()).rejects.toEqual(
    //   new NoDatabaseFoundError()
    // );
    const case1 = await isErrorInstanceOf(async () => await Stock(), NoDatabaseFoundError);
    expect(case1.result).to.be.true;
  });

  it('should not throw error if rx database is given', async () => {
    const stockInstance = await getStockInstance();
    expect(stockInstance).to.be.an.instanceOf(StockModel);
  });
});
