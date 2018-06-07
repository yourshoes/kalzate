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
