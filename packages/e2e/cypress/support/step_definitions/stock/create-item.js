import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import StockPage from '../../../pages/stock/stock-page';
import StockResultsPage from '../../../pages/stock/stock-results-page';

Given(/^I visit the tickets page$/, () => {
  StockPage.visit();
  StockPage.clearStock();
});

And(/^I have no items in the stock$/, () => {
  StockResultsPage.expect().toNotHaveItems();
});

And(/^I create a new item$/, () => {
  StockPage.createNewItem({
    ref: 'reference',
    price: '10',
    amount: '10',
    brand: 'brand',
    desc: 'desc',
  });
});

Then(/^a new line is added to the items list$/, () => {
  StockResultsPage.expect().haveItem.withRef('reference', 'exist');
});
