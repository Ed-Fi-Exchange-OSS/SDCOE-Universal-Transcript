const StateRequiredAssessment = require('../../../transcripts/standard/state-required-assessments');

function mapAssessments(studentUniqueId, assessments) {
  const allowedAssessments = ['ACT', 'PSAT', 'SAT', 'SBAC', 'CAASPP', 'CTE'];
  const validAssessments = assessments.filter((assessment) => allowedAssessments.includes(assessment.assessmentTitle));

  const assessmentList = validAssessments.map((assessment) => {
    const assessmentObject = new StateRequiredAssessment();
    assessmentObject.studentUniqueID = studentUniqueId;
    assessmentObject.organizationId = null;
    assessmentObject.nameOfInstitution = null;
    assessmentObject.date = assessment.administrationDate;
    assessmentObject.testType = assessment.assessmentCategoryDescriptor;
    assessmentObject.testCode = null;
    assessmentObject.testName = assessment.assessmentTitle;
    assessmentObject.testScore = assessment.scoreResults[0].result;
    assessmentObject.schoolYear = null;
    assessmentObject.term = null;
    assessmentObject.gradeLevel = assessment.assessmentCategoryDescriptor;

    return assessmentObject;
  });

  return assessmentList;
}

module.exports = mapAssessments;
