/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("parks", (table) => {
    table.bigIncrements("id").primary();
    table.string("name", 1000000).notNullable();
    table.string("location", 1000000).notNullable();
    table.string("description", 1000000);
    table.float("rating").notNullable();
    table.string("picture", 1000000);
    table.bigInteger("userId").unsigned().index().notNullable().references("users.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("parks");
};
