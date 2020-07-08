import { stock, tickets } from '../../common/selectors';

const DEFAULT_TICKET_CREATION_TIMEOUT = 2;

class TicketsPage {

  static visit() {
    cy.visit('/tickets');
  }

  static addItem(ref, amount) {
    for (let i = 0; i < amount; i++) {
      cy.getCy(stock.ITEMS_LIST)
        .contains(ref)
        .closest(`[data-cy="${stock.ITEM}"]`)
        .find(`[data-cy="${stock.ADD_ITEM_TO_TICKET}"]`)
        .click({ force: true });
    }
  }

  static returnItem(ref, amount) {
    for (let i = 0; i < amount; i++) {
      cy.getCy(tickets.RETURN_ITEMS_LIST)
        .contains(ref)
        .closest(`[data-cy="${tickets.RETURN_ITEM_ROW}"]`)
        .find(`[data-cy="${tickets.INCREASE_RETURN_ITEM_BUTTON}"]`)
        .click({ force: true });
    }
  }

  static pay({ method, amount }) {
    if (method === tickets.PAYMENT_METHOD_VOUCHER) {
      cy.getCy(method).type(`${amount}{enter}`);
      cy.wait(DEFAULT_TICKET_CREATION_TIMEOUT * 1000);
      return;
    }
    cy.getCy(method).type(amount);
  }

  static openLastTicket() {
    cy.getCy(tickets.TICKETS_LIST)
      .find('li')
      .last()
      .click({ force: true });
  }

  static getLastTicketId(fn) {
    cy.getCy(tickets.TICKETS_LIST)
      .find('li')
      .last()
      .then(($li) => fn($li.text()));
  }

  static checkout() {
    cy.getCy(tickets.CHECKOUT_BUTTON).click({ force: true });
    cy.wait(DEFAULT_TICKET_CREATION_TIMEOUT * 1000);
  }

  static voucher() {
    cy.getCy(tickets.VOUCHER_BUTTON).click({ force: true });
    cy.wait(DEFAULT_TICKET_CREATION_TIMEOUT * 1000);
  }

  static newTicket() {
    cy.getCy(tickets.NEW_TICKET_BUTTON).click({ force: true });
  }
}

export default TicketsPage;
