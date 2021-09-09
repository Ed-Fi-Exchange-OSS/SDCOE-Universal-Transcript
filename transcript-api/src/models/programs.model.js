import bookshelf from '../db';

const TABLE_NAME = 'programs';

/**
 * Programs model
 */
class Programs extends bookshelf.Model {
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

export default Programs;
