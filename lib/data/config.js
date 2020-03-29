const knex = require("knex");
const knexConfig = require("../../knexfile");

export default knex(knexConfig.development);
