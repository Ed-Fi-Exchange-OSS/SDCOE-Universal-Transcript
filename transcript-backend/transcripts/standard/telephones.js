const BaseEntity = require('./base');
const { DEFAULT_VALUE, REQUIRED_IF_EXISTS, TYPE_FIELD} = require('../constants');

class Telephone extends BaseEntity {
  initialize(sourceObject) {
    super.initialize(sourceObject);
  }

  getConfig() {
    return {
      'telephoneNumber': {
        'name': 'telephoneNumber',
        'parent': 'telephones',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'telephoneNumberType': {
        'name': 'telephoneNumberType',
        'parent': 'telephones',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      }
    };
  }
}

module.exports = Telephone;
