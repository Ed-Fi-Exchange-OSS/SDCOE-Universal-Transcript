#! /usr/bin/env node

const cliProgram = require('commander');
const { initializeConfigFile, createResourceDir, resetConfigFile, getConfigPath, createSampleKeyPair } = require('./helpers/resourceUtils');


cliProgram.version('1.0.0').name('transcript-cli').description('CLI for Standard Transcript Generator');

cliProgram.command('ods', 'Information about ODS');
cliProgram.command('composite', 'Query the composite API for information');
cliProgram.command('json', 'Query and create a standard JSON transcript');
cliProgram.command('pdf', 'Generate a PDF transcript from a JSON one');
cliProgram.command('metadata', 'Query a pdf transcript for information');
cliProgram.command('signing', 'Sign a PDF or verify that a transcript is signed');

cliProgram
  .command('reset-config-file')
  .description('Resets configuration file')
  .requiredOption('-y, --yes','Are you sure')
  .action(() => {
    resetConfigFile();
    console.log("Config file reset")
    console.log("Settings file is located at " + getConfigPath());
  });


cliProgram.action(() => {
  console.log('> Welcome to the Transcript CLI');
  console.log('** Note the the security standards \n' +
    'used by default for this CLI are weak and \n' +
    'should only be used for demo purpose and \n' +
    'is not suitable for production **')

  initializeConfigFile();
  createResourceDir();
  createSampleKeyPair();

  console.log("> Settings file is located at " + getConfigPath())

  cliProgram.help();
});


cliProgram.parse(process.argv);