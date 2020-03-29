// Plant seeds 🏡
exports.seed = function(knex) {
  return knex("scores").then(function() {
    // Inserts seed entries 🌱
    return knex("scores").insert([
      {
        id: 1,
        value: 10562,
        level: 10,
        cleared: 54,
        userId: 1,
        createdAt: "2020-03-27 02:49:54.709704-05",
      },
      {
        id: 2,
        value: 11726,
        level: 15,
        cleared: 86,
        userId: 1,
        createdAt: "2020-03-27 02:49:54.709704-05",
      },
    ]);
  });
};
