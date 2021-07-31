const tableName = 'districts'
/**
 * Delete existing entries and seed values for `districts`.
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
          CDS_code: 37679670000000,
          district_name: 'Alpine Union School District',
        },
        {
          CDS_code: 37768510000000,
          district_name: 'Bonsall Unified',
        },
        {
          CDS_code: 37679830000000,
          district_name: 'Borrego Springs Unified',
        },
        {
          CDS_code: 37679910000000,
          district_name: 'Cajon Valley Union',
        },
        {
          CDS_code: 37680070000000,
          district_name: 'Cardiff Elementary',
        },
        {
          CDS_code: 37735510000000,
          district_name: 'Carlsbad Unified',
        },
        {
          CDS_code: 37680230000000,
          district_name: 'Chula Vista Elementary',
        },
        {
          CDS_code: 37680310000000,
          district_name: 'Coronado Unified',
        },
        {
          CDS_code: 37680490000000,
          district_name: 'Dehesa Elementary',
        },
        {
          CDS_code: 37680560000000,
          district_name: 'Del Mar Union Elementary',
        },
        {
          CDS_code: 37680800000000,
          district_name: 'Encinitas Union Elementary',
        },
        {
          CDS_code: 37680980000000,
          district_name: 'Escondido Union',
        },
        {
          CDS_code: 37681060000000,
          district_name: 'Escondido Union High',
        },
        {
          CDS_code: 37681140000000,
          district_name: 'Fallbrook Union Elementary',
        },
        {
          CDS_code: 37681220000000,
          district_name: 'Fallbrook Union High',
        },
        {
          CDS_code: 37681300000000,
          district_name: 'Grossmont Union High',
        },
        {
          CDS_code: 37681550000000,
          district_name: 'Jamul-Dulzura Union Elementary',
        },
        {
          CDS_code: 37681630000000,
          district_name: 'Julian Union Elementary',
        },
        {
          CDS_code: 37681710000000,
          district_name: 'Julian Union High',
        },
        {
          CDS_code: 37681970000000,
          district_name: 'La Mesa-Spring Valley',
        },
        {
          CDS_code: 37681890000000,
          district_name: 'Lakeside Union Elementary',
        },
        {
          CDS_code: 37682050000000,
          district_name: 'Lemon Grove',
        },
        {
          CDS_code: 37682130000000,
          district_name: 'Mountain Empire Unified',
        },
        {
          CDS_code: 37682210000000,
          district_name: 'National Elementary',
        },
        {
          CDS_code: 37735690000000,
          district_name: 'Oceanside Unified',
        },
        {
          CDS_code: 37682960000000,
          district_name: 'Poway Unified',
        },
        {
          CDS_code: 37683040000000,
          district_name: 'Ramona City Unified',
        },
        {
          CDS_code: 37683120000000,
          district_name: 'Rancho Santa Fe Elementary',
        },
        {
          CDS_code: 37103710000000,
          district_name: 'San Diego County Office of Education',
        },
        {
          CDS_code: 37683380000000,
          district_name: 'San Diego Unified',
        },
        {
          CDS_code: 37683460000000,
          district_name: 'San Dieguito Union High',
        },
        {
          CDS_code: 37737910000000,
          district_name: 'San Marcos Unified',
        },
        {
          CDS_code: 37683530000000,
          district_name: 'San Pasqual Union Elementary',
        },
        {
          CDS_code: 37683790000000,
          district_name: 'San Ysidro Elementary',
        },
        {
          CDS_code: 37683610000000,
          district_name: 'Santee',
        },
        {
          CDS_code: 37764710000000,
          district_name: 'SBC - High Tech High',
        },
        {
          CDS_code: 37683870000000,
          district_name: 'Solana Beach Elementary',
        },
        {
          CDS_code: 37683950000000,
          district_name: 'South Bay Union',
        },
        {
          CDS_code: 37684030000000,
          district_name: 'Spencer Valley Elementary',
        },
        {
          CDS_code: 37684110000000,
          district_name: 'Sweetwater Union High',
        },
        {
          CDS_code: 37684370000000,
          district_name: 'Vallecitos Elementary',
        },
        {
          CDS_code: 37756140000000,
          district_name: 'Valley Center-Pauma Unified',
        },
        {
          CDS_code: 37684520000000,
          district_name: 'Vista Unified',
        },
        {
          CDS_code: 37754160000000,
          district_name: 'Warner Unified',
        },
      ]);
    });
}
