const tableName = 'users';
const { v4: uuidv4 } = require('uuid');

/**
 * Delete existing entries and seed values for `users`.
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
          user_id: uuidv4(),
          status: 'approved',
          CDS_code: '',
          first_name: 'Staff',
          last_name: 'Users',
          email_address: 'staff_user@sdcoedatahub.onmicrosoft.com',
          role: 'staff',
        },
        {
          user_id: uuidv4(),
          status: 'approved',
          CDS_code: '',
          first_name: 'Staff',
          last_name: 'Users',
          email_address: 'staff_user@sdcoedl.onmicrosoft.com',
          role: 'staff',
        },
        {
          user_id: uuidv4(),
          status: 'approved',
          CDS_code: '37679830000000',
          first_name: 'District',
          last_name: 'Users',
          email_address: 'district_user@sdcoedatahub.onmicrosoft.com',
          role: 'district',
        },
        {
          user_id: uuidv4(),
          status: 'approved',
          CDS_code: '37679670000000',
          first_name: 'District',
          last_name: 'Users',
          email_address: 'district_user@sdcoedl.onmicrosoft.com',
          role: 'district',
        },
        {
          user_id: uuidv4(),
          status: 'approved',
          CDS_code: '37679670000000',
          first_name: 'District',
          last_name: 'Users',
          email_address: 'tester_eduphoric@outlook.com',
          role: 'district',
        },
      ]);
    });
}
