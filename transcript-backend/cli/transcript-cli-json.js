const dotenv = require('dotenv');
const cliProgram = require('commander');
const fs = require('fs');
const main = require('../index');
const { compositeToStandard } = require('../converters/composite-to-standard');
const { searchTranscriptByDemographics } = require('../transcripts/search-transcript');
const { searchTranscriptByStudentId } = require('../transcripts/search-transcript');
const { getConfig, saveJSONFile, getJSONFiles } = require('./helpers/resourceUtils');

dotenv.config();

cliProgram
  .command('list')
  .description('List the available standard JSON files')
  .action(() => {
    console.log(getJSONFiles());
  });

cliProgram
  .command('create')
  .description('Query ODS for composites and create a JSON transcript')
  .option('-s,--studentId <studentId>', 'id of the student ')
  .option('-fn,--firstName <firstName>', `first name of the student`)
  .option('-ln,--lastName <lastName>', `last name of the student (yyyy-mm-dd)`)
  .option('-dob,--dateOfBirth <dateOfBirth>', `Date of Birth of the student`)
  .option('-des,--destination <destination>', 'Destination of the output', '')
  .action((args) => {
    let {
      studentId, firstName, lastName, dateOfBirth
    } = args;

    const odsConfig = getConfig()?.ods;

    let searchPromise = null;

    if (studentId)
      searchPromise = searchTranscriptByStudentId(odsConfig, studentId);
    else if (firstName && lastName && dateOfBirth)
      searchPromise = searchTranscriptByDemographics(odsConfig, firstName, lastName, dateOfBirth);
    else
      console.error('Should pass studentId or (firstName, lastName, dateOfBirth)');

    if (searchPromise)
      searchPromise.then((data) => {
        const fileName = (data.studentTranscript.firstName
          + '_' + data.studentTranscript.lastSurname
          + '_' + data.studentTranscript.birthDate.substring(0, 10)
          + '.json').toLowerCase();
        console.log(data);
        saveJSONFile(fileName, data);
        console.log(fileName + ' saved');
      }).catch((e) => {
        console.log(e);
      });
  });

cliProgram
  .command('validate <fileName>')
  .description('Validates whether a json file fits a standard transcript requirements')
  .action((fileName) => {
    try {
      const data = fs.readFileSync(fileName, 'utf8');
      const jsonData = JSON.parse(data);
      const standardTranscript = main.standardFromJson(jsonData);

      const messages = standardTranscript.validate();

      if (!messages || !messages.length)
        console.log('Transcript seems to meet the standard requirement')
      else
        for (const invalid of messages)
          console.log(`Invalid value in ${invalid['config']['name']} of ${invalid['entity']}. (${invalid['message']})`);



    } catch (e) {
      console.log('Error:', e.stack);
    }
  });

cliProgram
  .command('composite-to-standard [transcriptFile] [enrollmentsFile] [educationalOrganizationFile]')
  .description('Prints standard JSON for the given composite files')
  .action((transcriptFile, enrollmentsFile, educationalOrganizationFile) => {
    try {
      const transcriptData = fs.readFileSync(transcriptFile, 'utf8');
      const enrollmentsData = fs.readFileSync(enrollmentsFile, 'utf8');
      const educationalOrganizationData = fs.readFileSync(educationalOrganizationFile, 'utf8');

      const transcriptJSON = JSON.parse(transcriptData);
      const enrollmentsJSON = JSON.parse(enrollmentsData);
      const educationalOrganizationJSON = JSON.parse(educationalOrganizationData);

      const standardTranscript = compositeToStandard(transcriptJSON, educationalOrganizationJSON, enrollmentsJSON);

      if (standardTranscript.validate()) console.log('Valid :)');
      else console.log('Invalid :(');
      console.log(standardTranscript);
    } catch (e) {
      console.log('Error:', e.stack);
    }
  });


cliProgram.action(() => {

  cliProgram.help();
});


cliProgram.parse(process.argv);