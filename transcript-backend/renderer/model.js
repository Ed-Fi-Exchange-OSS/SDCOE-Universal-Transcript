const DOCTYPE = require('../transcripts/constants');

/**
 *
 * @param {string} transcript
 */
function getHeader(transcript) {

  let maxRecord = undefined;

  for (const academicRecord of transcript.studentTranscript.studentAcademicRecords) {
    if (!maxRecord) {
      maxRecord = academicRecord;
    } else if (maxRecord.schoolYear < academicRecord.schoolYear) {
      maxRecord = academicRecord;
    }
  }

  return {
    schoolName: maxRecord?.nameOfInstitution,
    schoolAddress: '',
    schoolPhone: '',
    schoolWebsite: ''
  };
}

/**
 *
 * @param {MainTranscript} transcript
 */
function getFooter(transcript) {
  const d = new Date();
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

  return {
    'dateRendered': `${mo}/${da}/${ye}`
  };
}

function formatDescriptor(descriptor) {
  if (!descriptor)
    return 'Empty';

  const pos = descriptor.indexOf('#');

  if (pos < 0)
    return descriptor;
  else
    return descriptor.substring(pos + 1, descriptor.length);

}

function formatDate(date) {
  if (!date)
    return '00/00/0000';

  const d = new Date(date);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

  return `${mo}/${da}/${ye}`;
}


/**
 *
 * @param {string} transcript
 */
function getStudentGuardianInfo(transcript) {
  let selected = {};
  for (const guardian of transcript.studentTranscript.guardians) {
    if (guardian.livesWith) {
      selected = guardian;
      break;
    }
  }

  const selectedTelephone = selected.telephones[0];
  const selectedAddress = selected.addresses[0];

  return {
    firstName: selected.firstName,
    lastSurname: selected.lastSurname,
    streetNumberName: selectedAddress?.streetNumberName,
    apartmentRoomSuiteNumber: selectedAddress?.apartmentRoomSuiteNumber,
    city: selectedAddress?.city,
    state: formatDescriptor(selectedAddress?.state),
    postalCode: selectedAddress?.postalCode,
    telephoneNumber: selectedTelephone?.telephoneNumber
  };
}

/**
 *
 * @param {string} transcript
 */
function getStudentInfo(transcript) {

  const { studentTranscript, studentTranscript: { demographics } } = transcript;
  const demographic = demographics[0];

  return {
    firstName: studentTranscript.firstName,
    lastSurname: studentTranscript.lastSurname,
    studentLocalId: studentTranscript.studentLocalId,
    birthDate: formatDate(studentTranscript.birthDate),
    gender: formatDescriptor(demographic.gender),
    studentUniqueId: studentTranscript.studentUniqueId,
    guardian: getStudentGuardianInfo(transcript)
  };
}

/**
 * For sorting academic records in ascending order.
 *
 * Switch (-1 and 1) for descending order
 *
 * @param recordA
 * @param recordB
 * @returns {number}
 */
function compareAcademicRecords(recordA, recordB) {
  let ret = 0;

  if (recordA.schoolYear > recordB.schoolYear)
    ret = 1;
  else if (recordA.schoolYear < recordB.schoolYear)
    ret = -1;

  if (ret === 0)
    ret = formatDescriptor(recordA.termDescriptor) === 'Fall Semester' ? -1 : 1;

  return ret;
}


function compareAchievements(achA, achB) {
  let ret = parseInt(achA.yearOfAward) - parseInt(achB.yearOfAward);
  ret = (ret === 0) ? parseInt(achA.monthOfAward) - parseInt(achB.monthOfAward) : ret;
  return ret;
}

/**
 *
 * @param {MainTranscript} transcript
 */
function getTableOfScores(transcript) {
  return {
    records: transcript.studentTranscript.studentAcademicRecords.map(
      (ar) => {

        return {
          schoolYear: ar.schoolYear,
          termDescriptor: formatDescriptor(ar.termDescriptor),
          nameOfInstitution: ar.nameOfInstitution,
          transcript: ar.courseTranscript.map((ct) => {
            return {
              courseCode: ct.courseCode,
              courseTitle: ct.courseTitle,
              finalLetterGradeEarned: ct.finalLetterGradeEarned,
              attemptedCredits: ct.attemptedCredits,
              earnedCredits: ct.earnedCredits
            };
          }),
          CMP: ar.courseTranscript.map((ct) => parseInt(ct.earnedCredits)).reduce((a, b) => a + b, 0),
          ATT: ar.courseTranscript.map((ct) => parseInt(ct.attemptedCredits)).reduce((a, b) => a + b, 0)
        };
      }).sort(compareAcademicRecords)
  };
}


/**
 *
 * @param {MainTranscript} transcript
 */
function getAchievements(transcript) {
  const awards = transcript.studentTranscript.awardsAchievements.map((aw) => {
    return {
      monthOfAward: '',
      yearOfAward: aw.schoolYear?.toString()?.substring(0, 4),
      code: formatDescriptor(aw.awardCode),
      title: aw.awardName,
      score: ''
    };
  });

  const assessments = transcript.studentTranscript.studentAssessments.map((as) => {

    return {
      monthOfAward: formatDate(as.date).substring(0, 2),
      yearOfAward: formatDate(as.date).substring(6, 10),
      code: as.testCode,
      title: as.testName,
      score: as.testScore
    };
  });

  const programs = transcript.studentTranscript.programs.map((pr) => {
    return {
      monthOfAward: formatDate(pr.beginDate)?.substring(0, 2),
      yearOfAward: formatDate(pr.beginDate)?.substring(6, 10),
      code: pr.programID,
      title: pr.programTitle,
      score: ''
    };
  });

  let ret = (awards.concat(assessments).concat(programs))
    .sort(compareAchievements)
    .map((ach) => {
      if (!ach.monthOfAward)
        ach.monthOfAward = '00';

      if (!ach.yearOfAward)
        ach.yearOfAward = '0000';

      return ach;
    });

  return { records: ret };
}

/**
 *
 * @param {MainTranscript} transcript
 */
function getCreditSummary(transcript) {
  const completed = {};
  let totalComp = 0;

  for (const ar of transcript.studentTranscript.studentAcademicRecords) {
    for (const ct of ar.courseTranscript) {
      let academicSubject = formatDescriptor(ct.academicSubject);

      if (completed[academicSubject] === undefined)
        completed[academicSubject] = 0;

      completed[academicSubject] += parseInt(ct.earnedCredits);

      totalComp += parseInt(ct.earnedCredits);
    }
  }

  return { summary: { subjects: completed, total: totalComp } };
}

function formatDOB(dob) {
  const date = new Date(dob);
  const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(date);

  return `${month} ${day}, ${year}`;
}

/**
 *
 * @param studentAcademicRecords
 * @param ropRequestedCourses
 * @returns {{}}
 */
function getSelectedAcademicRecords(studentAcademicRecords, ropRequestedCourses) {
  let selectedStudentAcademicRecords = {}; // to store the student academic records
  let coursesFiltered = []; // to store requested courses records

  studentAcademicRecords.forEach((record) => {
    let selectedCourses = [];
    // filter the requsted courses from the large response data 
    ropRequestedCourses.forEach(course => {
      let recordTermDescriptor = `${formatDescriptor(record.termDescriptor).split(' ')[0]}_${record.schoolYear}`;
      if (course.courseTerm === recordTermDescriptor) {
        let filtered = record.courseTranscript.filter(r => {
          return course.courseCode === r.courseCode;
        });

        for (let course of filtered) {
          course.courseTerm = `${formatDescriptor(record.termDescriptor)} ${record.schoolYear}`;
        }

        selectedCourses.push(...filtered);
      }
    });

    coursesFiltered.push(...selectedCourses);

    selectedStudentAcademicRecords = {
      ...selectedStudentAcademicRecords,
      nameOfInstitution: record.nameOfInstitution,
      schoolYear: record.schoolYear,
      courseTranscript: coursesFiltered
    };
  });

  return selectedStudentAcademicRecords;
}

/**
 *
 * @param {transcript} transcript records that needs to grouped together based on the courseCode
 * @return {Object} Returns the array of courses
 */
function groupTranscriptData({ courseTranscript }) {
  const resultCourse = [];

  courseTranscript.forEach(course => {
    const { courseCode, earnedCredits } = course;

    // Check if array is not empty
    if (resultCourse.length) {
      // Get the index of the current [old] course in the resultCourse Array
      const foundItemIndex = resultCourse.findIndex(el => el.courseCode === course.courseCode);
      // Not found in the resultCourse Array, add the element in the resultCourse Array
      if (foundItemIndex === -1) {
        newCourseStructure(courseCode, earnedCredits, course);

      } else {
        resultCourse[foundItemIndex].sectionHours += earnedCredits;
        resultCourse[foundItemIndex].coursesInfo.push(course);
      }
    } else {
      // When there are no element in the resultCourse Array
      // Add the current course from the old array to the resultCourse Array with new structure
      newCourseStructure(courseCode, earnedCredits, course);
    }
  });

  function newCourseStructure(courseCode, earnedCredits, course) {
    return resultCourse.push({
      courseCode,
      sectionHours: earnedCredits,
      coursesInfo: [course]
    });
  }

  return resultCourse;
}

/**
 *
 * @param standardTranscriptData
 * @param otherData
 * @returns {{firstName: *, transcript: [], gender: *, certificate: {}, birthDate: string, lastSurname: *}}
 */
function getROPCertificateHolderInfo(standardTranscriptData, otherData) {
  const { studentAcademicRecords } = standardTranscriptData.studentTranscript;
  const { firstName, lastSurname, gender, birthDate } = getStudentInfo(standardTranscriptData);

  //filters based on the order request whether the request is for transcript or certificate
  const ropCertificateCourses = otherData.filter(course => course.requestedROPCertificate);
  const ropTranscriptCourses = otherData.filter(course => course.requestedROPTranscript);

  const ropCertificateRecords = getSelectedAcademicRecords(studentAcademicRecords, ropCertificateCourses);
  let ropTranscriptRecords = getSelectedAcademicRecords(studentAcademicRecords, ropTranscriptCourses);
  ropTranscriptRecords = groupTranscriptData(ropTranscriptRecords);

  return {
    firstName,
    lastSurname,
    gender,
    birthDate: formatDOB(birthDate),
    certificate: ropCertificateRecords,
    transcript: ropTranscriptRecords
  };
}

/**
 *
 * @param documentType
 * @param standardTranscriptData
 * @param otherData
 * @returns {{transcript: {achievements: {records: *}, footer: *, studentInfo: {firstName: *, gender: *, studentUniqueId: *, guardian: *, birthDate: *, lastSurname: *, studentLocalId: *}, creditSummary: {summary: {total: *, subjects: *}}, header: {schoolPhone: string, schoolAddress: string, schoolWebsite: string, schoolName: *}, tableOfScores: {records: *}}}|{transcript: {courses: {courses: *, totalHours: *}, studentInfo: {firstName: *, gender: *, birthDate: *, lastSurname: *}, sdcoeLogo: string}, certificate: []}}
 */
function getHandlebarModel(documentType, standardTranscriptData, otherData) {
  switch (documentType) {
    case DOCTYPE.STANDARD:
      return getStandardTranscriptData(standardTranscriptData, otherData);

    case DOCTYPE.ROP:
      return getROPTranscriptData(standardTranscriptData, otherData);

    default:
      break;
  }

}

/**
 *
 * @param standardTranscriptData
 * @param otherData
 * @returns {{transcript: {achievements: {records: *}, footer: {dateRendered: string}, studentInfo: {firstName: *, gender: *, studentUniqueId: *, guardian: *, birthDate: *, lastSurname: *, studentLocalId: *}, creditSummary: {summary: {total: number, subjects: {}}}, header: {schoolPhone: string, schoolAddress: string, schoolWebsite: string, schoolName: ({parent: string, isRequired: string, defaultValue: null, name: string, type: string}|{parent: string, isRequired: string, defaultValue: null, name: string, type: string}|{parent: string, isRequired: string, defaultValue: null, name: string, type: string}|{parent: string, isRequired: string, defaultValue: null, name: string, type: string}|string|null)}, tableOfScores: {records: *}}}}
 */
function getStandardTranscriptData(standardTranscriptData, otherData) {
  return {
    transcript: {
      header: getHeader(standardTranscriptData),
      studentInfo: getStudentInfo(standardTranscriptData),
      tableOfScores: getTableOfScores(standardTranscriptData),
      achievements: getAchievements(standardTranscriptData),
      creditSummary: getCreditSummary(standardTranscriptData),
      footer: getFooter(standardTranscriptData)
    }
  };
}

/**
 *
 * @param standardTranscriptData
 * @param otherData
 * @returns {{transcript: {courses: {courses: *[], totalHours: number}, studentInfo: {firstName: *, gender: *, birthDate: string, lastSurname: *}, sdcoeLogo: string}, certificate: []}}
 */
function getROPTranscriptData(standardTranscriptData, otherData) {
  const ropCertificates = [];

  const {
    firstName,
    lastSurname,
    gender,
    birthDate,
    certificate,
    transcript,
    certificate: { schoolYear, nameOfInstitution }
  } = getROPCertificateHolderInfo(standardTranscriptData, otherData);

  certificate.courseTranscript.forEach(course => {
    ropCertificates.push({
      firstName,
      lastSurname,
      dateOfIssue: schoolYear,
      nameOfInstitution: nameOfInstitution,
      courseTitle: course.courseTitle,
      ropSticker: process.env.ROP_STICKER,
      associateSticker: process.env.ROP_COLLEGE_ASSOCIATE_STICKER,
      superintendentSignature: process.env.SUPERITENDENT_SIGNATURE,
      firstSeniorDirectorSignature: process.env.SENIOR_DIRECTOR_FIRST,
      secondSeniorDirectorSignature: process.env.SENIOR_DIRECTOR_SECOND
    });
  });

  let totalHours = 0;
  for (let course of transcript) {
    totalHours += parseFloat(course.sectionHours || 0);
  }

  return {
    certificate: ropCertificates,
    transcript: {
      sdcoeLogo: process.env.SDCOE_LOGO,
      studentInfo: {
        firstName,
        lastSurname,
        gender,
        birthDate
      },
      courses: {
        totalHours,
        courses: transcript
      }
    }
  };
}

module.exports = {
  getHandlebarModel,
  formatDate,
  formatDOB,
  getHeader,
  getFooter,
  getStudentInfo,
  formatDescriptor,
  getTableOfScores,
  getAchievements,
  getCreditSummary,
  getROPTranscriptData,
  getStudentGuardianInfo,
  getStandardTranscriptData,
  getROPCertificateHolderInfo
};
