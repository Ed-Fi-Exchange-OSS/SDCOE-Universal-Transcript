const { rm } = require('fs').promises;
const { logger } = require('../utils/logger');
const { SecurePdfBuilder } = require('pdf-utils');

module.exports = async (req, res, next) => {
  try {
    const pdfPath = req.file.path;
    const { ETHEREUM_NODE_URL, DID_ADDRESS, BLOCKCHAIN_KEY_ID } = process.env;
    
    const supportingArgs = {
      ethereumNodeURL: ETHEREUM_NODE_URL,
      didRegistryAddress: DID_ADDRESS,
      did: BLOCKCHAIN_KEY_ID,
    };

    const isValid = await new SecurePdfBuilder(pdfPath).setSupportingArgs(supportingArgs).verify();

    // * Remove file after checking if file is tampered
    await rm(req.file.path);

    res.status(200).json({
      status: 'Success',
      message: isValid,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ message: 'Could not verify the transcript' });
  }
};
