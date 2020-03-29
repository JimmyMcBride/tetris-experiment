const bcrypt = require("bcryptjs");

// Plant seeds 🏡
exports.seed = function(knex) {
  return knex("users").then(function() {
    // Inserts seed entries 🌱
    return knex("users").insert([
      {
        id: 1,
        username: "FireNinja",
        password: bcrypt.hashSync("password", 10),
      },
      {
        id: 2,
        username: "Billy",
        password: bcrypt.hashSync("password", 10),
      },
    ]);
  });
};
