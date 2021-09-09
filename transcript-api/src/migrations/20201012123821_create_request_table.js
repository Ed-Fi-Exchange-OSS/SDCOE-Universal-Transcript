const tableName = 'requests';

/**
 * Create table `table_name`.
 *
 * @param   {object} knex
 * @returns {Promise}
 */
export function up(knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('request_id').primary();

    table.string('type_of_transcript');
    table.string('status').defaultTo('pending');
    table.datetime('request_date');
    table.datetime('fulfilled_date');
    table.string('CDS_code');
    table.string('district_staff_name');
    table.string('district_student_ssid');
    table.string('first_name');
    table.string('last_name');
    table.string('dob');
    table.string('phone_no');
    table.string('address');
    table.string('class_description');
    table.string('years_attended');
    table.string('district_name');
    table.string('release_to_name');
    table.string('release_to_email');
    table.text('signature');
    table.datetime('signature_date');
    table.string('upload_signature_filename');
    table.string('industry_sectors');
    table.string('requested_by');
    table.string('requested_type');
    table.text('mr_transcript');

    table.timestamp('created_at').notNull().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNull().defaultTo( knex.fn.now());
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
