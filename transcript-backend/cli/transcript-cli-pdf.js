const cliProgram = require('commander');
const main = require('../index');
const fs = require('fs');
const { getPDFDir, getPDFFiles, getConfig } = require('./helpers/resourceUtils');
const path = require('path');


cliProgram
  .command('create-rop')
  .requiredOption('-j,--json <sourceFile>', 'source JSON/ standard JSON file')
  .option('-d,--destination <destinationFile>', 'destination  path to save/store transcript')
  .description('Creates a ROP PDF from a standard JSON file')
  .action((args) => {
    let { json, destination } = args;
    const ropConfig = getConfig()?.rop;

    if (ropConfig && ropConfig.length) {
      const data = fs.readFileSync(json, 'utf8');
      const jsonData = JSON.parse(data);
      const standardTranscript = main.standardFromJson(jsonData);
      const fileName = ('rop' + '_' + standardTranscript.studentTranscript.firstName
        + '_' + standardTranscript.studentTranscript.lastSurname
        + '_' + standardTranscript.studentTranscript.birthDate.substring(0, 10)
        + '.pdf').toLowerCase();

      const destinationFile = destination || path.join(getPDFDir(), fileName);

      main
        .renderTranscript('rop', standardTranscript, destinationFile, ropConfig)
        .then(() => {
          console.log(`Successfully created standard PDF: ${destinationFile}`);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      console.error("error: ROP Config is not defined in the config file. Set the `rop` parameter in the config")
    }


  });

cliProgram
  .command('create-standard')
  .requiredOption('-j,--json <sourceFile>', 'source JSON/ standard JSON file')
  .option('-d,--destination <destinationFile>', 'destination  path to save/store transcript')
  .description('Creates a standard transcript PDF from a standard JSON file')
  .action((args) => {
    let { json, destination } = args;

    const data = fs.readFileSync(json, 'utf8');
    const jsonData = JSON.parse(data);
    const standardTranscript = main.standardFromJson(jsonData);
    const fileName = ('standard' + '_' + standardTranscript.studentTranscript.firstName
      + '_' + standardTranscript.studentTranscript.lastSurname
      + '_' + standardTranscript.studentTranscript.birthDate.substring(0, 10)
      + '.pdf').toLowerCase();

    const destinationFile = destination || path.join(getPDFDir(), fileName);

    main
      .renderTranscript('standard', standardTranscript, destinationFile)
      .then(() => {
        console.log(`Successfully created standard PDF: ${destinationFile}`);
      })
      .catch((e) => {
        console.error(e);
      });


  });


cliProgram
  .command('list')
  .description('List the available composites')
  .action(() => {
    console.log(getPDFFiles());
  });

cliProgram.action(() => {
  cliProgram.help();
});


cliProgram.parse(process.argv);