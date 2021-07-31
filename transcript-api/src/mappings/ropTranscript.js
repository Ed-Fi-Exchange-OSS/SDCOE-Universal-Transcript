export const ropCourseMappings = (courses) => {
  if (Array.isArray(courses)) {
    return courses.map(course => {
      return mapData(course);
    })
  }
  return mapData(courses);
};

function mapData(course) {
  return {
    id: course.id,
    request_id: course.requestId,
    course_code: course.courseCode,
    course_title: course.courseTitle,
    course_term: course.courseTerm,
    is_archieved: course.isArchieved,
    requested_rop_certificate: course.requestedROPCertificate,
    requested_rop_transcript: course.requestedROPTranscript,
  };
}
