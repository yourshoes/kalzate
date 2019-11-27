import { stock } from '../../common/selectors';

class StockResultsPage {
  static expect() {
    return {
      toHaveItems: (n) => {
        cy.getCy(stock.ITEMS_LIST)
          .its('length')
          .then((length) => {
            expect(length).to.be.equal(n);
          });
      },
      toNotHaveItems: () => {
        cy.getCy(stock.ITEMS_LIST_CONTAINER).contains("Hey, Looks as there's no Items!");
      },
      haveItem: {
        withRef: (ref, expectation) => {
          /* cy.on('uncaught:exception', () => {
            expect(expectation).to.be.a('not.exist');
          }); */
          cy.getCy(stock.ITEMS_LIST)
            .contains(ref)
            .should(expectation);
        },
      },
    };
  }
}

export default StockResultsPage;
