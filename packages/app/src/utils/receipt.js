

import dateFormat from 'dateformat';
import lodash from 'lodash';
import { ticketProvidedAmount, ticketTotalAmount, ticketExchangeAmount } from 'selectors/tickets';
import { formatDecimalPlaces, formatPrice, formatDescription, getSubtotal, getAmount } from 'utils/ticket';
import {
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_PHONE,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_TICKET,
  DEFAULT_RETURN_TICKET_DAYS_ALLOWED,
} from 'config';

const compileTicketTemplateRegex = /{{([^{}]+)}}/g;
// const compileTicketParamsRegex = /\[([^[]+)\]|"([^"]+)"|([^ ]+)/g;
const compileTicketParamsRegex = /\[([^[]+)]|"((?:\\.|[^"\\])*)"|([^ ]+)/g;
const removeQuotesRegex = /"/g;

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
    return compileTicketPrintTicketCase(settings, ticket, field.toLowerCase(), options);
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

function compileTicketPrintPreprocess(field, value, padding, operation, ticket) {
  if (field === 'description') {
    return String(lodash.padEnd(formatDescription(operation), parseInt(padding, 10)));
  }
  if (field === 'price') {
    return ticket.isGift
      ? lodash.padEnd('0.00', parseInt(padding, 10))
      : String(lodash.padEnd(formatDecimalPlaces(value), parseInt(padding, 10)));
  }
  if (field === 'subtotal') {
    return ticket.isGift
      ? lodash.padEnd('0.00', parseInt(padding, 10))
      : String(
        lodash.padEnd(
          formatDecimalPlaces(getSubtotal(operation)),
          parseInt(padding, 10)
        )
      );
  }
  if (field === 'amount') {
    return String(
      lodash.padEnd(getAmount(operation), parseInt(padding, 10))
    );
  }
  return String(lodash.padEnd(value, parseInt(padding, 10)));
}

function compileTicketPrintTicketCase(settings, ticket, field, options) {
  switch (field) {
    case 'date': {
      const [format] = options;
      const date = new Date(ticket.created_at || new Date().getTime());
      return dateFormat(date, format || 'dd/mm/yyyy');
    }
    case 'return_date': {
      const [days, format] = options;
      const date = new Date(ticket.created_at || new Date().getTime());
      date.setDate(date.getDate() + parseInt(days, DEFAULT_RETURN_TICKET_DAYS_ALLOWED));
      return dateFormat(date, format || 'dd/mm/yyyy');
    }
    case 'items': {
      const [fields, padding, paddingGlobal] = options.map((option) => JSON.parse(option));
      console.log('util', ticket);
      return ticket.operations
        .map((operation) => {
          const values = fields.map((f, i) =>
            compileTicketPrintPreprocess(f.toLowerCase(), operation[f], padding[i], operation, ticket)
          );

          return `${new Array(paddingGlobal[0] + 1).join(' ')}${values[0]}${values[1]}${values[2]}${
            values[3]
            }${new Array(paddingGlobal[1] + 1).join(' ')}`;
        })
        .join('\r\n ');
    }
    case 'payment':
      return ticket.payments
        .map(payment => {
          switch (payment.method) {
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
        })
        .join('\r\n ');

    case 'code':
      return ticket.created_at || ticket.id || '1111111111111';
    case 'id':
      return ticket.id;
    case 'given':
      return ticket.isGift ? '0.00' : formatPrice(ticketProvidedAmount({ ticket }));
    case 'return':
      return ticket.isGift ? '0.00' : formatPrice(ticketExchangeAmount({ ticket }));
    case 'total':
      return ticket.isGift ? '0.00' : formatPrice(ticketTotalAmount({ ticket }));
    case 'category':
      if (ticket.isGift) {
        return 'Gift';
      }
      if (ticket.isVoucher) {
        return 'Voucher';
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


