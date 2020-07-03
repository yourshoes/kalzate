import {
  DEFAULT_DECIMAL_PLACES,
  ADD_ITEM_OPERATION,
  REMOVE_ITEM_OPERATION,
  DISCOUNT_PERCENTAGE_TYPE,
  DISCOUNT_FIXED_TYPE,
  DEFAULT_SCHEMA_TYPE,
  PAYMENT_METHOD_CREDIT_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_VOUCHER,
  DEFAULT_CURRENCY
} from 'config';

export const formatDecimalPlaces = (number, decimals = DEFAULT_DECIMAL_PLACES) => number.toFixed(decimals);

export function formatPrice(amount, currency = DEFAULT_CURRENCY) {
  return `${formatDecimalPlaces(amount)}${currency}`;
}

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

  if (operation === REMOVE_ITEM_OPERATION) {
    return - amount
  }
}

export const getSubtotal = ({ stock, operation, amount, discountType, discountValue }) => {
  if (!operation) {
    return 0;
  }

  let subtotal = amount * stock.price;

  if (discountType === DISCOUNT_PERCENTAGE_TYPE) {
    subtotal *= (1 - discountValue / 100);
  }
  else if (discountType === DISCOUNT_FIXED_TYPE) {
    subtotal -= discountValue;
  }

  if (subtotal > (amount * stock.price) || subtotal <= 0) {
    return 0;
  }

  if (operation === ADD_ITEM_OPERATION) {
    return subtotal
  }

  if (operation === REMOVE_ITEM_OPERATION) {
    return - subtotal
  }

  throw new Error(`operation type "${operation}" unknown, use "${ADD_ITEM_OPERATION}" or "${REMOVE_ITEM_OPERATION}"`)
}

const getPaymentAmount = (payments, paymentMethod, field = 'amount') => {
  const payment = payments.find(({ method }) => method === paymentMethod);
  if (payment) {
    return payment[field];
  }
  return null;
}

export const getCreditCardPaymentAmount = (payments) =>
  getPaymentAmount(payments, PAYMENT_METHOD_CREDIT_CARD);

export const getCashPaymentAmount = (payments) =>
  getPaymentAmount(payments, PAYMENT_METHOD_CASH);

export const getVoucherPaymentAmount = (payments) =>
  getPaymentAmount(payments, PAYMENT_METHOD_VOUCHER);

export const getVoucherPaymentConcept = (payments) =>
  getPaymentAmount(payments, PAYMENT_METHOD_VOUCHER, 'concept');

export const parseOperations = (history, operations) => {

  // Merge all history operations as an object 
  // composing previousAddedAmount & previousRemovedAmount fields
  // which contains all previous sold and returned amounts so far
  const mergedOperations = history.reduce((acc, { stock, discountValue,
    discountType, operation, amount }) => {
    const existingOperation = acc[stock.reference];
    if (existingOperation) {
      return {
        ...acc,
        [stock.reference]: {
          ...existingOperation,
          ...(operation === ADD_ITEM_OPERATION && {
            previousAddedAmount: amount + existingOperation.previousAddedAmount
          }),
          ...(operation === REMOVE_ITEM_OPERATION && {
            previousRemovedAmount: amount + existingOperation.previousRemovedAmount
          })
        }
      };
    }

    return {
      ...acc,
      [stock.reference]: {
        stock,
        discountValue,
        discountType,
        addedAmount: 0,
        removedAmount: 0,
        previousAddedAmount: 0,
        previousRemovedAmount: 0,
        ...(operation === ADD_ITEM_OPERATION && { previousAddedAmount: amount }),
        ...(operation === REMOVE_ITEM_OPERATION && {
          previousRemovedAmount: amount
        })
      }
    };
  }, {});

  // Add the current amount and return fields with the info
  // about current s
  for (let { stock, discountValue,
    discountType, operation, amount } of operations) {

    const currentOperation = mergedOperations[stock.reference];

    if (currentOperation) {
      mergedOperations[stock.reference] = {
        ...currentOperation,
        discountValue,
        discountType,
        ...(operation === ADD_ITEM_OPERATION && { addedAmount: amount + currentOperation.addedAmount, operation }),
        ...(operation === REMOVE_ITEM_OPERATION && {
          removedAmount: amount + currentOperation.removedAmount,
          operation
        })
      };
    }
    else {
      mergedOperations[stock.reference] = {
        stock,
        discountValue,
        discountType,
        isNewEntry: true,
        addedAmount: 0,
        removedAmount: 0,
        ...(operation === ADD_ITEM_OPERATION && { addedAmount: amount }),
        ...(operation === REMOVE_ITEM_OPERATION && {
          removedAmount: amount
        }),
        operation: ADD_ITEM_OPERATION,
        previousAddedAmount: 0,
        previousRemovedAmount: 0
      };
    }

  }

  return Object.values(mergedOperations);
}

export const marshallTicket = ({
  isChecked,
  isGift,
  isVoucher,
  balance,
  prevNode,
  payments,
  operations }) => ({
    isChecked,
    isGift,
    isVoucher,
    balance,
    prevNode,
    payments,
    operations
  })