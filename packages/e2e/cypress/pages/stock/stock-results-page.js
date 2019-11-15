import { stock } from '../../common/selectors';

class StockResultsPage {
  static expect() {
    return {
      toHaveItems: () => {
        cy.getCy(stock.ITEMS_LIST)
          .its('length')
          .then((length) => {
            expect(length).to.be.equal(1);
          });
      },
    };
  }
}

export default StockResultsPage;
