const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-shallow-deep-equal'));

const { compositeToStandard } = require('../../converters/composite-to-standard');

const enrollment = require('../../composites/mocker/resources/composite-enrollments.json');
const transcriptData = require('../../composites/mocker/resources/composite-transcript.json');
const educationInstitute = require('../../composites/mocker/resources/composite-educational-organization.json');

describe('compositeToStandard', () => {
  let today;

  function getCurrentDate() {
    const date = new Date();
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);

    return `${month}/${day}/${year}`;
  }

  before(() => {
    today = getCurrentDate();
  });

  it('should throw an an error if no parameter is provided', () => {
    const res = () => compositeToStandard();

    expect(res).to.throw('Invalid Composite Transcript found');
  });

  it('should throw an an error if empty transcript data is provided', () => {
    const res = () => compositeToStandard([]);

    expect(res).to.throw('Invalid Composite Transcript found');
  });

  it('should throw an an error if empty organizations or no is provided', () => {
    const res = () => compositeToStandard(transcriptData);

    expect(res).to.throw('Invalid Composite Educational Institute found');
  });


  it('should convert the transcript data to standarad format', () => {
    const res = compositeToStandard(transcriptData, educationInstitute, enrollment);
    const expected = {
      studentTranscript: {
        resourceId: 'a46168c9fb094172a23fdb9ab2ce9177',
        transcriptRunDate: today,
        studentUniqueId: '604821',
        studentUniqueIdType: 'SIS',
        firstName: 'Tyrone',
        lastSurname: 'Dyer',
        birthDate: '2003-11-13T00:00:00',
        birthSexDescriptor: null,
        studentLocalId: '821',
        studentIdentificationSystemDescriptor: 'uri://ed-fi.org/StudentIdentificationSystemDescriptor#Local',
        demographics: [[]],
        guardians: [[], []],
        studentAcademicRecords: [[], []],
        programs: [],
        studentAssessments: [],
        awardsAchievements: [[]]
      }
    };

    expect(res).to.shallowDeepEqual(expected);
  });

});
