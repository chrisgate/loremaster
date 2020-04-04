exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", (t) => {
    t.increments("id");
    t.string("email").notNullable();
    t.string("password").notNullable();
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("users");
};
