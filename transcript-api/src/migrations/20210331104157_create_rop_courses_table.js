const tableName = 'rop_courses';

/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.uuid('request_id').references('request_id').inTable('requests');
    table.string('course_code').notNullable();
    table.string('course_title').notNullable();
    table.string('course_term').notNullable();
    table.boolean('requested_rop_certificate').notNullable().defaultTo(false);
    table.boolean('requested_rop_transcript').notNullable().defaultTo(false);
    table.boolean('is_archieved').notNullable().defaultTo(false);
    table.timestamp('created_at').notNull().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNull().defaultTo(knex.fn.now());
  });
}

/**
 * Drop `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(tableName);
}
