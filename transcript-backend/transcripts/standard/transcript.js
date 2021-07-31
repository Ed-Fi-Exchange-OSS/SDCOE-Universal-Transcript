const BaseEntity = require('./base');
const { DEFAULT_VALUE, REQUIRED, REQUIRED_IF_EXISTS, OPTIONAL, TYPE_FIELD} = require('../constants');

// Todo rename this to CourseTranscript
class Transcript extends BaseEntity {
  initialize(sourceObject) {
    super.initialize(sourceObject);
  }

  getConfig() {
    return {
      'attemptedCredits': {
        'name': 'attemptedCredits',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'earnedCredits': {
        'name': 'earnedCredits',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'finalLetterGradeEarned': {
        'name': 'finalLetterGradeEarned',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'finalNumericGradeEarned': {
        'name': 'finalNumericGradeEarned',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseCode': {
        'name': 'courseCode',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseTitle': {
        'name': 'courseTitle',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'academicSubject': {
        'name': 'academicSubject',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'localCourseCode': {
        'name': 'localCourseCode',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'localCourseTitle': {
        'name': 'localCourseTitle',
        'parent': 'courseTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseAttemptResult': {
        'name': 'courseAttemptResult',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'methodCreditEarned': {
        'name': 'methodCreditEarned',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseNonacademic': {
        'name': 'courseNonacademic',
        'parent': 'courseTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseHonors': {
        'name': 'courseHonors',
        'parent': 'courseTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseCollegePrepCode': {
        'name': 'courseCollegePrepCode',
        'parent': 'courseTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseRepeated': {
        'name': 'courseRepeated',
        'parent': 'courseTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseCTE': {
        'name': 'courseCTE',
        'parent': 'courseTranscript',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseInstructor': {
        'name': 'courseInstructor',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'courseExitDate': {
        'name': 'courseExitDate',
        'parent': 'courseTranscript',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      }
    };
  }
}

module.exports = Transcript;
