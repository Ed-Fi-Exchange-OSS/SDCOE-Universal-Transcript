const db = require('../db');
const TABLE_NAME = 'rop_courses';

const getAllCourses = async () => {
  return await db(TABLE_NAME)
    .select();
}

const addCourse = async (data) => {
  return await db(TABLE_NAME)
    .insert(data);
}

const getCourse = async (id) => {
  return await db(TABLE_NAME)
    .select()
    .where('id', id);
}

const getCourseByReqId = async (requestId) => {
  return await db(TABLE_NAME)
    .select()
    .where({ request_id: requestId, is_archieved: false })
}

const updateCourse = async (id, data) => {
  return await db(TABLE_NAME)
    .select()
    .where('id', id)
    .update(data);
}

const deleteCourse = async (id) => {
  return await db(TABLE_NAME)
    .select()
    .where('id', id)
    .del();
}

module.exports = {
  getAllCourses,
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getCourseByReqId
}
