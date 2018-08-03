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
  modalTitle: {
    id: 'kz.containers.StockItems.modal.title',
    defaultMessage: 'Drop stock file here',
  },
  modalDesc: {
    id: 'kz.containers.StockItems.modal.desc',
    defaultMessage: 'Use a csv, json or yaml file extension',
  },
  modalHelp: {
    id: 'kz.containers.StockItems.modal.help',
    defaultMessage: 'Need Help ? Download a stock file sample here',
  },
  modalLoading: {
    id: 'kz.containers.StockItems.modal.loading',
    defaultMessage: 'Please wait, I\'m on it',
  },
  modalOptionRemove: {
    id: 'kz.containers.StockItems.modal.option.remove',
    defaultMessage: 'Remove Current Stock',
  },
  modalOptionArchive: {
    id: 'kz.containers.StockItems.modal.option.archive',
    defaultMessage: 'Archive Current Stock',
  },
  paginationOf: {
    id: 'kz.containers.StockItems.pagination.of',
    defaultMessage: 'of',
  },
  reference: {
    id: 'kz.containers.StockItems.table.reference',
    defaultMessage: 'Reference',
  },
  brand: {
    id: 'kz.containers.StockItems.table.brand',
    defaultMessage: 'Brand',
  },
  gender: {
    id: 'kz.containers.StockItems.table.gender',
    defaultMessage: 'Gender',
  },
  color: {
    id: 'kz.containers.StockItems.table.color',
    defaultMessage: 'Color',
  },
  size: {
    id: 'kz.containers.StockItems.table.size',
    defaultMessage: 'Size',
  },
  price: {
    id: 'kz.containers.StockItems.table.price',
    defaultMessage: 'Price',
  },
  amount: {
    id: 'kz.containers.StockItems.table.amount',
    defaultMessage: 'Amount',
  },
});
