import dateFormat from 'dateFormat';
import lodash from 'lodash';

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

export function compileTicket(info, ticket) {
  const utils = {
    dateFormat,
    lodash,
    addDays(date, days) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
  };
  return Function('_', 'info', 'ticket', `return \`${info.ticketTemplate}\`;`).call(null, utils, info, ticket);
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
