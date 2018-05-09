/** ****************************************************************************/
/*                                                                             */
/*    SETTINGS CONSTANTS                                                       */
/*                                                                             */
/** ****************************************************************************/
export const DEFAULT_COUNTRY = 'spain';
export const DEFAULT_LOCALE = 'en';
export const DEFAULT_TIMEZONE = 'Europe/Madrid';
export const DEFAULT_NAME = 'Kalzate';
export const DEFAULT_THEME = 'monokai';
export const DEFAULT_EMAIL = 'zurisadai.pabon@gmail.com';
export const DEFAULT_PHONE = '+34610601389';
export const DEFAULT_PRINTER_NAME = 'TERMICA';
export const DEFAULT_BACKUP_FRECUENCY = 'daily';
export const DEFAULT_TICKET_TEMPLATE =
  '\r\n             SHOES STORE ${name}\r\n\r\n Address: ${address}\r\n Email: ${email}  Phone: ${phone}\r\n Ticket: ${code}  Date: ${date}\r\n\r\n------------------------------------------\r\n Item                   U.  PSP  Subtotal\r\n------------------------------------------\r\n${items}\r\n------------------------------------------\r\n                          TOTAL: ${total}\r\n                         (TAXES included)\r\n\r\n Method: ${payment}, Amount: ${payment_in}\r\n\r\n RETURNS ADMITTED BETWEEN ${date} AND ${date_return} \r\n\r\n *** THANKS FOR SHOPPING AT ${name} ***\r\n\r\n-   -   -   -   -   -   -   -   -   -   -';

export const DEFAULT_STOCK_ITEMS_LIMIT = 50;

export const COUNTRY_SETTING = 'country';
export const LANG_SETTING = 'lang';
export const THEME_SETTING = 'theme';
export const TIMEZONE_SETTING = 'timezone';
export const NAME_SETTING = 'name';
export const ADDRESS_SETTING = 'address';
export const EMAIL_SETTING = 'email';
export const PHONE_SETTING = 'phone';
export const PRINTER_NAME_SETTING = 'printerName';
export const PRINTER_IP_SETTING = 'printerIP';
export const TICKET_TEMPLATE_SETTING = 'ticketTemplate';
export const BACKUP_FRECUENCY_SETTING = 'backupFrecuency';
export const BACKUP_LOCATION_SETTING = 'backupLocation';
export const ANALYTICS_SERVER_SETTING = 'analyticsServer';

export const DEFAULT_SETTINGS = {
  [COUNTRY_SETTING]: DEFAULT_COUNTRY,
  [LANG_SETTING]: DEFAULT_LOCALE,
  [THEME_SETTING]: DEFAULT_THEME,
  [TIMEZONE_SETTING]: DEFAULT_TIMEZONE,
  [NAME_SETTING]: DEFAULT_NAME,
  [ADDRESS_SETTING]: '',
  [EMAIL_SETTING]: DEFAULT_EMAIL,
  [PHONE_SETTING]: DEFAULT_PHONE,
  [PRINTER_NAME_SETTING]: DEFAULT_PRINTER_NAME,
  [PRINTER_IP_SETTING]: '',
  [TICKET_TEMPLATE_SETTING]: DEFAULT_TICKET_TEMPLATE,
  [BACKUP_FRECUENCY_SETTING]: DEFAULT_BACKUP_FRECUENCY,
  [BACKUP_LOCATION_SETTING]: '',
  [ANALYTICS_SERVER_SETTING]: '',
};

/** ****************************************************************************/
/*                                                                             */
/*    PAYMENT CONSTANTS                                                        */
/*                                                                             */
/** ****************************************************************************/
export const PAYMENT_METHOD_CREDIT_CARD = 'payment_method_credit_card';
export const PAYMENT_METHOD_PHONE = 'payment_method_phone';
export const PAYMENT_METHOD_CASH = 'payment_method_cash';
export const PAYMENT_METHOD_TICKET = 'payment_method_ticket';
