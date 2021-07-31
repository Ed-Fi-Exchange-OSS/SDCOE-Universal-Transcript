const tableName = 'edfi_ods';

/**
 * Delete existing entries and seed values for `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function seed(knex) {
  return knex(tableName)
    .del()
    .then(() => {
      return knex(tableName).insert([
        {
          client_id: 'client_id',
          client_secret: 'client_secret',
          base_url: 'base_url',
        },
      ]);
    });
}
