const tableName = 'users';

/**
 * Create table `users`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('user_id').primary();

    table.string('status').defaultTo('pending');
    table.string('CDS_code');
    table.string('first_name');
    table.string('last_name');
    table.string('email_address');
    table.string('role');

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
