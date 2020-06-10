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
  operations: [{
    operation: 'add',
    reference: 'reference',
    brand: 'brand',
    description: 'description',
    amount: 1,
    price: 23.75
  }],
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
