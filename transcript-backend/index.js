const { standardFromJson } = require('./transcripts/standard-from-json');
const { renderTranscript } = require('./renderer/render-transcript');
const { searchTranscriptByDemographics, searchTranscriptByStudentId } = require('./transcripts/search-transcript');

module.exports = {
  searchTranscriptByStudentId,
  searchTranscriptByDemographics,
  renderTranscript,
  standardFromJson
};
