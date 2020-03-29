const cleaner = require("knex-cleaner");

// Deletes ALL existing entries 💀
exports.seed = function(knex) {
  return cleaner.clean(knex, {
    mode: "truncate",
    ignoreTables: ["knex_migrations", "knex_migrations_lock"],
  });
};
