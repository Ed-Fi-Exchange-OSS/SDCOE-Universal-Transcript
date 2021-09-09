import bookshelf from '../db';

const TABLE_NAME = 'edfi_ods';

/**
 * EdfiODS model
 */
class EdfiODS extends bookshelf.Model {
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

export default EdfiODS;
