import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import StockPage from '../../../pages/stock/stock-page';
import StockResultsPage from '../../../pages/stock/stock-results-page';

Given(/^I visit the tickets page$/, () => {
  StockPage.visit();
});

And(/^I create a new item$/, () => {
  StockPage.typeNewItem({
    ref: '9029834',
    brand: 'sdfasdfdsf',
    desc: 'erwerwe',
    price: '123',
    amount: '3',
  });
  StockPage.addNewItem();
});

Then(/^a new line is added to the items list$/, () => {
  StockResultsPage.expect().toHaveItems();
});
