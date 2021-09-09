const mapTranscript = require('./transcripts');
const AcademicRecord = require('../../../transcripts/standard/academic-record');
const { DEFAULT_VALUE } = require('../../../transcripts/constants');

/**
 * @param {*} compositeTranscript
 * @param {*} educationInstitute
 * @param {*} enrollmentComposite
 * @returns {Array<Object>}
 *
 * The function takes in the 3 composites
 * and returns a list of AcademicRecord Objects
 */
function mapAcademicRecords(compositeTranscript, educationInstitute, enrollmentComposite) {
  const academicRecord = compositeTranscript.academicRecord;

  // transcript.academicRecord is a list
  // The code below tries to map each item in the list
  // and creates an AcademicRecord object for each of them

  const academicRecordList = academicRecord.map((academicRecord) => {
    let school =
      educationInstitute.filter((institute) => institute.schoolId === academicRecord.educationOrganizationId)[0] || [];

    // Commented out because this maybe needed in the future
    // let enrollmentInformation =
    //   enrollmentComposite.enrollment.filter(({ schoolId }) => school.schoolId === schoolId)[0] || [];
    let enrollmentInformation = [];

    const academicRecordObject = new AcademicRecord();

    academicRecordObject.studentUniqueId = compositeTranscript.studentUniqueId;
    academicRecordObject.gradeLevel = enrollmentInformation.length ? enrollmentInformation.entryGradeLevelDescriptor : null;
    academicRecordObject.studentCounselorName = DEFAULT_VALUE;
    academicRecordObject.educationOrganizationId = school.schoolId;
    academicRecordObject.schoolId = school.schoolId;

    academicRecordObject.nameOfInstitution = school.nameOfInstitution;
    academicRecordObject.districtResourceId = school.districtResourceId;
    academicRecordObject.districtId = school.districtId;
    academicRecordObject.nameOfDistrict = school.nameOfDistrict;
    academicRecordObject.nameOfCounty = null;
    academicRecordObject.nameOfState = null;
    academicRecordObject.schoolYear = academicRecord.schoolYear;
    academicRecordObject.termDescriptor = academicRecord.termDescriptor;
    academicRecordObject.cumulativeEarnedCredits = academicRecord.cumulativeEarnedCredits;
    academicRecordObject.courseTranscript = mapTranscript(academicRecord.transcript);

    return academicRecordObject;
  });

  return academicRecordList;
}

module.exports = mapAcademicRecords;
