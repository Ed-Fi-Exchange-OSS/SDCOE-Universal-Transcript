const mapPrograms = require('./mappers/standard/programs');
const mapGuardians = require('./mappers/standard/guardians');
const mapAssessments = require('./mappers/standard/assessments');
const mapDemographics = require('./mappers/standard/demographics');
const mapAcademicRecords = require('./mappers/standard/academicRecords');

const StudentTranscript = require('../transcripts/standard/student-transcript');
const MainTranscript = require('../transcripts/standard/main');
const mapAwardsAchievements = require('./mappers/standard/awards');
const { DEFAULT_VALUE } = require('../transcripts/constants');

function getCurrentDate() {
  const d = new Date();
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

  return `${mo}/${da}/${ye}`;
}

function findLocalId(alternateIds) {
  let ret = DEFAULT_VALUE;

  if (!alternateIds) return ret;

  for (const alternateId of alternateIds) {
    let alternateIdentificationCodes = alternateId['alternateIdentificationCodes'];
    for (const alternateIdentificationCode of alternateIdentificationCodes)
      if (alternateIdentificationCode['assigningOrganizationIdentificationCode'] === 'Local')
        return alternateIdentificationCode['identificationCode'];
  }

  return ret;
}

function compositeToStandard(transcript, educationInstitute, enrollment) {
  if (!transcript || !transcript.length) throw 'Invalid Composite Transcript found';

  if (!educationInstitute || !transcript.length) throw 'Invalid Composite Educational Institute found';

  const main = new MainTranscript();
  const studentTranscript = new StudentTranscript({});

  main.studentTranscript = studentTranscript;

  studentTranscript.resourceId = transcript[0].resourceId;
  studentTranscript.transcriptRunDate = getCurrentDate();
  studentTranscript.studentUniqueId = transcript[0].studentUniqueId;
  studentTranscript.studentUniqueIdType = 'SIS';
  studentTranscript.firstName = transcript[0].firstName;
  studentTranscript.lastSurname = transcript[0].lastSurname;
  studentTranscript.birthDate = transcript[0].birthDate;
  studentTranscript.studentLocalId = findLocalId(transcript[0].alternateIds);
  studentTranscript.studentIdentificationSystemDescriptor = studentTranscript.studentLocalId
    ? 'uri://ed-fi.org/StudentIdentificationSystemDescriptor#Local'
    : DEFAULT_VALUE;

  studentTranscript.demographics = mapDemographics(transcript[0].demographics);
  studentTranscript.guardians = mapGuardians(transcript[0].guardians);
  studentTranscript.studentAcademicRecords = mapAcademicRecords(
    transcript[0],
    educationInstitute,
    enrollment ? enrollment[0] : null
  );
  studentTranscript.programs = mapPrograms(transcript[0].studentProgramAssociations);
  studentTranscript.studentAssessments = mapAssessments(transcript[0].studentUniqueId, transcript[0].assessments);
  studentTranscript.awardsAchievements = mapAwardsAchievements(transcript[0], educationInstitute);

  return main;
}

module.exports = { compositeToStandard };
