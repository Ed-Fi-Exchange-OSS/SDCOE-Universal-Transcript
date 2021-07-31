require('fs');
const main = require('../../index');

/**
 * This function takes odsConfigFile and studentID as an argument
 * and store the json response on file & returns  status
 * @param { Object } odsConfigs Pass an array of ods configurations
 * @param { String } studentId
 */
function getJsonTranscriptById(odsConfigs, studentId) {
  let returnValue = {};
  main
    .searchTranscriptByStudentId(odsConfigs, studentId)
    .then((data) => {
      returnValue = data;
    })
    .catch(function(e) {
      console.error(e);
    });

  return returnValue;
}

/**
 * This function takes odsConfigFile and studentID as an argument
 * and store the json response on file & returns  status
 * @param { Object } odsConfigs Pass an array of ods configurations
 * @param { String } firstName
 * @param { String } lastName
 * @param { String } dateOfBirth
 *
 */
function getJsonTranscriptByDemographics(odsConfigs, firstName, lastName, dateOfBirth) {
  let returnValue = {};
  main
    .searchTranscriptByDemographics(odsConfigs, firstName, lastName, dateOfBirth)
    .then((data) => {
      returnValue = data;
    })
    .catch(function(e) {
      console.error(e);
    });

  return returnValue;
}


module.exports = { getJsonTranscriptById, getJsonTranscriptByDemographics };
