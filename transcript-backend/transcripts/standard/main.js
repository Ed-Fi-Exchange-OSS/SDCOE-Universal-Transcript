const BaseEntity = require('./base');
const StudentTranscript = require('./student-transcript');
const { DEFAULT_VALUE, REQUIRED, TYPE_ENTITY } = require('../constants');

class MainTranscript extends BaseEntity {
  initialize(sourceObject) {
    super.initialize(sourceObject);
    this.studentTranscript = new StudentTranscript(sourceObject['studentTranscript']);
  }

  getConfig() {
    return {
      'studentTranscript': {
        'name': 'studentTranscript',
        'parent': 'root',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY
      }
    };
  }
}

module.exports = MainTranscript;