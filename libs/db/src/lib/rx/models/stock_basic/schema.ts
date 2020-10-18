export default {
  title: 'stock basic schema',
  version: 0,
  description: 'describes an stock document',
  type: 'object',
  indexes: [
    "createdAt",
    "reference",
    "sold"
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
    reference: {
      type: 'string',
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
    },
  },
};

/**
 * Extended fields
 * reference: {
      type: 'string',
      primary: true,
    },
    brand: {
      type: 'string',
    },
    size: {
      type: 'number',
    },
    colors: {
      type: 'array',
    },
    price: {
      type: 'number',
      default: 0,
    },
    amount: {
      type: 'number',
      default: 0,
    },
    gender: {
      type: 'string',
    },
    season: {
      type: 'string',
    },
    manufacturer: {
      type: 'string',
    },
    vendor: {
      type: 'string',
    },
    pictures: {
      type: 'array',
    },
    location: {
      type: 'string',
    },
    qrcode: {
      type: 'string',
    },
    barcode: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    actived: {
      type: 'boolean',
      default: true,
    },
    keywords: {
      type: 'string',
    },
    rating: {
      type: 'number',
      default: 0,
    },
    notes: {
      type: 'array',
    },
    created_at: {
      type: 'string',
      default: new Date().toISOString(),
    },
    last_updated_at: {
      type: 'string',
    },
    last_sold_at: {
      type: 'string',
    },
    last_bought_at: {
      type: 'string',
    },
    times_sold: {
      type: 'number',
      default: 0,
    },
    times_bought: {
      type: 'number',
      default: 0,
    },
 */