require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    // 🔻 Points to our local Postgresql database
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};
