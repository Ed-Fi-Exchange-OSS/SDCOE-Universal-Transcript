const BaseEntity = require('./base');
const { DEFAULT_VALUE, REQUIRED, REQUIRED_IF_EXISTS, OPTIONAL, TYPE_FIELD} = require('../constants');

class Address extends BaseEntity {
  initialize(address) {
    super.initialize(address);
  }

  getConfig() {
    return {
      'addressType': {
        'name': 'addressType',
        'parent': 'addresses',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'streetNumberName': {
        'name': 'streetNumberName',
        'parent': 'addresses',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'apartmentRoomSuiteNumber': {
        'name': 'apartmentRoomSuiteNumber',
        'parent': 'addresses',
        'isRequired': REQUIRED_IF_EXISTS,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'city': {
        'name': 'city',
        'parent': 'addresses',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'state': {
        'name': 'state',
        'parent': 'addresses',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'postalCode': {
        'name': 'postalCode',
        'parent': 'addresses',
        'isRequired': REQUIRED,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      },
      'nameOfCounty': {
        'name': 'nameOfCounty',
        'parent': 'addresses',
        'isRequired': OPTIONAL,
        'defaultValue': DEFAULT_VALUE,
        'type': TYPE_FIELD
      }
    };
  }
}

module.exports = Address;
