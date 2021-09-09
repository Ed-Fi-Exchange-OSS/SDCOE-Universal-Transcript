const BaseEntity = require('./base');
const { DEFAULT_VALUE, REQUIRED, OPTIONAL, TYPE_FIELD, TYPE_ENTITY_ARRAY } = require('../constants');

class Race extends BaseEntity {
  initialize(raceDescriptor) {
    super.initialize(raceDescriptor);
  }

  getConfig() {
    return {
      'raceDescriptor': {
        'name': 'raceDescriptor',
        'parent': 'races',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      }
    };
  }
}

class Demographics extends BaseEntity {
  initialize(data) {
    super.initialize(data);
    this.races = !data.races ? [] : data.races.map((race) => new Race(race));
  }

  getConfig() {
    return {
      'gender': {
        'name': 'gender',
        'parent': 'demographics',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'hispanicLatinoEthnicity': {
        'name': 'hispanicLatinoEthnicity',
        'parent': 'demographics',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'races': {
        'name': 'races',
        'parent': 'demographics',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      }
    };
  }
}

module.exports = Demographics;
