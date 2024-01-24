import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users',(table) => {
        table.uuid('id').unique().notNullable().primary()
        table.string('username').notNullable()
        table.string('email').unique().notNullable()
        table.string('password').notNullable()
        table.timestamps(true, true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

