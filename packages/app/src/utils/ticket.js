import {
  DEFAULT_DECIMAL_PLACES,
  ADD_ITEM_OPERATION,
  RETURN_ITEM_OPERATION,
  DISCOUNT_PERCENTAGE_TYPE,
  DISCOUNT_FIXED_TYPE,
  DEFAULT_SCHEMA_TYPE,
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_VOUCHER
} from 'config';

export const formatDecimalPlaces = (number, decimals = DEFAULT_DECIMAL_PLACES) => number.toFixed(decimals);

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

export function formatDescription(item) {
  if (DEFAULT_SCHEMA_TYPE === 'SCHEMA_BASIC') {
    return `${abbrv('DESC', item.desc)}`;
  }
  return `${abbrv('BRAND', item.brand)}-${item.colors.map((c) => abbrv('COLORS', c)).join()} (${
    item.size
    }-${abbrv('BRAND', item.gender)})`;
}

export const getAmount = ({ operation, amount }) => {
  if (operation === ADD_ITEM_OPERATION) {
    return amount
  }

  if (operation === RETURN_ITEM_OPERATION) {
    return - amount
  }
}

export const getSubtotal = ({ operation, amount, price, discountType, discountValue }) => {
  let subtotal = amount * price;

  if (discountType === DISCOUNT_PERCENTAGE_TYPE) {
    subtotal *= (1 - discountValue / 100);
  }
  else if (discountType === DISCOUNT_FIXED_TYPE) {
    subtotal -= discountValue;
  }

  if (subtotal > (amount * price) || subtotal <= 0) {
    return 0;
  }

  if (operation === ADD_ITEM_OPERATION) {
    return subtotal
  }

  if (operation === RETURN_ITEM_OPERATION) {
    return - subtotal
  }

  throw new Error(`operation type "${operation}" unknown, use "${ADD_ITEM_OPERATION}" or "${RETURN_ITEM_OPERATION}"`)
}

const getPaymentAmount = (payments, paymentMethod) => {
  const payment = payments.find(({ method }) => method === paymentMethod);
  if (payment) {
    return payment.amount;
  }
  return null;
}

export const getCreditCardPaymentAmount = (payments) =>
  getPaymentAmount(payments, PAYMENT_METHOD_CREDIT_CARD);

export const getCashPaymentAmount = (payments) =>
  getPaymentAmount(payments, PAYMENT_METHOD_CASH);

export const getVoucherPaymentAmount = (payments) =>
  getPaymentAmount(payments, PAYMENT_METHOD_VOUCHER);


