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
    query && cy.getCy(selector)
      .filter('input')
      .type(query);
  }

  static addNewItem() {
    cy.getCy(stock.ADD_ITEM).click({ force: true });
  }

  static removeItem(ref) {
    cy.getCy(stock.ITEMS_LIST_CONTAINER).contains(ref);
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

  static async clearStock() {
    let windowInstance;
    return cy
      .window()
      .then((window) => {
        windowInstance = window;
        return window.indexedDB.databases();
      })
      .then((databases) => databases.map(({ name }) => name))
      .then((databasesName) =>
        Promise.all(
          databasesName.map((databaseName) => windowInstance.indexedDB.deleteDatabase(databaseName))
        )
      )
      .then(() => this.visit());
  }
}

export default StockPage;
