const Transcript = require('../../../transcripts/standard/transcript');
const { DEFAULT_VALUE } = require('../../../transcripts/constants');

function mapTranscript(courseTranscript) {
  let transcriptList = courseTranscript.map((transcript) => {
    // Todo rename this to CourseTranscript
    const transcriptObject = new Transcript();

    transcriptObject.attemptedCredits = transcript.attemptedCredits;
    transcriptObject.earnedCredits = transcript.earnedCredits;
    transcriptObject.finalLetterGradeEarned = transcript.finalLetterGradeEarned;
    transcriptObject.finalNumericGradeEarned = transcript.finalNumericGradeEarned;
    transcriptObject.courseCode = transcript.courseCode;
    transcriptObject.courseTitle = transcript.courseTitle;
    transcriptObject.academicSubject = transcript.academicSubjectDescriptor;
    transcriptObject.localCourseCode = transcript.courseOfferings[0].localCourseCode;
    transcriptObject.localCourseTitle = DEFAULT_VALUE;
    transcriptObject.courseAttemptResult = transcript.courseAttemptResultDescriptor;
    transcriptObject.methodCreditEarned = transcript.methodCreditEarnedDescriptor;
    transcriptObject.courseNonacademic = DEFAULT_VALUE;
    transcriptObject.courseHonors = DEFAULT_VALUE;
    transcriptObject.courseCollegePrepCode = DEFAULT_VALUE;
    transcriptObject.courseRepeated = DEFAULT_VALUE;
    transcriptObject.courseCTE = DEFAULT_VALUE;
    transcriptObject.courseInstructor = transcript?.courseInstructor || DEFAULT_VALUE;
    transcriptObject.courseExitDate = transcript?.courseExitDate || DEFAULT_VALUE;
    transcriptObject.courseExitDate = transcript?.courseHours || DEFAULT_VALUE;
    transcriptObject.courseSection = transcript?.courseSection || DEFAULT_VALUE;

    return transcriptObject;
  });

  return transcriptList;
}

module.exports = mapTranscript;
