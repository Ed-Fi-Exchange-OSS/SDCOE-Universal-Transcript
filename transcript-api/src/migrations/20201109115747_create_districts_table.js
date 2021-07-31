const tableName = 'districts';

/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(tableName, table => {
    table.increments();

    table.string('CDS_code').notNull();
    table.string('district_name').notNull();

    table
      .timestamp('created_at')
      .notNull()
      .defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .notNull()
      .defaultTo(knex.fn.now());
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
