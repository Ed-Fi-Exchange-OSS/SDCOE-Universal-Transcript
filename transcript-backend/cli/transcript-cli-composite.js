const cliProgram = require('commander');
const { CompositeApi } = require('../composites/api/api');
const factory = require('../composites/api/factory');
const { getConfig, getConfigPath } = require('./helpers/resourceUtils');


const getApi = () => {
  const odsConfig = getConfig()?.ods;

  if (odsConfig)
    return new CompositeApi({
      clientId: odsConfig[0].clientId,
      clientSecret: odsConfig[0].clientSecret,
      baseUrl: odsConfig[0].baseUrl
    });
  else {
    console.error('No ods config info found. Place odsConfig in ' + getConfigPath());
  }
};

cliProgram
  .command('list-composite-end-points')
  .description('List the available composites')
  .action(() => {
    console.log('educationOrganizationHierarchy');
    console.log('studentTranscript');

  });

cliProgram
  .command('get-composite-ed-org')
  .option('-s,--schoolId <schoolId>', 'id of the school')
  .description('Fetches Educational Organization')
  .action((args) => {
    let {
      schoolId
    } = args;

    const api = getApi();
    let selectedComposite;
    if (schoolId)
      selectedComposite = factory.getEducationOrganizationHierarchiesBySchoolId(api, schoolId);
    else
      selectedComposite = factory.getAllEducationOrganizationHierarchies(api);

    selectedComposite.then(
      (data) => console.log(data))
      .catch(function(e) {
        console.error(e);
      });
  });

cliProgram
  .command('get-composite-transcript')
  .option('-s,--studentId [studentId]', 'id of the student to fetch transcript record')
  .option('-fn,--firstName [firstName]', `first name of the sutdent to filter by student's first name`)
  .option('-ln,--lastName [lastName]', `last name of the sutdent to filter by student's last name`)
  .option('-dob,--dateOfBirth [dateOfBirth]', `Date of Birth of the sutdent to filter by student's date of birth`)
  .description('Fetches Composite Transcripts')
  .action((args) => {
    let {
      studentId,
      firstName,
      lastName,
      dateOfBirth
    } = args;

    const api = getApi();

    let selectedComposite;

    if (studentId)
      selectedComposite = factory.getStudentTranscriptsByStudentId(api, studentId);
    else if (firstName || lastName || dateOfBirth)
      selectedComposite = factory.getStudentTranscriptsByDemographics(api, firstName, lastName, dateOfBirth);
    else
      selectedComposite = factory.getAllStudentTranscripts(api);

    selectedComposite
      .then((data) => console.log(data))
      .catch(function(e) {
        console.error(e);
      });
  });


cliProgram.action(() => {
  cliProgram.help();
});


cliProgram.parse(process.argv);