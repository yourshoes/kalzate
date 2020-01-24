import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import CommonPage from '../../../pages/common/common-page';
import StockPage from '../../../pages/stock/stock-page';
import StockResultsPage from '../../../pages/stock/stock-results-page';

Given(/^I visit the tickets page$/, () => {
  CommonPage.clearDB();
  StockPage.visit();
});

And(/^I have no items in the stock$/, () => {
  StockResultsPage.expect().toNotHaveItems();
});

And(/^I create a new item with only required fields$/, () => {
  StockPage.createNewItem({
    ref: 'reference',
    price: '10',
    amount: '10',
  });
});

Then(/^a new line is added to the items list$/, () => {
  StockResultsPage.expect().haveItem.withRef('reference', 'exist');
});
