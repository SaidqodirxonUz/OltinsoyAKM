/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 *
 */
exports.up = function (knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments("id").primary();
    table.string("title", 250).notNullable();
    table.text("description").notNullable();
    table.string("file", 150);
    table.integer("img_id").references("id").inTable("images").unique();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("books");
};
