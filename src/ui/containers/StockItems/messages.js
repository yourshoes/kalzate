/*
 * StockItems Messages
 *
 * This contains all the text for the StockItems component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  notFound: {
    id: 'kz.containers.StockItems.notFound',
    defaultMessage: "Hey, Looks as there's no Items!",
  },
  notFoundHelp: {
    id: 'kz.containers.StockItems.notFoundHelp',
    defaultMessage: 'Try adding a new one or changing the searching criterias.',
  },
});
