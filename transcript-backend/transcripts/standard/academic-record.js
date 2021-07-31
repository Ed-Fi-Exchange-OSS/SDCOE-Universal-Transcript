const BaseEntity = require('./base');
const Transcript = require('./transcript');
const { DEFAULT_VALUE, REQUIRED, REQUIRED_IF_EXISTS, OPTIONAL, TYPE_FIELD, TYPE_ENTITY_ARRAY } = require('../constants');

class AcademicRecord extends BaseEntity {
  initialize(record) {
    super.initialize(record);
    this.courseTranscript = record.courseTranscript ? record.courseTranscript.map(
      (transcript) => new Transcript(transcript)
    ) : [];
  }

  getConfig() {
    return {
      'studentUniqueId': {
        'name': 'studentUniqueId',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'gradeLevel': {
        'name': 'gradeLevel',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'studentCounselorName': {
        'name': 'studentCounselorName',
        'parent': 'studentAcademicRecords',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'educationOrganizationId': {
        'name': 'educationOrganizationId',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'schoolId': {
        'name': 'schoolId',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'nameOfInstitution': {
        'name': 'nameOfInstitution',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'districtResourceId': {
        'name': 'districtResourceId',
        'parent': 'studentAcademicRecords',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'districtId': {
        'name': 'districtId',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'nameOfDistrict': {
        'name': 'nameOfDistrict',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'nameOfCounty': {
        'name': 'nameOfCounty',
        'parent': 'studentAcademicRecords',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'nameOfState': {
        'name': 'nameOfState',
        'parent': 'studentAcademicRecords',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'schoolYear': {
        'name': 'schoolYear',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'termDescriptor': {
        'name': 'termDescriptor',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'cumulativeEarnedCredits': {
        'name': 'cumulativeEarnedCredits',
        'parent': 'studentAcademicRecords',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseTranscript': {
        'name': 'courseTranscript',
        'parent': 'studentAcademicRecords',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      }
    };
  }


}

module.exports = AcademicRecord;
