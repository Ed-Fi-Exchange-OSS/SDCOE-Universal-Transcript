const constants = require('../api/constants');
const { readFile } = require('fs').promises;
const path = require('path');


/**
 * @param {String} url
 * @returns {Promise<String>}
 *
 * The function takes in a URL and performs a GET request at the given endpoint
 * to fetch the data for composite of a particular student
 */

async function fetchComposite(url) {
  /**
   * TODO: Modify the logic below
   */
  if (url.includes(constants.RESOURCE_STUDENT_ENROLLMENT)) {
    return readFile(path.join(__dirname, 'resources/composite-enrollments.json'), 'utf-8').then(JSON.parse);
  } else if (url.includes(constants.RESOURCE_STUDENT_TRANSCRIPT)) {
    return readFile(path.join(__dirname, 'resources/composite-transcript.json'), 'utf-8').then(JSON.parse);
  } else if (url.includes(constants.RESOURCE_EDUCATION_ORGANIZATION_HIERARCHIES)) {
    return readFile(path.join(__dirname, 'resources/composite-educational-organization.json'), 'utf-8').then(JSON.parse);
  } else {
    throw Error('Invalid url specified');
  }
}

module.exports = fetchComposite;
