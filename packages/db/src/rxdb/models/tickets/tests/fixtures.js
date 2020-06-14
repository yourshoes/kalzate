
import { ADD_ITEM_OPERATION, RETURN_ITEM_OPERATION } from '../config';

export const validStockItem = {
  reference: 'reference',
  brand: 'brand',
  desc: 'description',
  amount: 10,
  price: 23.75
}

export const validAddOperation = {
  operation: ADD_ITEM_OPERATION,
  reference: 'reference',
  brand: 'brand',
  desc: 'description',
  amount: 1,
  price: 23.75,
}

export const validReturnOperation = {
  ...validAddOperation,
  operation: RETURN_ITEM_OPERATION,
}

export const validTicketDocument = {
  isChecked: true,
  isGift: false,
  isVoucher: false,
  balance: 'positive',
  prevNode: undefined,
  nextNode: undefined,
  payments: [{
    amount: 25,
    method: 'cash',
    concept: '',
  }],
  operations: [validAddOperation],
};

export const noOperationsTicketDocument = {
  isChecked: true,
  isGift: false,
  isVoucher: false,
  balance: 'positive',
  prevNode: undefined,
  nextNode: undefined,
  payments: [{
    amount: 25,
    method: 'cash',
    concept: '',
  }],
  operations: null,
};

export const noPaymentsTicketDocument = {
  isChecked: true,
  isGift: false,
  isVoucher: false,
  balance: 'positive',
  prevNode: undefined,
  nextNode: undefined,
  payments: null,
  operations: [{
    operation: 'add',
    reference: 'reference',
    brand: 'brand',
    description: 'description',
    amount: 1,
    price: 23.75
  }],
};
