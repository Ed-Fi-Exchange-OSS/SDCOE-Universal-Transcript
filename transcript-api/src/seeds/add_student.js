const tableName = 'student';

/**
 * Delete existing entries and seed values for `student`.
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
          student_id: '2e0108f2-0b93-46e0-85fd-53a8e54c8bbc',
          ssid: 'Because a LANnister Never Forgets',
          local_id: '125xp',
          first_name: 'Sienna',
          last_name: 'Henderson',
          dob: '04-09-1996',
          race_ethnicity: 'American Indian',
          gender: 'male',
          parent_guardian_first: 'Bruce',
          parent_guardian_last: 'Hough',
          phone: '266596614',
          address: '17 street',
          city: 'chicago',
          zip_code: '789',
          state: 'virginia',
        },
        {
          student_id: '7149094b-83aa-4a0b-87a3-007e0e7f9c6e',
          ssid: 'belong to us',
          local_id: '159xc',
          first_name: 'Marisa',
          last_name: 'Rees',
          dob: '05-09-1996',
          race_ethnicity: 'Black',
          gender: 'female',
          parent_guardian_first: 'Sienna',
          parent_guardian_last: 'Hough',
          phone: '266596619',
          address: '19 steet',
          city: 'houston',
          zip_code: '456',
          state: 'alabama',
        },
      ]);
    });
}
