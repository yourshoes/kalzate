import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import CommonPage from '../../../pages/common/common-page';
import TicketsPage from '../../../pages/tickets/tickets-page';
import TicketsResultsPage from '../../../pages/tickets/tickets-results-page';
import StockPage from '../../../pages/stock/stock-page';
import { tickets } from '../../../common/selectors';

Given(/^I visit the tickets page$/, () => {
  CommonPage.clearDB();
  TicketsPage.visit();
});

And(/^I have stock$/, () => {
  StockPage.createNewItem({ ref: 'itemRefA', price: 10.0, amount: 10 });
  StockPage.createNewItem({ ref: 'itemRefB', price: 10.0, amount: 10 });
  StockPage.createNewItem({ ref: 'itemRefC', price: 30.0, amount: 10 });
});

When(/^I create a new ticket with some items from the stock$/, () => {
  TicketsPage.addItem('itemRefA', 1);
  TicketsPage.addItem('itemRefB', 2);
  TicketsPage.pay({ method: tickets.PAYMENT_METHOD_CREDIT_CARD, amount: 30 });
  TicketsPage.checkout();
  TicketsResultsPage.expectToHaveTickets(1);
});

Then(/^I can return it as a ticket voucher$/, () => {
  TicketsPage.openLastTicket();
  TicketsPage.returnItem('itemRefA', 1);
  TicketsPage.voucher();
  TicketsResultsPage.expectToHaveTickets(2);
});

And(/^I can create a new ticket and pay with the ticket voucher$/, () => {
  TicketsPage.openLastTicket();
  TicketsPage.returnItem('itemRefB', 2);
  TicketsPage.addItem('itemRefC', 1);
  TicketsPage.getLastTicketId((id) => {
    CommonPage.setGlobal('voucherId', id)
    TicketsPage.pay({ method: tickets.PAYMENT_METHOD_VOUCHER, amount: CommonPage.getGlobal('voucherId') });
    TicketsPage.checkout();
    TicketsResultsPage.expectToHaveTickets(3);
  });
});

And(/^I can create a new ticket but cannot pay again with the same ticket voucher$/, () => {
  TicketsPage.addItem('itemRefA', 1);
  TicketsPage.pay({ method: tickets.PAYMENT_METHOD_VOUCHER, amount: CommonPage.getGlobal('voucherId') });
  TicketsResultsPage.expectCheckoutButtonDisabled(true);
  TicketsPage.checkout();
  TicketsResultsPage.expectToHaveTickets(3);
});

Then(/^I can return some items and buy new ones for the same amount without paying$/, () => {
  TicketsPage.openLastTicket();
  TicketsPage.returnItem('itemRefA', 1);
  TicketsPage.addItem('itemRefB', 1);
  TicketsResultsPage.expectCheckoutButtonDisabled(false);
  TicketsPage.checkout();
  TicketsResultsPage.expectToHaveTickets(2);
});
