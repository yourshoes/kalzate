import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import TicketsPage from '../../../pages/tickets/tickets-page';
import StockPage from '../../../pages/stock/stock-page';

Given(/^I visit the tickets page$/, () => {
  TicketsPage.visit();
});

And(/^I have stock$/, () => {
  StockPage.createNewItem();
});

When(/^I create a new ticket with some items from the stock$/, () => {});

And(/^I pay the ticket with a payment method$/, () => {});

And(/^I can sell the ticket$/, () => {});

Then(/^I can return a voucher ticket$/, () => {});

And(/^I can save the ticket$/, () => {});

And(/^I create a new ticket with some items from the stock$/, () => {});

Then(/^I can open back the saved ticket$/, () => {});
