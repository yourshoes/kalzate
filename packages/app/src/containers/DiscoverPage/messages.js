/*
 * WorkSpacePage Messages
 *
 * This contains all the text for the WorkSpacePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  salesTitle: {
    id: 'kz.containers.Discover.salesTitle',
    defaultMessage: 'Sales Chart',
  },
  salesDesc: {
    id: 'kz.containers.Discover.salesDesc',
    defaultMessage: 'The sales chart renders the total incoming made (y axis) per day (x axis)',
  },
  salesNoData: {
    id: 'kz.containers.Discover.salesNoData',
    defaultMessage: 'No enough data to display the sales chart',
  },
  salesNoDataDesc: {
    id: 'kz.containers.Discover.salesNoDataDesc',
    defaultMessage: 'Please, create some tickets to display it',
  },

  ticketsTitle: {
    id: 'kz.containers.Discover.ticketsTitle',
    defaultMessage: 'Tickets Chart',
  },
  ticketsDesc: {
    id: 'kz.containers.Discover.ticketsDesc',
    defaultMessage:
      'The tickets chart renders ticket aggregaation values including the maximum, minimum, third quartile, median and first quartile (y axis) per day (x axis)',
  },
  ticketsNoData: {
    id: 'kz.containers.Discover.ticketsNoData',
    defaultMessage: 'No enough data to display the tickets chart',
  },
  ticketsNoDataDesc: {
    id: 'kz.containers.Discover.ticketsNoDataDesc',
    defaultMessage: 'Please, create some tickets to display it',
  },
  stockTitle: {
    id: 'kz.containers.Discover.stockTitle',
    defaultMessage: 'Stock Chart',
  },
  stockInfo: {
    id: 'kz.containers.Discover.stockInfo',
    defaultMessage: 'Stock Info',
  },
  stockDesc: {
    id: 'kz.containers.Discover.stockDesc',
    defaultMessage:
      'The stock chart renders the relationship between the price (y axis) and the number of items sold (x axis). The radius is the amount of items available',
  },
  stockNoData: {
    id: 'kz.containers.Discover.stockNoData',
    defaultMessage: 'No enough data to display the stock chart',
  },
  stockNoDataDesc: {
    id: 'kz.containers.Discover.stockNoDataDesc',
    defaultMessage: 'Please, upload stock data in order to display it',
  },

  alertTitle: {
    id: 'kz.containers.Discover.alertTitle',
    defaultMessage: 'Alert Stock Chart',
  },
  alertDesc: {
    id: 'kz.containers.Discover.alertDesc',
    defaultMessage:
      'The alert chart renders the top stock items more sold, the top stock items less sold and the items with no available stock',
  },
  alertNoData: {
    id: 'kz.containers.Discover.alertNoData',
    defaultMessage: 'No enough data to display the alert chart',
  },
  alertNoDataDesc: {
    id: 'kz.containers.Discover.alertNoDataDesc',
    defaultMessage: 'Please, upload stock data in order to display it',
  },
  alertTopSold: {
    id: 'kz.containers.Discover.alertTopSold',
    defaultMessage: 'Top Sold',
  },
  alertTopLessSold: {
    id: 'kz.containers.Discover.alertTopLessSold',
    defaultMessage: 'Top Less Sold',
  },
  alertEmptyStock: {
    id: 'kz.containers.Discover.alertEmptyStock',
    defaultMessage: 'Empty Stock',
  },
});
