const Demographics = require('../../../transcripts/standard/demographics');

/**
 * A function that takes in object from composite JSON and
 * returns a Demographics object created from the class
 * @param {Object} demographics
 * @returns {Object}
 */

function mapDemographics(demographics) {
  const studentDemographics = demographics.map((studentDemographic) => {
    const { gender, hispanicLatinoEthnicity, races } = studentDemographic;

    const demographic = new Demographics();

    demographic.gender = gender;
    demographic.hispanicLatinoEthnicity = hispanicLatinoEthnicity;
    demographic.races = races.map(({ raceDescriptor }) => ({ raceDescriptor: raceDescriptor }));

    return demographic;
  });

  return studentDemographics;
}

module.exports = mapDemographics;
