require('../env');

const sql = require("mssql");
const { emailer } = require('../utils/email');
const logger = require('../utils/logger').default;

const { REQUEST_STATUS } = require('../constants/state');
const { REQUEST_TYPE } = require('../constants/requestType');
const { TRANSCRIPT_TYPE } = require('../constants/transcript-type');

const { searchTranscriptByDemographics, searchTranscriptByStudentId } = require('transcript-backend');

const connectToSQL = () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME
  };

  return sql.connect(config);
};

const getConfig = async () => {
  const configQuery = 'SELECT * FROM edfi_ods';

  await connectToSQL();

  const db = new sql.Request();
  const config = await db.query(configQuery);

  return config.recordset;
}

const fetchFromODS = async (requestType, firstName, lastName, dateOfBirth, studentId) => {
  let configResponse = await getConfig();

  const configs = configResponse.map(config => {
    return {
      clientId: config.client_id,
      clientSecret: config.client_secret,
      baseUrl: config.base_url
    }
  });

  let compositeJSON;
  switch (requestType) {
    case REQUEST_TYPE.DISTRICT:
      compositeJSON = await searchTranscriptByStudentId(configs, studentId);
      break;

    case REQUEST_TYPE.STUDENT:
      compositeJSON = await searchTranscriptByDemographics(configs, firstName, lastName, dateOfBirth);
      break;

    default:
      logger.error(`Composite data cannot be fetched by request type ${requestType}`);
      throw 'Invalid Case';
  }

  return compositeJSON;
};

const updateRequestStatus = async (requestId, mrTranscript, targetStatus) => {
  const updateQuery = `UPDATE requests SET status='${targetStatus}', mr_transcript='${mrTranscript}' where request_id='${requestId}'`;

  logger.info(
    `Updating Request status for ${requestId} with MrTranscript ${mrTranscript !== null} and ${targetStatus}`
  );

  await connectToSQL();
  const db = new sql.Request();
  
  await db.query(updateQuery);
};

const updateApprovedStatus = async () => {
  const updateQuery = `UPDATE requests SET status='${REQUEST_STATUS.PROCESSING}' WHERE status='${REQUEST_STATUS.APPROVED}'`;

  logger.info('Updating approved status');

  await connectToSQL();
  const db = new sql.Request();

  await db.query(updateQuery);
};

const generateAndEmail = async (status) => {
  const selectQuery = `SELECT * FROM requests WHERE status='${status}'`;

  logger.info('Selecting processing records');

  await  connectToSQL();
  const db = new sql.Request();

  const orders = await db.query(selectQuery);
  
  const { recordset } = orders;
  
  if (!recordset || !recordset.length) {
    return;
  }

  logger.info('Awaiting for loop promise');
  // 3. Fetch the data from the ODS and Update database table
  await new Promise((resolve, reject) => {
    logger.info('Looping processing records');
    recordset.forEach(async (request, index) => {
      const {
        request_id,
        first_name,
        last_name,
        dob,
        status,
        release_to_email,
        requested_type,
        type_of_transcript,
        district_student_ssid,
      } = request;

      let compositeJSON;
      try {
        logger.info('fetching from ODS');
        compositeJSON = await fetchFromODS(requested_type, first_name, last_name, dob, district_student_ssid);
      } catch (e) {
        logger.error(`ODS fetch failed for the request ${request_id}.`);
        compositeJSON = null;
      }

      if (!compositeJSON) {
        await updateRequestStatus(request_id, null, 'failed');

        return;
      }

      logger.info('Converting to JSON');
      const mrTranscript = JSON.stringify(compositeJSON);

      logger.info('Update request status to completed');
      // 3. Store in composite JSON in the db and change status to completed or reviewS
      if (type_of_transcript === TRANSCRIPT_TYPE.ROP && status !== REQUEST_STATUS.READY_TO_EMAIL) {
        await updateRequestStatus(request_id, mrTranscript, REQUEST_STATUS.READY_TO_REVIEW);
        return;
      }
      else {
        await updateRequestStatus(request_id, mrTranscript, REQUEST_STATUS.COMPLETED);
      }

      // 4. Completed Email with download link
      const type = type_of_transcript.toLowerCase();
      const template = requested_type === REQUEST_TYPE.STUDENT ? 'REQUEST_APPROVED_STUDENT' : 'REQUEST_APPROVED_DISTRICT';

      const transcriptLink =
        requested_type === REQUEST_TYPE.STUDENT
          ? `${process.env.APP_BASE_URL}/transcript?requestId=${request_id}`
          : process.env.APP_BASE_URL;

      logger.info('Sending email');
      await emailer('Transcript Approved', release_to_email, template, transcriptLink);

      if (index === recordset.length - 1) {
        resolve();
      }
    });
  });
}

const cronProcess = async () => {
  // 1. Update status to processing for all approved transcript
  await updateApprovedStatus();

  // 2. Fetch all the processing transcript, update database & send email
  generateAndEmail(REQUEST_STATUS.PROCESSING);

  // 3. Fetch all the ready to email transcript, update & send email
  generateAndEmail(REQUEST_STATUS.READY_TO_EMAIL);
};

module.exports = {
  cronProcess
};
