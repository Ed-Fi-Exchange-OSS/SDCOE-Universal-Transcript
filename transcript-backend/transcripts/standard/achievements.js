const BaseEntity = require('./base');
const { DEFAULT_VALUE, REQUIRED_IF_EXISTS, OPTIONAL, TYPE_FIELD} = require('../constants');

class Achievements extends BaseEntity {
  initialize(data) {
    super.initialize(data);
  }


  getConfig() {
    return {
      'studentUniqueId': {
        'name': 'studentUniqueId',
        'parent': 'awardsAchievements',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'institutionId': {
        'name': 'institutionId',
        'parent': 'awardsAchievements',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'nameOfInstitution': {
        'name': 'nameOfInstitution',
        'parent': 'awardsAchievements',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'schoolYear': {
        'name': 'schoolYear',
        'parent': 'awardsAchievements',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'term': {
        'name': 'term',
        'parent': 'awardsAchievements',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'gradeLevel': {
        'name': 'gradeLevel',
        'parent': 'awardsAchievements',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'awardCode': {
        'name': 'awardCode',
        'parent': 'awardsAchievements',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'awardName': {
        'name': 'awardName',
        'parent': 'awardsAchievements',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      }
    };
  }
}

module.exports = Achievements;
