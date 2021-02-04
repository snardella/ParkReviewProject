/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async(knex) => {
    return knex.schema.createTable("votes", (table) => {
        table.bigIncrements("id")
        table.bigInteger("voteTotal")
        table.integer("parkId")
            .unsigned()
            .index()
            .notNullable()
            .references("parks.id")
        table.integer("userId")
            .unsigned()
            .index()
            .notNullable()
            .references("users.id")
        table.timestamp("createdAt")
            .notNullable()
            .defaultTo(knex.fn.now())
        table.timestamp("updatedAt")
            .notNullable()
            .defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("votes")
}