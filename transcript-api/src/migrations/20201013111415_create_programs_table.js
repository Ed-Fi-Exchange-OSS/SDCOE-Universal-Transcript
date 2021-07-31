const tableName = 'programs';

/**
 * Create table `programs`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('student_id');
    table.uuid('institution_id');

    table.date('academic_year');
    table.integer('academic_period');
    table.integer('program_id');
    table.string('program_title');

    table.timestamp('created_at').notNull().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNull().defaultTo(knex.fn.now());
  });
}

/**
 * Drop `programs`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function down(knex) {
  return knex.schema.dropTable(tableName);
}
