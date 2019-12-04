import { stock } from '../../common/selectors';

class TicketsPage {
  static visit() {
    cy.visit('/tickets');
  }
}

export default TicketsPage;
