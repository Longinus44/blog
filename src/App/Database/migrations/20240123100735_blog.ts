import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('blogs', (table) => {
        table.uuid('id').notNullable().unique()
        table.uuid('author_id').references('id').inTable('users')
        table.string('title').notNullable()
        table.text('content').notNullable()
        table.timestamps(true,true)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('blogs')
}

