const BaseEntity = require('./base');
const { DEFAULT_VALUE, REQUIRED, OPTIONAL, TYPE_FIELD} = require('../constants');

class Program extends BaseEntity {
  initialize(sourceObject) {
    super.initialize(sourceObject);
  }

  getConfig() {
    return {
      'studentUniqueID': {
        'name': 'studentUniqueID',
        'parent': 'programs',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'educationOrganizationId': {
        'name': 'educationOrganizationId',
        'parent': 'programs',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'nameOfInstitution': {
        'name': 'nameOfInstitution',
        'parent': 'programs',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'schoolYear': {
        'name': 'schoolYear',
        'parent': 'programs',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'term': {
        'name': 'term',
        'parent': 'programs',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'gradeLevel': {
        'name': 'gradeLevel',
        'parent': 'programs',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'programID': {
        'name': 'programID',
        'parent': 'programs',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'programTitle': {
        'name': 'programTitle',
        'parent': 'programs',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'programTypeDescriptor': {
        'name': 'programTypeDescriptor',
        'parent': 'programs',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'beginDate': {
        'name': 'beginDate',
        'parent': 'programs',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'endDate': {
        'name': 'endDate',
        'parent': 'programs',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'reasonExitedDescriptor': {
        'name': 'reasonExitedDescriptor',
        'parent': 'programs',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      }
    };
  }
}

module.exports = Program;
