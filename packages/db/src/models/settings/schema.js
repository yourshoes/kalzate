export default {
  title: 'settings schema',
  version: 0,
  description: 'describes the settings',
  type: 'object',
  properties: {
    key: {
      type: 'string',
      primary: true
    },
    value: {
      type: 'string',
    }
  }
};
