import { Given, Then, When, And } from 'cypress-cucumber-preprocessor/steps';
import { StorePage } from '../../../pages/store/store-page';
import StoreResultsPage from '../../../pages/store/store-results-page';

Given(/^I am on the ticket section$/, () => {
  StorePage.visit();
});

And(/^I create a new item'$/, () => {
  StorePage.createNewItem({
    ref: '9029834',
    brand: 'sdfasdfdsf',
    desc: 'erwerwe',
    price: '123',
    amount: '3',
  });
  StorePage.addNewItem();
});

Then(/^a new line is added to the items list$/, () => {
  StoreResultsPage.expect().toHaveItems();
});
