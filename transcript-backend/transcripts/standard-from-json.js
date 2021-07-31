const MainTranscript = require('./standard/main');

/**
 *
 * @param jsonArray
 * @returns {MainTranscript}
 */
function standardFromJson(jsonArray) {
  return new MainTranscript(jsonArray);
}

module.exports = { standardFromJson };

