import dateFormat from 'dateformat';
import lodash from 'lodash';
import {
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_PHONE,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_TICKET,
  TICKET_SOLD_STATE,
  TICKET_RETURN_STATE,
  DEFAULT_SCHEMA_TYPE,
} from 'config';

const compileTicketTemplateRegex = /{{([^{}]+)}}/g;
// const compileTicketParamsRegex = /\[([^[]+)\]|"([^"]+)"|([^ ]+)/g;
const compileTicketParamsRegex = /\[([^[]+)]|"((?:\\.|[^"\\])*)"|([^ ]+)/g;
const removeQuotesRegex = /"/g;

function abbrv(type, value) {
  switch (type) {
    case 'COLORS':
    case 'GENDER':
    case 'BRAND':
      return value ? value.substring(0, 3) : '';
    case 'DESC':
      return value ? value.substring(0, 10) : '';
    default:
      return value;
  }
}

function removeQuotes(str) {
  return str.replace(removeQuotesRegex, '');
}

function compileTicketReplacer(settings, ticket, str, match) {
  return compileTicketPrint(
    settings,
    ticket,
    ...match
      .match(compileTicketParamsRegex)
      .map((option) => (option.startsWith('"') ? removeQuotes(option) : option))
  );
}

function compileTicketPrint(settings, ticket, category, field, ...options) {
  if (category.toLowerCase() === 'shop') {
    return compileTicketPrintShopCase(settings, field.toLowerCase(), options);
  }
  if (category.toLowerCase() === 'ticket') {
    return compileTicketPrintTicketCase(ticket, field.toLowerCase(), options);
  }

  return '';
}

function compileTicketPrintShopCase(settings, field) {
  switch (field) {
    case 'name':
      return settings.name;
    case 'address':
      return settings.address;
    case 'email':
      return settings.email;
    case 'phone':
      return settings.phone;
    default:
      return '';
  }
}

function compileTicketPrintPreprocess(field, value, padding, item, ticket) {
  if (field === 'description') {
    return String(lodash.padEnd(formatDescription(item), parseInt(padding, 10)));
  }
  if (field === 'price') {
    return ticket.asGift
      ? lodash.padEnd('0.00', parseInt(padding, 10))
      : String(lodash.padEnd(value, parseInt(padding, 10)));
  }
  if (field === 'subtotal') {
    return ticket.asGift
      ? lodash.padEnd('0.00', parseInt(padding, 10))
      : String(lodash.padEnd(item.price * item.amount, parseInt(padding, 10)));
  }
  if (field === 'amount') {
    return String(
      lodash.padEnd(
        ticket.state === TICKET_RETURN_STATE && !item.added ? -item.amount_return : item.amount,
        parseInt(padding, 10)
      )
    );
  }
  return String(lodash.padEnd(value, parseInt(padding, 10)));
}

function compileTicketPrintTicketCase(ticket, field, options) {
  switch (field) {
    case 'date': {
      const [format] = options;
      const date = new Date(ticket.created_at);
      return dateFormat(date, format || 'dd/mm/yyyy');
    }
    case 'return_date': {
      const [days, format] = options;
      const date = new Date(ticket.created_at);
      date.setDate(date.getDate() + parseInt(days, 10));
      return dateFormat(date, format || 'dd/mm/yyyy');
    }
    case 'items': {
      const [fields, padding, paddingGlobal] = options.map((option) => JSON.parse(option));
      return ticket.items
        .map((item) => {
          const values = fields.map((f, i) =>
            compileTicketPrintPreprocess(f.toLowerCase(), item[f], padding[i], item, ticket)
          );

          return `${new Array(paddingGlobal[0] + 1).join(' ')}${values[0]}${values[1]}${values[2]}${
            values[3]
          }${new Array(paddingGlobal[1] + 1).join(' ')}`;
        })
        .join('\r\n ');
    }
    case 'payment':
      switch (ticket.method) {
        case PAYMENT_METHOD_CREDIT_CARD:
          return 'Credit Card';
        case PAYMENT_METHOD_PHONE:
          return 'Phone App';
        case PAYMENT_METHOD_CASH:
          return 'Cash';
        case PAYMENT_METHOD_TICKET:
          return 'Voucher';
        default:
          return '';
      }
    case 'code':
      return ticket.created_at;
    case 'id':
      return ticket.id;
    case 'given':
      return ticket.asGift ? '0.00' : ticket.givenAmount;
    case 'return':
      return ticket.asGift ? '0.00' : ticket.returnAmount;
    case 'total':
      return ticket.asGift ? '0.00' : ticket.totalAmount;
    case 'category':
      if (ticket.asGift) {
        return 'Gift';
      }
      if (ticket.asVoucher) {
        return 'Voucher';
      }
      if (ticket.state === TICKET_SOLD_STATE) {
        return 'Sell';
      }
      if (ticket.state === TICKET_RETURN_STATE) {
        return 'Return';
      }
      return 'Ticket';
    default:
      return '';
  }
}

export function compileTicket(settings, ticket) {
  try {
    return settings.ticketTemplate.replace(
      compileTicketTemplateRegex,
      compileTicketReplacer.bind(null, settings, ticket)
    );
  } catch (e) {
    console.error(e);
  }
}

export function formatDescription(item) {
  if (DEFAULT_SCHEMA_TYPE === 'SCHEMA_BASIC') {
    return `${abbrv('DESC', item.desc)}`;
  }
  return `${abbrv('BRAND', item.brand)}-${item.colors.map((c) => abbrv('COLORS', c)).join()} (${
    item.size
  }-${abbrv('BRAND', item.gender)})`;
}
