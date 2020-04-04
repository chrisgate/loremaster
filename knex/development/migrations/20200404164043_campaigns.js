exports.up = function (knex, Promise) {
  return knex.schema.createTable("campaigns", (t) => {
    t.increments("id");
    t.string("name");
    t.string("description");
    t.integer("user_id").references("id").inTable("users");
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("campaigns");
};
