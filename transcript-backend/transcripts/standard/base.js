require('assert');
const { DEFAULT_VALUE, REQUIRED, TYPE_ENTITY_ARRAY, TYPE_ENTITY } = require('../constants');

class BaseEntity {
  constructor(sourceObject) {
    if (sourceObject) this.initialize(sourceObject);
  }

  initialize(sourceObject) {
    for (const [key] of Object.entries(this.getConfig())) {
      if (sourceObject[key] === null || sourceObject[key] === undefined)
        this[key] = DEFAULT_VALUE;
      else
        this[key] = sourceObject[key];
    }
  }

  toString() {
    return JSON.stringify(this);
  }

  getConfig() {
    throw new Error('Must implement getConfig');
  }

  getName() {
    return this.constructor.name;
  }

  validate() {
    let invalids = [];

    for (const [key, value] of Object.entries(this.getConfig())) {
      if (value['isRequired'] === REQUIRED)
        if (this[key] === null || this[key] === undefined) {
          invalids.push({
            config: value,
            message: 'Is Null or Undefined',
            entity: this.getName()
          });
        }

      if (value['type'] === TYPE_ENTITY_ARRAY)
        if (Array.isArray(this[key]))
          for (const member of this[key]) {
            if (member instanceof BaseEntity)
              invalids = invalids.concat(member.validate());
            else {
              invalids.push({
                config: value,
                message: `Member of ${key} is not a BaseEntity object`,
                entity: this.getName()
              });
            }
          }
        else {
          invalids.push({
            config: value,
            message: 'Is not an array',
            entity: this.getName()
          });
        }
      else if (value['type'] === TYPE_ENTITY)
        if (this[key] instanceof BaseEntity)
          invalids = invalids.concat(this[key].validate());
        else {
          invalids.push({
            config: value,
            message: 'Is Not BaseEntity object',
            entity: this.getName()
          });
        }
    }

    return invalids;
  }
}

module.exports = BaseEntity;
