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
  StockPage.createNewItem({ ref: 'itemRef', price: 27.5, amount: 5 });
  StockPage.createNewItem({ ref: 'itemRef2', price: 10.0, amount: 5 });
});

When(/^I create a new ticket with some items from the stock$/, () => {
  TicketsPage.addItem('itemRef');
  TicketsPage.addItem('itemRef2');
});

And(/^I pay the ticket with a payment method$/, () => {
  TicketsPage.pay({ method: tickets.PAYMENT_METHOD_CASH, amount: 40 });
});

Then(/^I can sell the ticket$/, () => {
  TicketsPage.checkout();
});

And(/^I can return the ticket items$/, () => {
  TicketsPage.openLastTicket();
  TicketsPage.returnItem('itemRef');
});

Then(/^I can get a ticket voucher$/, () => {
  TicketsPage.voucher();
  TicketsResultsPage.expect().toHaveItems(2);
});

And(/^I can save the ticket$/, () => {
  TicketsPage.save();
  TicketsPage.newTicket();
});

And(/^I create a new ticket with one item from the stock$/, () => {
  TicketsPage.addItem('itemRef');
});

Then(/^I can open back the saved ticket$/, () => {
  TicketsPage.openLastTicket();
  TicketsResultsPage.expect().toHaveItems(1);
});
