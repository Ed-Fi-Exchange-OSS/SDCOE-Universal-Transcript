/*
  The download transcript functionality is dependent on the pdf-utils function to generate the templates from the standard JSON received.
  Here, the required JSON is stored in the request table in the database. First, the JSON is fetched from the table using unique identifer(requestId) and the JSON is passed to the respective function from pdf-utils depending on the type of transcript(standard/ROP).
*/

const logger = require('../utils/logger').default;

const orderService = require('../services/orders');
const transcriptService = require('../services/transcripts');

const { TRANSCRIPT_TYPE } = require('../constants/transcript-type');

const downloadTranscript = async (req, res, next) => {
  try {
    const { requestId } = req.query;
    const order = await orderService.getOrderWithoutRole(requestId);
    const { typeOfTranscript: type } = order[0];
    const filePath = await transcriptService.getTranscriptByOrder(type, requestId, order);
    let isHeaderSet = false;

    if (filePath) {
      if (type === TRANSCRIPT_TYPE.JSON) {
        res.setHeader('Content-type', 'application/json');
        isHeaderSet = true;
      } else if (type === TRANSCRIPT_TYPE.STANDARD_PDF || type === TRANSCRIPT_TYPE.ROP) {
        res.setHeader('Content-type', 'application/pdf');
        isHeaderSet = true;
      } else res.status(400).json({ error: 'Transcript type invalid' });

      if (isHeaderSet) res.sendFile(filePath);
    } else res.status(404).json({ error: 'The file could not be located' });
  } catch (e) {
    logger.error('Download Transcript error', e);
    res.status(500).json({ error: 'Unable to download the transcript' });
  }
};

module.exports = {
  downloadTranscript,
};
