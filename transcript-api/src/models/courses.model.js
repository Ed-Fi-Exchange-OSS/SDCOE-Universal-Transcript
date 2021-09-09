import bookshelf from '../db';

const TABLE_NAME = 'courses';

/**
 * Courses model
 */
class Courses extends bookshelf.Model {
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

export default Courses;
