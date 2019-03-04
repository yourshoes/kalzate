/**
 * Use mongo as model
 */
class Ticket {
  create() {}
  update() {}
  authenticate() {}
  serialize() {}
  deserialize() {}
}

export default async function (db) {
  // Create collection
  return new Ticket(db);
}
