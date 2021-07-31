export const ropCourseSerialize = (courses) => {
  return courses.map(course => {
    return {
      id: course.id,
      requestId: course.request_id,
      courseCode: course.course_code,
      courseTitle: course.course_title,
      courseTerm: course.course_term,
      requestedROPCertificate: course.requested_rop_certificate,
      requestedROPTranscript: course.requested_rop_transcript,
      isArchieved: course.is_archieved
    };
  });
};
