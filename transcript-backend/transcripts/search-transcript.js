const compositeFactory = require('../composites/api/factory');
const converter = require('../converters/composite-to-standard');
const compositeApi = require('../composites/api/api');
const fetchComposite = require('../composites/mocker/fetch-composite');
const {
  RESOURCE_EDUCATION_ORGANIZATION_HIERARCHIES,
  RESOURCE_STUDENT_TRANSCRIPT
} = require('../composites/api/constants');
const { PRODUCTION, DEVELOPMENT } = require('./constants');
const environment = process.env.NODE_ENV || PRODUCTION;
const uniqueKeys = require('../constants/uniqueFields');

/**
 * Return the latest school year and termDescriptor
 * Merge the unique data*
 * @param multipleTranscripts
 * @param primaryData
 * @param uniqueKeys
 * @param key
 * @param multipleTranscripts
 * @param primaryData
 * @param uniqueKeys
 * @param key
 * @param multipleTranscripts
 * @param primaryData
 * @param uniqueKeys
 * @param key
 * @param multipleTranscripts
 **/
const setOtherInfo = (primaryData, uniqueKeys, key, multipleTranscripts) => {
  // 1. loop thru multiple transcripts for particular key
  const uniqueKey = uniqueKeys[key];
  multipleTranscripts.forEach((transcript) => {
    transcript.studentTranscript[key].forEach((item) => {
      const something = primaryData.studentTranscript[key].findIndex((primaryItem) => {
        let isValid = true;
        uniqueKey.forEach((key) => {
          isValid = isValid && primaryItem[key] === item[key];
        });

        return isValid;
      });

      if (something === -1) {
        primaryData.studentTranscript[key].push(item);
      }
    });
  });
};

/**
 * Return the latest school year and termDescriptor
 * @returns {Object} Returns the max school year and term descriptor for the transcript.
 * @param transcript
 **/
const getMaxSchoolYearAndTerm = (transcript) => {
  let max = null;
  transcript.studentTranscript.studentAcademicRecords.forEach((academic) => {
    if (max == null) {
      max = academic;
    } else if (max.schoolYear < academic.schoolYear) {
      max = academic;
    } else if (max.schoolYear === academic.schoolYear && academic.termDescriptor?.includes('Spring Semester')) {
      max = academic;
    } else {
      // Ignore pass
    }
  });

  return {
    schoolYear: max.schoolYear,
    term: max.termDescriptor
  };
};

/**
 * Return the latest school year and termDescriptor
 * @returns {Object} Returns the primary transcript
 * @param multipleTranscripts
 **/
const findPrimaryTranscript = (multipleTranscripts) => {
  let max = null;
  let primary = null;
  multipleTranscripts.forEach((transcript) => {
    let tempMax = getMaxSchoolYearAndTerm(transcript);
    if (max == null) {
      max = tempMax;
      primary = transcript;
    } else if (max.schoolYear < tempMax.schoolYear) {
      max = tempMax;
      primary = transcript;
    } else if (max.schoolYear === tempMax.schoolYear && tempMax.termDescriptor?.includes('Spring Semester')) {
      max = tempMax;
      primary = transcript;
    } else {
      // Ignore pass
    }
  });

  return primary;
};

/**
 *
 * @param multipleTranscripts
 * @returns {null}
 */
const filterTranscript = (multipleTranscripts) => {
  let primaryData = findPrimaryTranscript(multipleTranscripts);

  setOtherInfo(primaryData, uniqueKeys, 'demographics', multipleTranscripts);
  setOtherInfo(primaryData, uniqueKeys, 'guardians', multipleTranscripts);
  setOtherInfo(primaryData, uniqueKeys, 'studentAcademicRecords', multipleTranscripts);
  setOtherInfo(primaryData, uniqueKeys, 'programs', multipleTranscripts);
  setOtherInfo(primaryData, uniqueKeys, 'studentAssessments', multipleTranscripts);
  setOtherInfo(primaryData, uniqueKeys, 'awardsAchievements', multipleTranscripts);

  return primaryData;
};

/**
 *
 * @param odsConfigs {Object}
 * @param studentId {String}
 * @returns {Promise<null>}
 */
async function searchTranscriptByStudentId(odsConfigs, studentId) {
  let allTranscripts = await Promise.all(
    odsConfigs.map(async (odsConfig) => {
      let studentTranscriptComposite;
      let educationOrganizationsComposite;

      if (environment !== DEVELOPMENT) {
        const api = new compositeApi.CompositeApi(odsConfig);
        studentTranscriptComposite = await compositeFactory.getStudentTranscriptsByStudentId(api, studentId);
        educationOrganizationsComposite = await compositeFactory.getAllEducationOrganizationHierarchies(api);
      } else {
        studentTranscriptComposite = (await fetchComposite(RESOURCE_STUDENT_TRANSCRIPT))[0];
        educationOrganizationsComposite = await fetchComposite(RESOURCE_EDUCATION_ORGANIZATION_HIERARCHIES);
      }

      if (studentTranscriptComposite instanceof Array && studentTranscriptComposite.length > 1)
        throw new Error('Multiple students found');

      return converter.compositeToStandard([studentTranscriptComposite], educationOrganizationsComposite, []);
    })
  );

  const filteredTranscript = filterTranscript(allTranscripts);

  return filteredTranscript;
}

/**
 *
 * @param odsConfigs {Object}
 * @param firstName {String}
 * @param lastName {String}
 * @param dateOfBirth {String}
 * @returns {Promise<*>}
 */
async function searchTranscriptByDemographics(odsConfigs, firstName, lastName, dateOfBirth) {
  const allTranscripts = await Promise.all(
    odsConfigs.map(async (odsConfig) => {
      let studentTranscriptComposite;
      let educationOrganizationsComposite;

      if (environment !== DEVELOPMENT) {
        const api = new compositeApi.CompositeApi(odsConfig);
        studentTranscriptComposite = await compositeFactory.getStudentTranscriptsByDemographics(
          api,
          firstName,
          lastName,
          dateOfBirth
        );

        educationOrganizationsComposite = await compositeFactory.getAllEducationOrganizationHierarchies(api);
      } else {
        studentTranscriptComposite = await fetchComposite(RESOURCE_STUDENT_TRANSCRIPT);
        educationOrganizationsComposite = await fetchComposite(RESOURCE_EDUCATION_ORGANIZATION_HIERARCHIES);
      }

      if (studentTranscriptComposite instanceof Array && studentTranscriptComposite.length > 1)
        throw new Error('Multiple students found');

      return converter.compositeToStandard(studentTranscriptComposite, educationOrganizationsComposite, []);
    })
  );

  const filteredTranscript = filterTranscript(allTranscripts);

  return filteredTranscript;
}

module.exports = {
  searchTranscriptByStudentId: searchTranscriptByStudentId,
  searchTranscriptByDemographics: searchTranscriptByDemographics
};
