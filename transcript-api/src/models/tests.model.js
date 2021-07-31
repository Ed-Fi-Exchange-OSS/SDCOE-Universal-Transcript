import bookshelf from '../db';

const TABLE_NAME = 'tests';

/**
 * Tests model
 */
class Tests extends bookshelf.Model {
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

export default Tests;
