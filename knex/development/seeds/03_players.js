exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("players")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("players").insert([
        { id: 1, name: "Player 1", user_id: 1, campaign_id: 1 },
        { id: 2, name: "Player 2", user_id: 1, campaign_id: 2 },
        { id: 3, name: "Player 3", user_id: 1, campaign_id: 2 },
      ]);
    });
};
