const BaseEntity = require('./base');
const Address = require('./address');
const Telephone = require('./telephones');
const { DEFAULT_VALUE, REQUIRED, OPTIONAL, TYPE_FIELD, TYPE_ENTITY_ARRAY } = require('../constants');

class Guardian extends BaseEntity {
  initialize(data) {
    super.initialize(data);
    this.addresses = data.addresses ? data.addresses.map((address) => new Address(address)) : [];
    this.telephones = data.telephones ? data.telephones.map(
      (telephone) => new Telephone(telephone)
    ) : [];
  }

  getConfig() {
    return {
      'relationToStudent': {
        'name': 'relationToStudent',
        'parent': 'guardians',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'livesWith': {
        'name': 'livesWith',
        'parent': 'guardians',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'guardianId': {
        'name': 'guardianId',
        'parent': 'guardians',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'firstName': {
        'name': 'firstName',
        'parent': 'guardians',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'lastSurname': {
        'name': 'lastSurname',
        'parent': 'guardians',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'addresses': {
        'name': 'addresses',
        'parent': 'guardians',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      },
      'telephones': {
        'name': 'telephones',
        'parent': 'guardians',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_ENTITY_ARRAY
      }
    };
  }
}

module.exports = Guardian;
