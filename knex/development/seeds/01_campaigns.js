exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("campaigns")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("campaigns").insert([
        { id: 1, name: "The Pale Library", user_id: 1 },
        { id: 2, name: "Another Campaign", user_id: 1 },
      ]);
    });
};
