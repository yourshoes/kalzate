import { Given, Then, When, And } from 'cypress-cucumber-preprocessor/steps';
import { StorePage } from '../../../pages/store/store-page';
import StoreResultsPage from '../../../pages/store/store-results-page';

Given(/^the user is on the ticket section$/, () => {
  StorePage.visit();
});

When(/^user text a valid value on 'Reference' input'$/, () => {
  StorePage.typeRef('9029834');
});

And(/^user text a valid value on 'Brand' input'$/, () => {
  StorePage.typeBrand('sdfasdfdsf');
});

And(/^user text a valid value on 'Description' input'$/, () => {
  StorePage.typeDesc('erwerwe');
});

And(/^user text a valid value on 'Price' input'$/, () => {
  StorePage.typePrice('123');
});

And(/^user text a valid value on 'Amount' input'$/, () => {
  StorePage.typeAmount('3');
});

And(/^user click on add button'$/, () => {
  StorePage.addNewItem();
});

Then(/^a new line is added items list$/, () => {
  StoreResultsPage.expect().toHaveItems();
});
