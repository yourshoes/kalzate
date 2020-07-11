const validateLocalStrategyProperty = '';
const validateLocalStrategyPassword = '';
export default {
  title: 'employee schema',
  version: 0,
  description: 'describes a employee',
  type: 'object',
  properties: {
    firstname: {
      type: 'string',
      trim: true,
      validate: [
        validateLocalStrategyProperty,
        'Introduce tu nombre de usuario',
      ],
      match: [
        /^[a-zA-Z]([a-zA-Z ])*$/,
        'El nombre de usuario debe ser así: nombre.apellido',
      ],
    },
    lastname: {
      type: 'string',
      trim: true,
      match: [
        /^[a-zA-Z]([a-zA-Z ])*$/,
        'El nombre de usuario debe ser así: nombre.apellido',
      ],
    },
    username: {
      type: 'string',
      trim: true,
      primary: true,
      validate: [
        validateLocalStrategyProperty,
        'Introduce tu nombre de usuario',
      ],
      match: [
        /^([a-zA-Z]+)(\.([a-zA-Z]+))?$/,
        'El nombre de usuario debe ser así: nombre.apellido',
      ],
    },
    email: {
      type: 'string',
      unique: true,
      lowercase: true,
      trim: true,
      validate: [
        validateLocalStrategyProperty,
        'Introduce tu correo electrónico',
      ],
      match: [/.+@.+\..+/, 'Ojú... una dirección de correo!'],
    },
    password: {
      type: 'string',
      trim: true,
      encrypted: true,
      validate: [
        validateLocalStrategyPassword,
        'La contraseña tiene que ser mas larguita',
      ],
    },
    role: {
      type: 'role',
      trim: true,
      validate: [validateLocalStrategyProperty, 'No has asignado ningún rol'],
      match: [
        /^[a-zA-Z]+$/,
        'El nombre de usuario debe ser así: nombre.apellido',
      ],
    },
    phone: {
      type: 'string',
      trim: true,
    },
    actived: {
      type: 'boolean',
      default: true,
    },
    // ISO 639-2
    locale: {
      type: 'string',
      default: 'es',
    },
    signin_datetime: {
      type: 'date',
      default: new Date(),
    },
    signin_ip: {
      type: 'string',
      default: '0.0.0.0',
    },
    signin_ua: {
      type: 'string',
      default: '',
    },
    forgot_code: {
      type: 'string',
    },
    forgot_code_expiration_datetime: {
      type: 'string',
    },
    salt: {
      type: 'string',
    },
    provider: {
      type: 'string',
    },
    name: {
      type: 'string',
      primary: true,
    },
    secret: {
      type: 'string',
      encrypted: true,
    },
    skills: {
      type: 'array',
      maxItems: 5,
      uniqueItems: true,
      item: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          damage: {
            type: 'number',
          },
        },
      },
    },
  },
  required: ['firstname', 'username', 'email', 'password', 'locale', 'role'],
};
