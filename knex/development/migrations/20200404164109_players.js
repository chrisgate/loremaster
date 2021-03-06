exports.up = function (knex, Promise) {
  return knex.schema.createTable("players", (t) => {
    t.increments("id");
    t.string("name");
    t.string("description");
    t.string("class");
    t.integer("user_id").references("id").inTable("users");
    t.integer("campaign_id").references("id").inTable("campaigns");
    t.timestamp("createdAt").defaultTo(knex.fn.now());
    t.timestamp("updatedAt").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable("players");
};
