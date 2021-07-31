const tableName = 'courses';

/**
 * Create table `courses`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('student_id');
    table.uuid('institution_id');

    table.integer('academic_year');
    table.integer('academic_period');
    table.string('course_id');
    table.string('course_name');
    table.string('course_subject');
    table.string('non_academic');
    table.string('honors');
    table.string('college_prep');
    table.string('repeated_course');
    table.string('cte');
    table.string('instructor');
    table.float('units_attempted');
    table.float('units_completed');
    table.float('hours_completed');
    table.float('grade_points');
    table.string('grade');
    table.date('exit_date');

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
