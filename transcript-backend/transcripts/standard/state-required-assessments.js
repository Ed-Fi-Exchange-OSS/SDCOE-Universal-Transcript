const BaseEntity = require('./base');
const { DEFAULT_VALUE, REQUIRED, REQUIRED_IF_EXISTS, OPTIONAL, TYPE_FIELD} = require('../constants');

// Todo Rename to StudentAssessment
class StateRequiredAssessment extends BaseEntity {
  initialize(sourceObject) {
    super.initialize(sourceObject);
  }

  getConfig() {
    return {
      'studentUniqueID': {
        'name': 'studentUniqueID',
        'parent': 'studentAssessments',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'institutionID': {
        'name': 'institutionID',
        'parent': 'studentAssessments',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'nameOfInstitution': {
        'name': 'nameOfInstitution',
        'parent': 'studentAssessments',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'date': {
        'name': 'date',
        'parent': 'studentAssessments',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'testType': {
        'name': 'testType',
        'parent': 'studentAssessments',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'testCode': {
        'name': 'testCode',
        'parent': 'studentAssessments',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'testName': {
        'name': 'testName',
        'parent': 'studentAssessments',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'testScore': {
        'name': 'testScore',
        'parent': 'studentAssessments',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'schoolYear': {
        'name': 'schoolYear',
        'parent': 'studentAssessments',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'term': {
        'name': 'term',
        'parent': 'studentAssessments',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'gradeLevel': {
        'name': 'gradeLevel',
        'parent': 'studentAssessments',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      }
    };
  }
}

module.exports = StateRequiredAssessment;
