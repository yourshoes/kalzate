import { Given, Then, And } from 'cypress-cucumber-preprocessor/steps';
import StockPage from '../../../pages/stock/stock-page';
import StockResultsPage from '../../../pages/stock/stock-results-page';

const itemsRef = new Date().getTime().toString();

Given(/^I visit the tickets page$/, () => {
  StockPage.visit();
});

And(/^I have not an item with reference n$/, () => {
  StockResultsPage.expect().haveItem.withRef(itemsRef, 'not.exist');
});

And(/^I create a new item with reference n$/, () => {
  StockPage.createNewItem({
    ref: itemsRef,
    brand: 'sdfasdfdsf',
    desc: 'erwerwe',
    price: '123',
    amount: '3',
  });
  StockPage.addNewItem();
});

Then(/^a new line is added to the items list with reference n$/, () => {
  StockResultsPage.expect().haveItem.withRef(itemsRef, 'exist');
});
