const BaseEntity = require('./base');
const Program = require('./programs');
const Achievements = require('./achievements');
const Demographics = require('./demographics');
const StateRequiredAssessment = require('./state-required-assessments');
const AcademicRecord = require('./academic-record');
const Guardian = require('./guardians');

const { DEFAULT_VALUE, REQUIRED, REQUIRED_IF_EXISTS, OPTIONAL, TYPE_FIELD, TYPE_ENTITY_ARRAY, CURRENT_DATE } = require('../constants');

class StudentTranscript extends BaseEntity {
  initialize(jsonData) {
    super.initialize(jsonData);
    this.demographics = !jsonData.demographics ? [] : jsonData.demographics.map((demographic) => new Demographics(demographic));
    this.guardians = !jsonData.guardians ? [] : jsonData.guardians.map((guardian) => new Guardian(guardian));
    this.studentAcademicRecords = !jsonData.studentAcademicRecords ? [] : jsonData.studentAcademicRecords.map((studentAcademicRecord) => new AcademicRecord(studentAcademicRecord));
    this.programs = !jsonData.programs ? [] : jsonData.programs.map((program) => new Program(program));
    this.studentAssessments = !jsonData.studentAssessments ? [] : jsonData.studentAssessments.map((studentAssessment) => new StateRequiredAssessment(studentAssessment));

    this.awardsAchievements = !jsonData.awardsAchievements ? [] : jsonData.awardsAchievements.map((awardsAchievement) => new Achievements(awardsAchievement));
  }

  getConfig() {
    return {
      'resourceId': {
        'name': 'resourceId',
        'parent': 'studentTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'transcriptRunDate': {
        'name': 'transcriptRunDate',
        'parent': 'studentTranscript',
        'isRequired': REQUIRED,
        'defaultValue': CURRENT_DATE,
        'type': TYPE_FIELD
      },
      'studentUniqueId': {
        'name': 'studentUniqueId',
        'parent': 'studentTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'studentUniqueIdType': {
        'name': 'studentUniqueIdType',
        'parent': 'studentTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'firstName': {
        'name': 'firstName',
        'parent': 'studentTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'lastSurname': {
        'name': 'lastSurname',
        'parent': 'studentTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'birthDate': {
        'name': 'birthDate',
        'parent': 'studentTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'birthSexDescriptor': {
        'name': 'birthSexDescriptor',
        'parent': 'studentTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'studentLocalId': {
        'name': 'studentLocalId',
        'parent': 'studentTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'studentIdentificationSystemDescriptor': {
        'name': 'studentIdentificationSystemDescriptor',
        'parent': 'studentTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'demographics': {
        'name': 'demographics',
        'parent': 'studentTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      },
      'guardians': {
        'name': 'guardians',
        'parent': 'studentTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      },
      'studentAcademicRecords': {
        'name': 'studentAcademicRecords',
        'parent': 'studentTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      },
      'programs': {
        'name': 'programs',
        'parent': 'studentTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      },
      'studentAssessments': {
        'name': 'studentAssessments',
        'parent': 'studentTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      },
      'awardsAchievements': {
        'name': 'awardsAchievements',
        'parent': 'studentTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      }
    };
  }
}

module.exports = StudentTranscript;
