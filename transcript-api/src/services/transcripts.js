const fs = require('fs');
const path = require('path');
const { SecurePdfBuilder, writeMetaData } = require('pdf-utils');
const { getCourseByReqId } = require('./ropTranscript');
const { renderTranscript: generateTranscript, standardFromJson } = require('transcript-backend');

const logger = require('../utils/logger').default;
const { getRandomFileName } = require('../utils/file');

const { TRANSCRIPT_TYPE } = require('../constants/transcript-type');
const TMP_PDF_LOCATION = process.env.TMP_PDF_LOCATION || '/tmp/renders/';

const {
  DIGITAL_SIGNING_MODE,
  VERIFICATION_KEY_DID,
  VERIFICATION_KEY_URN,
  SIGNING_KEY_URN,
  IS_DIGITAL_SIGNING_ENABLED,
} = process.env;

const TRANSCRIPT_ISSUER = 'sdcoe';

const renderTranscript = async (transcriptType, mrTranscript, filePath, requestId) => {
  let isSuccess = null;

  switch (transcriptType) {
    case TRANSCRIPT_TYPE.ROP: {
      const requestedCourses = await getCourseByReqId(requestId);

      isSuccess = await generateTranscript(TRANSCRIPT_TYPE.ROP, mrTranscript, filePath, requestedCourses);
      break;
    }

    case TRANSCRIPT_TYPE.STANDARD_PDF: {
      isSuccess = await generateTranscript(TRANSCRIPT_TYPE.STANDARD, mrTranscript, filePath);
      break;
    }

    case TRANSCRIPT_TYPE.JSON: {
      fs.writeFileSync(filePath, JSON.stringify(mrTranscript));
      isSuccess = true;
      break;
    }

    default:
      isSuccess = false;
  }

  return isSuccess;
};

const makePdfVerifiable = async (filePath, requestId) => {
  const issuerId = TRANSCRIPT_ISSUER;
  const jwtIdentifier = requestId;
  const signingKeyId = SIGNING_KEY_URN;
  // Can either be did or file
  const verifyingKeyId = DIGITAL_SIGNING_MODE === 'did' ? VERIFICATION_KEY_DID : VERIFICATION_KEY_URN;

  const securePdf = await new SecurePdfBuilder(filePath)
    .setIssuerId(issuerId)
    .setJwtIdentifier(jwtIdentifier)
    .setSigningKeyId(signingKeyId)
    .setVerifyingKeyId(verifyingKeyId)
    .build();

  return securePdf;
};

const getTranscriptPath = () => {
  return path.join(TMP_PDF_LOCATION, getRandomFileName());
};

const getTranscriptByOrder = async (transcriptType, requestId, order) => {
  const { mrTranscript } = order[0];
  const jsonData = JSON.parse(mrTranscript);
  const standardTranscript = standardFromJson(jsonData);
  const transcriptPath = getTranscriptPath();
  const isRendered = await renderTranscript(transcriptType, standardTranscript, transcriptPath, requestId);
  let finalFilePath = transcriptPath;

  if (isRendered) {
    if (transcriptType === TRANSCRIPT_TYPE.STANDARD_PDF || transcriptType === TRANSCRIPT_TYPE.ROP) {
      // Write MR-Transcript
      await writeMetaData(transcriptPath, 'mr-transcript', mrTranscript);
      if (JSON.parse(IS_DIGITAL_SIGNING_ENABLED)) {
        finalFilePath = await makePdfVerifiable(transcriptPath, requestId);
      }
    } else if (transcriptType === TRANSCRIPT_TYPE.JSON) {
      finalFilePath = transcriptPath;
    } else {
      logger.debug(`Transcript type ${transcriptType} could not be for ${requestId}.`);
    }
  }

  if (!finalFilePath) {
    logger.debug(`Transcript type ${transcriptType} could not be made verifiable ${requestId}.`);
  }

  return finalFilePath;
};

module.exports = {
  getTranscriptByOrder,
};
