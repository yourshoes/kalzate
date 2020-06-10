export default {
  title: 'tickets schema',
  version: 0,
  description: 'describes a ticket document',
  type: 'object',
  properties: {
    created_at: {
      type: 'number',
      index: true,
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
  required: ['created_at', 'id', 'payments', 'operations'],
};
