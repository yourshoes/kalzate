import { tickets } from '../../common/selectors';

class TicketsResultsPage {
  static expectToHaveTickets(n) {
    cy.getCy(tickets.TICKETS_LIST)
      .find('li')
      .its('length')
      .then((length) => {
        expect(length).to.be.equal(n);
      });
  }

  static expectCheckoutButtonDisabled(isDisabled) {
    cy.getCy(tickets.CHECKOUT_BUTTON).should(isDisabled ? 'be.disabled' : 'not.be.disabled');
  }

  static expectVoucherButtonDisabled(isDisabled) {
    cy.getCy(tickets.VOUCHER_BUTTON).should(isDisabled ? 'be.disabled' : 'not.be.disabled');
  }

}

export default TicketsResultsPage;
