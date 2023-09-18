/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("news", (table) => {
    table.increments("id").primary();
    table.string("title", 300).notNullable();
    table.text("description").notNullable();

    //
    table
      .integer("img_id")
      .references("id")
      .inTable("images")
      .onDelete("SET NULL");

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("news");
};
