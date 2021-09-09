import bookshelf from '../db';

const TABLE_NAME = 'awards';

/**
 * Users model
 */
class Awards extends bookshelf.Model {
  /**
   * Get table name.
   */
  get tableName() {
    return TABLE_NAME;
  }

  /**
   * Table has timestamps.
   */
  get hasTimestamps() {
    return true;
  }
}

export default Awards;
