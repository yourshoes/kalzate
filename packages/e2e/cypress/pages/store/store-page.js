import { CY_STOCK_FORM_CONTAINER, CY_STOCK_REF, CY_STOCK_BRAND, CY_STOCK_DESC, CY_STOCK_PRICE, CY_STOCK_AMOUNT } from "../../../../app/src/cy-selectors";

const INPUT_FIELD_REFERENCE = `input[data-cy="${CY_STOCK_REF}"]`;
const INPUT_FIELD_BRAND = `input[data-cy="${CY_STOCK_BRAND}"]`;
const INPUT_FIELD_DESCRIPTION = `input[data-cy="${CY_STOCK_DESC}"]`;
const INPUT_FIELD_PRICE = `input[data-cy="${CY_STOCK_PRICE}"]`;
const INPUT_FIELD_AMOUNT = `input[data-cy="${CY_STOCK_AMOUNT}"]`;
const PLUS_BUTTON = `[data-cy="${CY_STOCK_FORM_CONTAINER}"] button[icon="plus"]`;

class StorePage {
  static visit() {
    cy.visit('/tickets');
  }

  static typeRef(value) {
    this.type(value, INPUT_FIELD_REFERENCE);
  }

  static typeBrand(value) {
    this.type(value, INPUT_FIELD_BRAND);
  }

  static typeDesc(value) {
    this.type(value, INPUT_FIELD_DESCRIPTION);
  }

  static typePrice(value) {
    this.type(value, INPUT_FIELD_PRICE);
  }

  static typeAmount(value) {
    this.type(value, INPUT_FIELD_AMOUNT);
  }

  static type(query, field) {
    cy.get(field).type(query);
  }

  static addNewItem() {
    cy.get(PLUS_BUTTON)
      .click();
  }
}

export default StorePage;
