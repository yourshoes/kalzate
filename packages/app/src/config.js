/** ****************************************************************************/
/*                                                                             */
/*    SETTINGS CONSTANTS                                                       */
/*                                                                             */
/** ****************************************************************************/
export const DEFAULT_COUNTRY = 'spain';
export const DEFAULT_LOCALE = 'en';
export const DEFAULT_TIMEZONE = 'Europe/Madrid';
export const DEFAULT_CURRENCY = '€';
export const DEFAULT_NAME = 'Kalzate';
export const DEFAULT_THEME = 'monokai';
export const DEFAULT_EMAIL = 'zurisadai.pabon@gmail.com';
export const DEFAULT_PHONE = '+34610601389';
export const DEFAULT_PRINTER_NAME = 'TERMICA';
export const DEFAULT_BACKUP_FRECUENCY = 'daily';
// export const DEFAULT_TICKET_TEMPLATE =
//   '\r\n             SHOES STORE ${info.name}\r\n\r\n Address: ${info.address}\r\n Email: ${info.email}\r\n Phone: ${info.phone}\r\n Date: ${_.dateFormat(ticket.date, "dd/mm/yyyy HH:MM")}\r\n\r\n Ticket: ${ticket.code}\r\n\r\n--------------------------------------------\r\n Item                   U.   PSP    Subtotal\r\n--------------------------------------------\r\n${ticket.items(({description, amount, price, subtotal}) => ` ${description}${amount}${price}${subtotal}`, {padding: {description: 23, amount: 5, price: 7, subtotal: 7}})}\r\n--------------------------------------------\r\n                          TOTAL: ${ticket.total}\r\n                         (TAXES included)\r\n\r\n Method: ${ticket.payment}, Amount: ${ticket.total_input}\r\n\r\n RETURNS ADMITTED BETWEEN ${_.dateFormat(ticket.date, "dd/mm/yyyy")} AND ${_.dateFormat(_.addDays(ticket.date, 15), "dd/mm/yyyy")} \r\n\r\n *** THANKS FOR SHOPPING AT ${info.name} ***\r\n\r\n-   -   -   -   -   -   -   -   -   -   -';
export const DB_OPTIONS = {};
export const DEFAULT_SCHEMA_TYPE = 'SCHEMA_BASIC';
export const DEFAULT_TICKET_TEMPLATE = `MY STORE {{shop name}}

  Address: {{shop address}}
  Email: {{shop email}}
  Phone: {{shop phone}}
  Date: {{ticket date "dd/mm/yyyy HH:MM"}}
 
  Ticket: {{ticket code}}
  Category: {{ticket category}}
 
 --------------------------------------------
  Item                   U.   PSP    Subtotal
 --------------------------------------------
 {{ticket items ["description", "amount", "price", "subtotal"] [23, 5, 7, 7] [1, 0]}}
 --------------------------------------------
                           TOTAL: {{ticket total}}
 
  Payment Methods: 
  {{ticket payment}}, 
  Amount: {{ticket given}},
  Return: {{ticket return}}
 
  RETURNS ADMITTED BETWEEN {{ticket date "dd/mm/yyyy"}} AND {{ticket return_date 15 "dd/mm/yyyy"}} 
 
  *** THANKS FOR SHOPPING AT {{shop name}} ***
 
 -   -   -   -   -   -   -   -   -   -   -`;

export const DEFAULT_STOCK_ITEMS_LIMIT = 50;
export const DEFAULT_DECIMAL_PLACES = 2;
export const DEFAULT_RETURN_TICKET_DAYS_ALLOWED = 15;
export const COUNTRY_SETTING = 'country';
export const CURRENCY_SETTING = 'currency';
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
  [CURRENCY_SETTING]: DEFAULT_CURRENCY,
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
export const PAYMENT_METHOD_VOUCHER = 'payment_method_voucher';

/** ****************************************************************************/
/*                                                                             */
/*    TICKETS CONSTANTS                                                        */
/*                                                                             */
/** ****************************************************************************/
export const TICKET_SAVE_STATE = 'TICKET_SAVE_STATE';
export const TICKET_SOLD_STATE = 'TICKET_SOLD_STATE';
export const TICKET_RETURN_STATE = 'TICKET_RETURN_STATE';

export const TICKET_POSITIVE_BALANCE = 'positive';
export const TICKET_NEGATIVE_BALANCE = 'negative';
export const DEFAULT_TICKET_ITEMS_LIMIT = 50;

export const ADD_ITEM_OPERATION = 'add';
export const RETURN_ITEM_OPERATION = 'return';
export const DISCOUNT_PERCENTAGE_TYPE = 'percentage';
export const DISCOUNT_FIXED_TYPE = 'fixed';

/** ****************************************************************************/
/*                                                                             */
/*    LOADING CONSTANTS                                                        */
/*                                                                             */
/** ****************************************************************************/
export const STATE_LOADING_START = 'ui/STATE_LOADING_START';
export const STATE_LOADING_DONE = 'ui/STATE_LOADING_DONE';
export const STATE_LOADING_FAILED = 'ui/STATE_LOADING_FAILED';
