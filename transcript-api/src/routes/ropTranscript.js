const router = require('express').Router();

const authenticate = require('../middlewares/authenticate');
const authorizeStaff = require("../middlewares/authorizeStaff");
const validateRole = require("../middlewares/validateRole");

const ropCourseController = require('../controllers/ropTranscript');

router.get('/', authenticate, validateRole, authorizeStaff, ropCourseController.getAllCourses);
router.post('/', authenticate, validateRole, ropCourseController.addCourse);
router.get('/:id', authenticate, validateRole, authorizeStaff, ropCourseController.getCourse);
router.put('/:id', authenticate, validateRole, authorizeStaff, ropCourseController.updateCourse);
router.delete('/:id', authenticate, validateRole, authorizeStaff, ropCourseController.deleteCourse);
router.get('/requestId/:requestId', authenticate, validateRole, authorizeStaff, ropCourseController.getCourseByReqId);

module.exports = router;

