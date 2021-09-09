import bookshelf from '../db';

const TABLE_NAME = 'requests';

/**
 * Request model: list of all certificates request
 */
class Requests extends bookshelf.Model {
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

export default Requests;
