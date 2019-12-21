class CommonPage {
  static visit() {
    cy.visit('/');
  }

  static async clearDB() {
    let windowInstance;

    this.visit();

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

export default CommonPage;
