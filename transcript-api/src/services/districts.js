const districtModel = require('../models/districts');
const { districtSerialize } = require('../serializer/districts');

const getAllDistricts = async () => {
  const districts = await districtModel.getAllDistricts();

  return districtSerialize(districts);
}

const getDistrict = async (id) => {
  const district = await districtModel.getDistrict(id);
  
  return districtSerialize(district);
}

module.exports = {
  getAllDistricts,
  getDistrict
}
