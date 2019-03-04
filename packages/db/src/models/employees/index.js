

/**
 * Use mongo as model
 */

class Employee {
  create() {}
  update() {}
  authenticate() {}
  serialize() {}
  deserialize() {}
}

export default async function (db) {
  // Create collection
  return new Employee(db);
}
