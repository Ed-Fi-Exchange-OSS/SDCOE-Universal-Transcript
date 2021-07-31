const constants = require('./constants');

function getAllEducationOrganizationHierarchies(api) {
  return api.queryComposite(constants.RESOURCE_EDUCATION_ORGANIZATION_HIERARCHIES);
}

function getAllStudentTranscripts(api) {
  return api.queryComposite(constants.RESOURCE_STUDENT_TRANSCRIPT);
}

function getEducationOrganizationHierarchiesBySchoolId(api, schoolId) {
  return api.queryComposite(constants.RESOURCE_EDUCATION_ORGANIZATION_HIERARCHIES,
    { 'schoolId': schoolId });
}

function getStudentTranscriptsByDemographics(api, firstName, lastName, dateOfBirth) {
  return api.queryComposite(constants.RESOURCE_STUDENT_TRANSCRIPT,
    {
      'firstName': firstName,
      'lastSurname': lastName,
      'birthDate': dateOfBirth?.substring(0, 10)
    });
}

function getStudentTranscriptsByStudentId(api, studentId) {
  return api.queryComposite(constants.RESOURCE_STUDENT_TRANSCRIPT,
    {
      'studentUniqueId': studentId
    });
}

module.exports = {
  getAllEducationOrganizationHierarchies,
  getAllStudentTranscripts,
  getEducationOrganizationHierarchiesBySchoolId,
  getStudentTranscriptsByDemographics,
  getStudentTranscriptsByStudentId
};

