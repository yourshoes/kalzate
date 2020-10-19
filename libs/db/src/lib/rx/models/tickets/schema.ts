export default {
  title: 'tickets schema',
  version: 0,
  description: 'describes a ticket document',
  type: 'object',
  indexes: [
    "createdAt",
  ],
  properties: {
    createdAt: {
      type: 'number',
    },
    id: {
      type: 'string',
      primary: true,
      final: true,
    },
    isChecked: {
      type: 'boolean',
      default: false,
    },
    isGift: {
      type: 'boolean',
      default: false,
    },
    isVoucher: {
      type: 'boolean',
      default: false,
    },
    hasVoucherExpired: {
      type: 'boolean',
      default: false,
    },
    balance: {
      type: 'string',
    },
    prevNode: {
      type: 'string',
    },
    nextNode: {
      type: 'string',
    },
    payments: {
      type: 'array',
    },
    operations: {
      type: 'array',
    }
  },
  required: ['createdAt', 'id', 'payments', 'operations'],
};
