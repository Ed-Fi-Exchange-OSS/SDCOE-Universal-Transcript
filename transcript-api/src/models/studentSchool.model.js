import bookshelf from '../db';

const TABLE_NAME = 'student_school';

/**
 * StudentSchool model
 */
class StudentSchool extends bookshelf.Model {
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

export default StudentSchool;
