import { CY_STOCK_LIST_ITEM } from "@kalzate/config/cy-selectors";

const RESULT_LIST = `[data-cy="${CY_STOCK_LIST_ITEM}"]`;

class StoreResultsPage {
  static expect() {
    return {
      toHaveItems: () => {
        cy.get(RESULT_LIST).its('length').then((length) => {
          expect(length).to.be(1);
        });
      },
    };
  }
}

export default StoreResultsPage;
