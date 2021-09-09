const fs = require('fs');
const main = require('../../index');
const { getJsonTranscriptById, getJsonTranscripByDemographics } = require('./jsonTranscript');
const isFormatAvailable = require('./transcriptFormat');

function transcritKeyValidator(data) {
  let res = {
    success: true
  };
  const keys = Object.keys(data);
  keys.forEach((key) => {
    if (!data[key]) {
      res = { success: false, error: `Option ${key} is missing` };

    }
  });

  return res;
}

/**
 * This function takes the PDF type i.e either standard or rop and format i.e. pdf or json as an argument
 * and returns either true, false or throws error
 *
 * @param args
 */
function generateJsonTranscript(...args) {
  const [
    type,
    format,
    destination = 'transcript.json',
    getTranscriptByDemoGraphics,
    getTrascriptByStudentId
  ] = args;

  const {
    odsConfig,
    firstName,
    lastName,
    dateOfBirth
  } = getTranscriptByDemoGraphics;

  const { studentId } = getTrascriptByStudentId;

  if (isFormatAvailable(type, format)) {
    const isValidgetTranscriptByDemoGraphics = transcritKeyValidator(getTranscriptByDemoGraphics);
    const isValidgetTrascriptByStudentId = transcritKeyValidator(getTrascriptByStudentId);

    if (
      isValidgetTrascriptByStudentId.success && isValidgetTranscriptByDemoGraphics.success ||
      isValidgetTranscriptByDemoGraphics.error && isValidgetTrascriptByStudentId.success) {
      return getJsonTranscriptById(odsConfig, studentId, destination);
    }

    if (isValidgetTranscriptByDemoGraphics.success && isValidgetTrascriptByStudentId.error) {
      return getJsonTranscripByDemographics(odsConfig, firstName, lastName, dateOfBirth, destination);
    }

    if (isValidgetTrascriptByStudentId.error) {
      throw new Error(`ERROR: ${isValidgetTrascriptByStudentId.error}`);
    }

    if (isValidgetTranscriptByDemoGraphics.error) {
      throw new Error(`ERROR: ${isValidgetTranscriptByDemoGraphics.error}`);
    }
  }

  throw new Error(`ERROR: JSON format is not available for ${type}. JSON is only supported for standard type.`);

}

/**
 * This function takes the PDF type i.e either standard or rop,
 * format i.e. pdf or json, fileName i.e. source,
 * destination i.e. path/location where file to be stored and
 * selectedRopCourses i.e selected ROP Courses
 * and stores the certificate or
 *
 * @param { String } type
 * @param { String } format
 * @param { String } fileName
 * @param { String } destination
 * @param { Object } selectedROPCourses
 */

function generatePdfTranscript(type, format, fileName, destination = 'transcript.pdf', selectedROPCourses) {
  try {
    const data = fs.readFileSync(fileName, 'utf8');
    const jsonData = JSON.parse(data);
    const standardTranscript = main.standardFromJson(jsonData);

    if (isFormatAvailable(type, format)) {
      main
        .renderTranscript(type, standardTranscript, `${destination}`, selectedROPCourses)
        .then(() => {
          console.log('SUCCESS');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  } catch (e) {
    console.log('Error', e.stack);
  }
}

module.exports = {
  generateJsonTranscript,
  generatePdfTranscript
};
