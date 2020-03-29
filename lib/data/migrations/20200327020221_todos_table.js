exports.up = function(knex) {
  return knex.schema.createTable("score", tbl => {
    tbl.increments();
    tbl.integer("value").notNullable();
    tbl.integer("level").notNullable();
    tbl.integer("cleared").notNullable();
    tbl
      .boolean("public")
      .notNullable()
      .defaultTo(true);
    tbl
      .integer("userId")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("todos");
};
