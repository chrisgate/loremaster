exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("characters")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("characters").insert([
        { id: 1, name: "Name 1", campaign_id: 1 },
        { id: 2, name: "Name 2", campaign_id: 2 },
        { id: 3, name: "Name 3", campaign_id: 1 },
      ]);
    });
};
