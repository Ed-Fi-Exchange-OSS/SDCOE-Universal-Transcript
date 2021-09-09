const { v4: uuidv4 } = require('uuid');

const ropTranscriptModel = require('../models/ropTranscript');

const { ropCourseMappings } = require('../mappings/ropTranscript');
const { ropCourseSerialize } = require('../serializer/ropTranscript');

const getAllCourses = async () => {
  let courses = await ropTranscriptModel.getAllCourses();

  return ropCourseSerialize(courses);
};

const addCourse = async (course) => {
  for (let c of course) {
    c.id = uuidv4()
  }

  return await ropTranscriptModel.addCourse(ropCourseMappings(course));
};

const getCourse = async (id) => {
  let course = await ropTranscriptModel.getCourse(id);

  return ropCourseSerialize(course);
};


const getCourseByReqId = async (requestId) => {
  let course = await ropTranscriptModel.getCourseByReqId(requestId);

  return ropCourseSerialize(course);
}


const updateCourse = async (id, data) => {
  return await ropTranscriptModel.updateCourse(id, ropCourseMappings(data));
};


const deleteCourse = async (requestId) => {
  return await ropTranscriptModel.deleteCourse(requestId);
};

module.exports = {
  getAllCourses,
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getCourseByReqId
};
