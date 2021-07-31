const tableName = 'edfi_ods';

/**
 * Create table `edfi_ods`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.string('organization_id');
    table.string('CDS_code');
    table.string('ods_database');

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
