const Achievements = require('../../../transcripts/standard/achievements');


function getDiplomas(academicRecord) {
  return academicRecord?.diplomas?.map((diploma) => {
    return {
      awardCode: diploma.diplomaTypeDescriptor,
      awardName: diploma.achievementTitle
    };
  });
}

function mapAwardsAchievements(compositeTranscript, educationalInstitutes) {

  const ret = [];

  const academicRecord = compositeTranscript.academicRecord;

  academicRecord.forEach((academicRecord) => {
    const school =
      educationalInstitutes.filter(
        (institute) =>
          institute.schoolId ===
          academicRecord.educationOrganizationId)[0] || [];

    const diplomas = getDiplomas(academicRecord);

    const achievement = new Achievements();
    achievement.studentUniqueId = compositeTranscript.studentUniqueId;
    achievement.educationOrganizationId = school?.schoolId;
    achievement.nameOfInstitution = school?.nameOfInstitution;
    achievement.schoolYear = academicRecord.schoolYear;
    achievement.term = academicRecord.termDescriptor;

    diplomas.forEach((diploma) => {
      achievement.awardCode = diploma.awardCode;
      achievement.awardName = diploma.awardName;

      ret.push(achievement);
    });

  });

  return ret;
}

module.exports = mapAwardsAchievements;
