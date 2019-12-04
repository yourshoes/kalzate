import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import TicketsPage from '../../../pages/tickets/tickets-page';
import StockPage from '../../../pages/stock/stock-page';

Given(/^I visit the tickets page$/, () => {
  TicketsPage.visit();
  StockPage.clearStock();
});

And(/^I have stock$/, () => {
  StockPage.createNewItem({ ref: 'itemRef', price: 27.5, amount: 2 });
  StockPage.createNewItem({ ref: 'itemRef2', price: 10.0, amount: 2 });
});

When(/^I create a new ticket with some items from the stock$/, () => {
  TicketsPage.addItem('itemRef');
  TicketsPage.addItem('itemRef2');
});

And(/^I pay the ticket with a payment method$/, () => {
  TicketsPage.pay({ method: 'cash', amount: 40 });
});

And(/^I can sell the ticket$/, () => {
  TicketsPage.checkout();
});

Then(/^I can return a voucher ticket$/, () => {
  TicketsPage.openLastTicket();
  TicketsPage.returnItem('itemRef');
  TicketsPage.checkout();
});

And(/^I can save the ticket$/, () => {});

And(/^I create a new ticket with some items from the stock$/, () => {});

Then(/^I can open back the saved ticket$/, () => {});
