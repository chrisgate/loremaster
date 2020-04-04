exports.up = function (knex, Promise) {
  return knex.schema.createTable("characters", (t) => {
    t.increments("id");
    t.string("name");
    t.string("description");
    t.integer("campaign_id").references("id").inTable("campaigns");
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("characters");
};
