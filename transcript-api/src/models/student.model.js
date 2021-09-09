import bookshelf from '../db';

const TABLE_NAME = 'student';

/**
 * Student model
 */
class Student extends bookshelf.Model {
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

export default Student;
