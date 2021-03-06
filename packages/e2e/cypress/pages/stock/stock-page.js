import { stock } from '../../common/selectors';

class StockPage {
  static visit() {
    cy.visit('/tickets');
  }

  static typeNewItem({ ref, brand, desc, price, amount }) {
    this.typeRef(ref);
    this.typeBrand(brand);
    this.typeDesc(desc);
    this.typePrice(price);
    this.typeAmount(amount);
  }

  static typeRef(value) {
    this.type(value, stock.FIELD_REFERENCE);
  }

  static typeBrand(value) {
    this.type(value, stock.FIELD_BRAND);
  }

  static typeDesc(value) {
    this.type(value, stock.FIELD_DESCRIPTION);
  }

  static typePrice(value) {
    this.type(value, stock.FIELD_PRICE);
  }

  static typeAmount(value) {
    this.type(value, stock.FIELD_AMOUNT);
  }

  static type(query, selector) {
    query &&
      cy
        .getCy(selector)
        .filter('input')
        .type(query);
  }

  static addNewItem() {
    cy.getCy(stock.ADD_ITEM).click({ force: true });
  }

  static removeItem(ref) {
    cy.getCy(stock.ITEMS_LIST)
      .contains(ref)
      .closest(`[data-cy="${stock.ITEM}"]`)
      .find(`[data-cy="${stock.REMOVE_ITEM}"]`)
      .click({ force: true });
  }

  static createNewItem({ ref, brand, desc, price, amount } = {}) {
    this.typeNewItem({
      ref,
      brand,
      desc,
      price,
      amount,
    });
    this.addNewItem();
  }
}

export default StockPage;
