import { tickets } from '../../common/selectors';

class TicketsResultsPage {
  static expect() {
    return {
      toHaveItems: (n) => {
        cy.getCy(tickets.TICKETS_LIST)
          .find('li')
          .its('length')
          .then((length) => {
            expect(length).to.be.equal(n);
          });
      },
    };
  }
}

export default TicketsResultsPage;
