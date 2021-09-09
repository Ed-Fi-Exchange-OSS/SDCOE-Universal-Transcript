const tableName = 'student_school';

/**
 * Create table `student_school`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('student_id');

    table.uuid('institution_id');
    table.uuid('institution_alt_id');
    table.string('institution_name');
    table.integer('academic_year');
    table.integer('academic_period');
    table.integer('current_grade');
    table.string('counselor');

    table.timestamp('created_at').notNull().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNull().defaultTo(knex.fn.now());
  });
}

/**
 * Drop `student_school`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(tableName);
}
