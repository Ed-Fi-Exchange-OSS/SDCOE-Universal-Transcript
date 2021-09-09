const logger = require('../utils/logger').default;
const ropCourseService = require('../services/ropTranscript');

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await ropCourseService.getAllCourses();

    res.status(200).json({
      messages: courses,
    });
  } catch (e) {
    logger.error('Get all ROP Courses error', e);
    res.status(500).json({ error: 'Error getting all ROP requested courses. ' + e });
  }
};

const addCourse = async (req, res, next) => {
  try {
    await ropCourseService.addCourse(req.body);

    res.status(200).json({
      messages: 'ROP course  added successfully',
    });
  } catch (e) {
    logger.error('Add ROP course error', e);
    res.status(405).json({ error: 'Error adding new ROP course. ' + e });
  }
};

const getCourse = async (req, res, next) => {
  try {
    const course = await ropCourseService.getCourse(req.params.id);

    res.status(200).json({
      messages: course,
    });
  } catch (e) {
    logger.error('Get requested ROP course error', e);
    res.status(404).json({ error: 'Requested ROP course not be found' });
  }
};

const getCourseByReqId = async (req, res, next) => {
  try {
    const course = await ropCourseService.getCourseByReqId(req.params.requestId);

    res.status(200).json({
      messages: course,
    });
  } catch (e) {
    logger.error('Get Requested Rop course by request Id error', e);
    res.status(404).json({ error: 'Requested Rop course not to be found' });
  }
};

const updateCourse = async (req, res, next) => {
  const id = req.params.id;

  try {
    await ropCourseService.updateCourse(id, req.body);

    res.status(200).json({
      messages: 'Course has been successfully updated',
    });
  } catch (e) {
    logger.error('Update course error', e);
    res.status(304).json({ error: 'Update operation for course failed' });
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    await ropCourseService.deleteCourse(req.params.id);

    res.status(200).json({
      messages: 'Course deleted successfully',
    });
  } catch (e) {
    logger.error('Delete course error', e);
    res.status(304).json({ error: 'Delete operation failed for ROP courses' });
  }
};

module.exports = {
  getAllCourses,
  addCourse,
  getCourse,
  updateCourse,
  deleteCourse,
  getCourseByReqId,
};
