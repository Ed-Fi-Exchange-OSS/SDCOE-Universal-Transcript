const tableName = 'users';

/**
 * Alter table `users`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.alterTable(tableName, table => {
    table.string('password'); // email-password based login
    table.integer('has_logged_in').defaultTo(0); //reset password for first login
    table.integer('is_active').defaultTo(1); //to temporarily disable access
  });
}

/**
 * Drop `users`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(tableName);
}
