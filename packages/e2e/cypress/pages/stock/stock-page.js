import { stock } from '../../common/selectors';

class StockPage {
  static visit() {
    cy.visit('/tickets');
  }

  static createNewItem({ ref, brand, desc, price, amount }) {
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
    cy.getCy(selector).type(query);
  }

  static addNewItem() {
    cy.getCy(stock.ADD_ITEM).click({ force: true });
  }
}

export default StockPage;
