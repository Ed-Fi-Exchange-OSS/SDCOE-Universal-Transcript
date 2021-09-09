const tableName = 'edfi_ods';

/**
 * Alter Table edfi_ods.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.alterTable(tableName, (table) => {
    table.string('client_id');
    table.string('client_secret');
    table.string('base_url');
    table.string('url_suffix');
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
