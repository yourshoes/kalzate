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
    state: {
      type: 'string',
    },
    items: {
      type: 'array',
    },
    // total: {
    //   type: 'number',
    // },
    // totalIn: {
    //   type: 'number',
    // },
    // totalOut: {
    //   type: 'number',
    // },
    totalAmount: {
      type: 'string',
    },
    givenAmount: {
      type: 'string',
    },
    returnAmount: {
      type: 'string',
    },
    discount: {
      type: 'number',
    },
    tax: {
      type: 'number',
    },
    currency: {
      type: 'string',
    },
    method: {
      type: 'string',
    },
    next: {
      type: 'number',
    },
    prev: {
      type: 'number',
    },
    printed: {
      type: 'string',
    },
  },
  required: ['items', 'id', 'totalAmount', 'givenAmount', 'returnAmount', 'method'],
};
