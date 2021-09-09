const tableName = 'student';

/**
 * Create table `student`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('student_id').primary();

    table.string('ssid');
    table.string('local_id');
    table.string('first_name');
    table.string('last_name');
    table.date('dob');
    table.string('race_ethnicity');
    table.string('gender');
    table.string('parent_guardian_first');
    table.string('parent_guardian_last');
    table.string('phone');
    table.string('address');
    table.string('city');
    table.string('zip_code');
    table.string('state');

    table.timestamp('created_at').notNull().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNull().defaultTo(knex.fn.now());
  });
}

/**
 * Drop `student`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(tableName);
}
