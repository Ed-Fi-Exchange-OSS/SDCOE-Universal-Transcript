const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-shallow-deep-equal'));

const sampleTranscript = require('../../transcripts/resources/standard-large-sample.json');
const { selectedROPCourses: otherData } = require('../../transcripts/rop/rop-selection-sample');
const {
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
} = require('../../renderer/model');

describe('Model', () => {
  let empty = null,
    emptyString = '',
    undefinedValue = undefined;

  describe('Model Utility Functions', () => {
    let date = '2021-06-21';
    describe('formatDate', () => {
      let testVariations = [
        {
          value: date,
          expected: '06/21/2021'
        },
        {
          value: empty,
          expected: '00/00/0000'
        },
        {
          value: undefinedValue,
          expected: '00/00/0000'
        },
        {
          value: emptyString,
          expected: '00/00/0000'
        }
      ];

      testVariations.forEach(test => {
        it(`correctly formats the date with (/) separator for parameter ${test.value === '' ? 'empty string' : test.value} value and returns ${test.expected}`, () => {
          resultDate = formatDate(test.value);

          expect(test.expected).to.eq(resultDate);
        });
      });
    });

    describe('formatDOB', () => {

      it('should format date of birth as (Month Day, Year) when provided a valid date as a paramter', () => {
        const formattedDOB = formatDOB(date);
        const expected = 'June 21, 2021';

        expect(expected).to.eq(formattedDOB);
      });

      it('should format unix default date when provided date as null', () => {
        const formattedDOB = formatDOB(empty);
        const expected = 'January 1, 1970';

        expect(expected).to.eq(formattedDOB);
      });

      it('should throw error when provided date as empty string', () => {
        const formattedDOB = () => formatDOB(emptyString);

        expect(formattedDOB).to.throw();
      });

      it('should throw error when provided date as undefined', () => {
        const formattedDOB = () => formatDOB(undefinedValue);

        expect(formattedDOB).to.throw();
      });


    });


  });

  describe('getStandardTranscriptData', () => {
    let transcript;
    beforeEach(() => {
      transcript = sampleTranscript;
    });

    describe('getHeader', () => {
      let testVariations = [
        {
          value: empty,
          expected: () => getHeader(empty)
        },
        {
          value: undefinedValue,
          expected: () => getHeader(undefinedValue)
        },
        {
          value: emptyString,
          expected: () => getHeader(emptyString)
        }
      ];

      testVariations.forEach(test => {
        it(`should throw the error while calling getHeader with ${test.value} as parameter`, () => {

          expect(test.expected).to.throw();
        });
      });


      it('should return the header details', () => {
        const test = {
          value: transcript,
          expected: {
            schoolName: 'Grand Bend Elementary School',
            schoolAddress: '',
            schoolPhone: '',
            schoolWebsite: ''
          }
        };
        const getHeaderDetails = getHeader(test.value);

        expect(getHeaderDetails).to.eql(test.expected);

      });
    });

    describe('getFooter', () => {
      it(`should return object with the today's date in mm/dd/yyyy fromat`, () => {
        const date = new Date();
        const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        const expected = { 'dateRendered': `${month}/${day}/${year}` };

        expect(getFooter()).to.be.eql(expected);
      });
    });

    describe('formatDescriptor', () => {
      let descriptorString = 'uri://ed-fi.org/SexDescriptor#Male';

      it('should return the correct descriptor value from string identified by the # symbol', () => {
        const correctDescriptor = 'Male';
        const falseDescriptor = 'female';

        const res = formatDescriptor(descriptorString);

        expect(res).to.be.eq(correctDescriptor);
        expect(res).to.be.not.eq(falseDescriptor);
      });

    });

    describe('getStudentGuardianInfo', () => {
      it(`should return the student's first guardian information`, () => {
        const guardianInfo = getStudentGuardianInfo(transcript);
        const expected = {
          firstName: 'Carmen',
          lastSurname: 'Dyer',
          streetNumberName: '263 New Street',
          apartmentRoomSuiteNumber: undefined,
          city: 'Grand Bend',
          state: 'TX',
          postalCode: '78834',
          telephoneNumber: '(950) 342 7522'
        };

        expect(guardianInfo).to.be.eql(expected);
      });

      let testVariations = [
        {
          value: empty,
          expected: () => getStudentGuardianInfo(empty)
        },
        {
          value: undefinedValue,
          expected: () => getStudentGuardianInfo(undefinedValue)
        },
        {
          value: emptyString,
          expected: () => getStudentGuardianInfo(emptyString)
        }
      ];

      testVariations.forEach(test => {
        it(`should throw the error while calling getStudentGuardianInfo with ${test.value} as parameter`, () => {

          expect(test.expected).to.throw();
        });

      });

    });

    describe('getStudentInfo', () => {

      it(`should return the student information`, () => {
        const studentInfo = getStudentInfo(transcript);
        const expected = {
          firstName: 'Tyrone',
          lastSurname: 'Dyer',
          studentLocalId: '821',
          birthDate: '11/13/2003',
          gender: 'Male',
          studentUniqueId: '604821',
          guardian: {
            firstName: 'Carmen',
            lastSurname: 'Dyer',
            streetNumberName: '263 New Street',
            apartmentRoomSuiteNumber: undefined,
            city: 'Grand Bend',
            state: 'TX',
            postalCode: '78834',
            telephoneNumber: '(950) 342 7522'
          }
        };

        expect(expected).to.be.eql(studentInfo);

      });

      let testVariations = [
        {
          value: empty,
          expected: () => getStudentInfo(empty)
        },
        {
          value: undefinedValue,
          expected: () => getStudentInfo(undefinedValue)
        },
        {
          value: emptyString,
          expected: () => getStudentInfo(emptyString)
        }
      ];

      testVariations.forEach(test => {
        it(`should throw the error while calling getStudentInfo with ${test.value} as parameter`, () => {

          expect(test.expected).to.throw();
        });

      });

    });

    describe('getTableOfScores', () => {
      it('should return the scores of the student subject & assesments in expected data structure', () => {
        const scoreDetails = getTableOfScores(transcript);
        const expected = {
          records: [
            {
              schoolYear: 2012,
              termDescriptor: 'Fall Semester',
              nameOfInstitution: 'Grand Bend Elementary School',
              transcript: [{}],
              CMP: 6,
              ATT: 7
            },
            {
              schoolYear: 2012,
              termDescriptor: 'Spring Semester',
              nameOfInstitution: 'Grand Bend Elementary School',
              transcript: [{}],
              CMP: 7,
              ATT: 7
            }
          ]
        };

        expect(scoreDetails).to.shallowDeepEqual(expected);

      });
    });

    describe('getAchievements', () => {
      it(`should return student's achievement and assure response structure`, () => {
        const achievementDetails = getAchievements(transcript);
        const expected = {
          records: [
            {
              monthOfAward: '00',
              yearOfAward: '2012',
              code: 'Regular diploma',
              title: 'Distingueshed',
              score: ''
            }
          ]
        };

        expect(achievementDetails).to.be.eql(expected);
        expect(achievementDetails).to.shallowDeepEqual(expected);
      });
    });

    describe('getCreditSummary', () => {
      it(`should return student's credit summary and assure response structure`, () => {
        const creditSummary = getCreditSummary(transcript);
        const expected = {
          summary: {
            subjects: {
              'Fine and Performing Arts': 3,
              'English Language Arts': 2,
              Mathematics: 2,
              'Physical, Health, and Safety Education': 2,
              Science: 2,
              'Social Studies': 2
            },
            total: 13
          }
        };

        expect(creditSummary).to.be.eql(expected);
        expect(creditSummary).to.shallowDeepEqual(expected);
      });
    });

    it('should assure the response structure for standard transcript data', () => {
      const transcriptData = getStandardTranscriptData(transcript);
      const expected = {
        transcript: {
          header: {
            schoolName: 'Grand Bend Elementary School',
            schoolAddress: '',
            schoolPhone: '',
            schoolWebsite: ''
          },
          studentInfo: {
            firstName: 'Tyrone',
            lastSurname: 'Dyer',
            studentLocalId: '821',
            birthDate: '11/13/2003',
            gender: 'Male',
            studentUniqueId: '604821',
            guardian: {}
          },
          tableOfScores: { records: [] },
          achievements: { records: [] },
          creditSummary: { summary: {} },
          footer: {}
        }
      };

      expect(transcriptData).to.shallowDeepEqual(expected);
    });

    let testVariations = [
      {
        value: empty,
        expected: () => getStandardTranscriptData(empty)
      },
      {
        value: undefinedValue,
        expected: () => getStandardTranscriptData(undefinedValue)
      },
      {
        value: emptyString,
        expected: () => getStandardTranscriptData(emptyString)
      }
    ];

    testVariations.forEach(test => {
      it(`should throw the error while getting standard transcript data with ${test.value} as parameter`, () => {

        expect(test.expected).to.throw();
      });
    });

  });

  describe('getROPTransriptData', () => {
    let transcript;
    let selectedCourses;
    beforeEach(() => {
      transcript = sampleTranscript;
      selectedCourses = otherData;
    });

    describe('getROPCertificateHolderInfo', () => {

      it('should retrun certificateholder information', () => {
        const studentInfo = getROPCertificateHolderInfo(transcript, selectedCourses);
        const expected = {
          firstName: 'Tyrone',
          lastSurname: 'Dyer',
          gender: 'Male',
          birthDate: 'November 13, 2003',
          certificate: {
            nameOfInstitution: 'Grand Bend Elementary School',
            schoolYear: 2012,
            courseTranscript: [{}, {}, {}]
          },
          transcript: [
            { courseCode: 'ART-03', sectionHours: 0.5, coursesInfo: [Array] },
            { courseCode: 'ELA-03', sectionHours: 1, coursesInfo: [Array] },
            { courseCode: 'MATH-03', sectionHours: 1, coursesInfo: [Array] },
            { courseCode: 'MUS-03', sectionHours: 1, coursesInfo: [Array] }
          ]
        };

        expect(studentInfo).to.shallowDeepEqual(expected);
      });

    });

    it('should return the ROP trasncript informaton & assure the response structure', () => {
      const transcriptData = getROPTranscriptData(transcript, selectedCourses);
      const expected = {
        certificate: [
          {
            firstName: 'Tyrone',
            lastSurname: 'Dyer',
            dateOfIssue: 2012,
            nameOfInstitution: 'Grand Bend Elementary School',
            courseTitle: 'Art, Grade 3',
            ropSticker: undefined,
            associateSticker: undefined,
            superintendentSignature: undefined,
            firstSeniorDirectorSignature: undefined,
            secondSeniorDirectorSignature: undefined
          },
          {
            firstName: 'Tyrone',
            lastSurname: 'Dyer',
            dateOfIssue: 2012,
            nameOfInstitution: 'Grand Bend Elementary School',
            courseTitle: 'English Language Arts, Grade 3',
            ropSticker: undefined,
            associateSticker: undefined,
            superintendentSignature: undefined,
            firstSeniorDirectorSignature: undefined,
            secondSeniorDirectorSignature: undefined
          },
          {
            firstName: 'Tyrone',
            lastSurname: 'Dyer',
            dateOfIssue: 2012,
            nameOfInstitution: 'Grand Bend Elementary School',
            courseTitle: 'Mathematics, Grade 3',
            ropSticker: undefined,
            associateSticker: undefined,
            superintendentSignature: undefined,
            firstSeniorDirectorSignature: undefined,
            secondSeniorDirectorSignature: undefined
          }
        ],
        transcript: {
          sdcoeLogo: undefined,
          studentInfo: {
            firstName: 'Tyrone',
            lastSurname: 'Dyer',
            gender: 'Male',
            birthDate: 'November 13, 2003'
          },
          courses: { totalHours: 3.5, courses: [Array] }
        }
      };

      expect(transcriptData).to.shallowDeepEqual(expected);
    });

  });
});
