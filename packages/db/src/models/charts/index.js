/**
 * Use mongo as model
 */

import { isRxCollection, isRxDatabase } from 'rxdb';
import { groupBy, toPairs, min, max, mean, size, zipWith } from 'lodash';

class Charts {
  TOP_TEN_LIMIT = 10;

  constructor(db, stock, ticket) {
    if (!isRxDatabase(db)) {
      throw new Error('A valid RxDatabase is required!');
    }
    if (!isRxCollection(stock.collection) || !isRxCollection(ticket.collection)) {
      throw new Error('A valid RxCollection is required!');
    }
    this.db = db;
    this.stock = stock;
    this.ticket = ticket;
  }

  /**
   * @method init
   * return latest charts data
   * @return {Promise} a promise which resolves to charts data
   */
  async init() {
    try {
      return {
        salesChart: await this.salesData(),
        ticketsChart: await this.ticketsData(),
        stockChart: await this.stockData(),
        alertChart: await this.alertData(),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @method salesData
   * return latest five days sales amount
   * @param {array|object} options
   * @return {Promise} a promise which resolves to [{date: 'day1', amount: 'amount1'}, {date: 'day2', amount: 'amount2'}, {date: 'day3', amount: 'amount3'}, {date: 'day4', amount: 'amount4'}, {date: 'day5', amount: 'amount5'}]
   * @example
    [
      { day: 'Mon', amount: '200.56' },
      { day: 'Tue', amount: '153.94' },
      { day: 'Wed', amount: '208.56' },
      { day: 'Thu', amount: '501.89' },
      { day: 'Fri', amount: '377.89' },
      { day: 'Sat', amount: '177.89' },
      { day: 'Sun', amount: '277.89' },
    ]
   */
  async salesData(options = { range: 'week' }) {
    try {
      const weeklyTickets = await this.ticket.query(this.ticket.queries.weeklyTickets());
      return toPairs(
        groupBy(weeklyTickets.items, (ticket) => new Date(ticket.created_at).toLocaleDateString())
      ).map(([day, tickets]) => ({
        day,
        amount: tickets.reduce((amount, ticket) => amount + Number(ticket.totalAmount), 0),
      }));
      // Get latest week tickets (it is cached so next times it has just to calculate current day sales)
    } catch (e) {
      // throw new Error(e, options);
      return [];
    }
  }

  /**
   * @method ticketsData
   * return tickets data aggregation vaues as minimum, maximun, median, average, first quartile and third quartile
   * @param {array|object} options
   * @return {Promise}
   * @example
    [
      { day: 'Mon', minimum: '14', maximum: '65', median: '33', quartile1: '20', quartile3: '35' },
      { day: 'Tue', minimum: '25', maximum: '73', median: '25', quartile1: '25', quartile3: '30' },
      { day: 'Wed', minimum: '15', maximum: '40', median: '25', quartile1: '17', quartile3: '28' },
      { day: 'Thu', minimum: '18', maximum: '55', median: '33', quartile1: '28', quartile3: '42' },
      { day: 'Fri', minimum: '14', maximum: '66', median: '35', quartile1: '22', quartile3: '45' },
      { day: 'Sat', minimum: '22', maximum: '70', median: '34', quartile1: '28', quartile3: '42' },
      { day: 'Sun', minimum: '14', maximum: '65', median: '33', quartile1: '30', quartile3: '50' },
    ]
   */
  async ticketsData(options = { range: 'week' }) {
    try {
      const weeklyTickets = await this.ticket.query(this.ticket.queries.weeklyTickets());
      const groupByTickets = toPairs(
        groupBy(weeklyTickets.items, (ticket) => new Date(ticket.created_at).toLocaleDateString())
      );

      return groupByTickets.map(([day, tickets]) => {
        const ticketsTotalAmounts = tickets.map((ticket) => Number(ticket.totalAmount));

        if (size(ticketsTotalAmounts) === 1) {
          return {
            day,
            minimum: ticketsTotalAmounts[0],
            maximum: ticketsTotalAmounts[0],
            average: ticketsTotalAmounts[0],
            median: ticketsTotalAmounts[0],
            quartile1: ticketsTotalAmounts[0],
            quartile3: ticketsTotalAmounts[0],
          };
        }

        const minimum = min(ticketsTotalAmounts);
        const maximum = max(ticketsTotalAmounts);
        const average = mean(ticketsTotalAmounts);
        const { median, position, sorted: ticketsTotalAmountsSorted } = this.median(
          ticketsTotalAmounts
        );
        const { median: quartile1 } = this.median(ticketsTotalAmountsSorted.slice(0, position));
        const { median: quartile3 } = this.median(ticketsTotalAmountsSorted.slice(position));

        return {
          day,
          minimum,
          maximum,
          average,
          median,
          quartile1,
          quartile3,
        };
      });
      // Get latest week tickets (it is cached so next times it has just to calculate current day sales)
    } catch (e) {
      // throw new Error(e, options);
      return [];
    }
  }

  /**
     * @method stockData
     * @return {Promise}
     * @example
      [
        { amount: 0, price: '0', sold: 0, title: 'Brand1' },
        { amount: 50, price: '30', sold: 200, title: 'Brand1' },
        { amount: 50, price: '0', sold: 70, title: 'Brand1' },
        { amount: 50, price: '20.56', sold: 0, title: 'Brand1' },
        { amount: 50, price: '20.56', sold: 111, title: 'Brand1' },
        { amount: 30, price: '10.56', sold: 200, title: 'Brand2' },
        { amount: 30, price: '30.00', sold: 10, title: 'Brand3' },
        { amount: 300, price: '30.00', sold: 10, title: 'Brand3' },
        { amount: 60, price: '15.90', sold: 160, title: 'Brand4' }
      ]
     */
  async stockData() {
    try {
      const { items: stockItems } = await this.stock.query(this.stock.queries.fullStock());

      // @todo group by brand ?
      return stockItems.map((stockItem) => ({
        amount: stockItem.amount,
        price: stockItem.price,
        sold: stockItem.sold,
        title: this.stock.formatDescription(stockItem),
      }));
    } catch (e) {
      // throw new Error(e, options);
      return [];
    }
  }

  /**
     * @method alertData
     * @return {Promise}
     * @example
      [
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
        { sold: 'BRAND-DESC-TOP-SOLD', notSold: 'BRAND-DESC-NOT-SOLD', emptyStock: 'BRAND-DESC-NO-STOCK', alertStock: 'BRAND-DESC-FEW-STOCK' },
      ]
     */
  async alertData() {
    try {
      // const { items: topSoldStockItems } = await this.stock.query(this.stock.queries.topSold());
      const topSoldStockItems = await this.stock.collection
        .find()
        .where('sold')
        .gt(0)
        .limit(this.TOP_TEN_LIMIT)
        .sort('-sold')
        .exec();
      // const { items: topNotSoldStockItems } = await this.stock.query(this.stock.queries.topNotSold());
      const topNotSoldStockItems = await this.stock.collection
        .find()
        .where('sold')
        .gt(0)
        .limit(this.TOP_TEN_LIMIT)
        .sort('sold')
        .exec();
      const { items: topEmptyStockItems } = await this.stock.query(
        this.stock.queries.topEmptyStock()
      );

      console.log(topSoldStockItems, topNotSoldStockItems, topEmptyStockItems);
      if (!size(topSoldStockItems) && !size(topNotSoldStockItems) && !size(topEmptyStockItems))
        return [];
      return zipWith(
        topSoldStockItems,
        topNotSoldStockItems,
        topEmptyStockItems,
        (soldItem = '', notSoldItem = '', emptyStockItem = '') => ({
          sold: soldItem ? this.stock.formatDescription(soldItem) : '',
          notSold: notSoldItem ? this.stock.formatDescription(notSoldItem) : '',
          emptyStock: emptyStockItem ? this.stock.formatDescription(emptyStockItem) : '',
        })
      );
    } catch (e) {
      console.log(e);
      // throw new Error(e, options);
      return [];
    }
  }

  /** ***************************************************** */
  /*                  PRIVATE METHODS                      */
  /** ***************************************************** */
  median(list) {
    const sortedList = list.sort((a, b) => a - b);
    const medianIndex = Math.floor((size(sortedList) + 1) / 2);
    if (!sortedList[medianIndex])
      return { median: sortedList[0], position: medianIndex, sorted: sortedList };
    return { median: sortedList[medianIndex], position: medianIndex, sorted: sortedList };
  }
}

export default async function(db, stockInstance, ticketInstance) {
  // Create or Retrieve collection first
  // const stockInstance = await Stock(db, schema);
  // const ticketInstance = await Ticket(db, schema);

  // Return an Tickets instance
  return new Charts(db, stockInstance, ticketInstance);
}
