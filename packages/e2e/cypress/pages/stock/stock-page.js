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
    this.type(value, stock.INPUT_FIELD_REFERENCE);
  }

  static typeBrand(value) {
    this.type(value, stock.INPUT_FIELD_BRAND);
  }

  static typeDesc(value) {
    this.type(value, stock.INPUT_FIELD_DESCRIPTION);
  }

  static typePrice(value) {
    this.type(value, stock.INPUT_FIELD_PRICE);
  }

  static typeAmount(value) {
    this.type(value, stock.INPUT_FIELD_AMOUNT);
  }

  static type(query, selector) {
    cy.getCy(selector).type(query);
  }

  static addNewItem() {
    cy.getCy(stock.BUTTON_ADD_ITEM)
      .find('[icon="plus"]')
      .click();
  }
}

export default StockPage;
