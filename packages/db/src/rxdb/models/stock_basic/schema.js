export default {
  title: 'stock schema',
  version: 0,
  description: 'describes an stock document',
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
    reference: {
      type: 'string',
      index: true,
      final: true,
    },
    brand: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    amount: {
      type: 'number',
    },
    desc: {
      type: 'string',
    },
    sold: {
      type: 'number',
      default: 0,
      index: true,
    },
  },
};
