const logger = require('../utils/logger').default;
const districtService = require('../services/districts');

const getAllDistricts = async (req, res, next) => {
  try {
    const districts = await districtService.getAllDistricts();

    res.status(200).json({
      messages: districts,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).json({ error: 'Error getting all districts' });
  }
};

const getDistrict = async (req, res, next) => {
  try {
    const district = await districtService.getDistrict(req.params.id);

    res.status(200).json({
      messages: district,
    });
  } catch (e) {
    logger.error('Get District error', e);
    res.status(404).json({ error: 'District not found' });
  }
};

module.exports = {
  getAllDistricts,
  getDistrict,
};
