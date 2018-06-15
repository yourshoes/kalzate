import dateFormat from 'dateFormat';
import lodash from 'lodash';
import {
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_PHONE,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_TICKET,
} from 'ui/constants';

export function Option(ifNotNull, ifNull) {
  if (!lodash.isEmpty(ifNotNull)) return ifNotNull;

  return ifNull;
}

export function getLangItems(appLocales, locale) {
  return Object.keys(appLocales).map((lang) => ({
    value: lang,
    title: appLocales[lang],
    marked: lang === locale,
  }));
}

export function platformKeySymbols(key, platform = window.navigator.platform) {
  const platformName = platform.toLowerCase();
  switch (key) {
    case 0: // ALT
      return platformName.includes('mac') ||
        platformName.includes('iphone') ||
        platformName.includes('ipad')
        ? '⌥'
        : 'Alt-';
    default:
      return key;
  }
}

export function compileTicket(info, { _data }) {
  const ticket = _data;
  console.log('>>>', info, ticket);
  const utils = {
    dateFormat,
    addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    },
  };
  const ticketInterface = {
    code: ticket.created_at,
    date: new Date(ticket.created_at),
    id: ticket.id,
    total: ticket.totalAmount,
    total_input: ticket.givenAmount,
    total_output: ticket.returnAmount,
    items(fn) {
      return ticket.items.map((item) => fn({ description: `${item.brand}`, price: Number(item.price).toFixed(2), amount: item.amount, subtotal: (item.price * item.amount).toFixed(2) })).join('');
    },
    payment: (function () {
      switch (ticket.method) {
        case PAYMENT_METHOD_CREDIT_CARD:
          return 'Credit Card';
        case PAYMENT_METHOD_PHONE:
          return 'Phone App';
        case PAYMENT_METHOD_CASH:
          return 'Cash';
        case PAYMENT_METHOD_TICKET:
          return 'Voucher';
        default: return '';
      }
    }()),

  };
  return Function('_', 'info', 'ticket', `return \`${info.ticketTemplate}\`;`).call(null, utils, info, ticketInterface);
}

export function isRealNumeric(input) {
  return /^[0-9]{1,3}\.*?[0-9]*$/.test(input);
}

const dotRegex = /\.+/;
export function toFixed(num, fixed = 2, lastValid = '') {
  console.log('...', num);

  if (!num) {
    return '0.00';
  }
  const numString = String(num).replace(dotRegex, '.').replace(' €', '').trim();

  console.log('...', numString);
  // nothing before dot
  if (numString.startsWith('.')) {
    return '0.00';
  }

  if (!isRealNumeric(num)) {
    return lastValid;
  }


  // no dot
  if (numString.indexOf('.') < 0) {
    return `${numString}.00`;
  }
  // no number after dot
  if (numString.indexOf('.') === numString.length - 1) {
    return `${numString}.00`;
  }
  // just one number after dot
  if ((numString.length - 1 - numString.indexOf('.')) === 1) {
    return `${numString}0`;
  }
  // at least two numbers after dot
  return numString.slice(0, (numString.indexOf('.')) + fixed + 1);
}
