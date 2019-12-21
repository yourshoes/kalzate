import { stock, tickets } from '../../common/selectors';

class TicketsPage {
  static visit() {
    cy.visit('/tickets');
  }

  static addItem(ref) {
    cy.getCy(stock.ITEMS_LIST)
      .contains(ref)
      .closest(`[data-cy="${stock.ITEM}"]`)
      .find(`[data-cy="${stock.ADD_ITEM_TO_TICKET}"]`)
      .click({ force: true });
  }

  static returnItem(ref) {
    cy.getCy(tickets.RETURN_ITEMS_LIST)
      .contains(ref)
      .closest(`[data-cy="${tickets.RETURN_ITEM_ROW}"]`)
      .find(`[data-cy="${tickets.INCREASE_RETURN_ITEM_BUTTON}"]`)
      .click({ force: true });
  }

  static pay({ method, amount }) {
    cy.getCy(method).click({ force: true });
    cy.getCy(tickets.PAYMENT_INPUT).type(amount);
  }

  static openLastTicket() {
    cy.getCy(tickets.TICKETS_LIST)
      .find('li')
      .last()
      .click({ force: true });
  }

  static checkout() {
    cy.getCy(tickets.SELL_CHECKOUT_BUTTON).should('not.be.disabled');
    cy.getCy(tickets.SELL_CHECKOUT_BUTTON).click({ force: true });
  }

  static voucher() {
    cy.getCy(tickets.RETURN_VOUCHER_BUTTON).should('not.be.disabled');
    cy.getCy(tickets.RETURN_VOUCHER_BUTTON).click({ force: true });
    //voucher operation takes a while so we need to wait
    cy.wait(1000);
  }

  static save() {
    cy.getCy(tickets.SELL_SAVE_BUTTON).should('not.be.disabled');
    cy.getCy(tickets.SELL_SAVE_BUTTON).click({ force: true });
  }

  static newTicket() {
    cy.getCy(tickets.NEW_TICKET_BUTTON).should('not.be.disabled');
    cy.getCy(tickets.NEW_TICKET_BUTTON).click({ force: true });
  }
}

export default TicketsPage;
