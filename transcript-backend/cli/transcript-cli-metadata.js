const cliProgram = require('commander');
const { readMetaData, readCustomMetaData } = require('pdf-utils');
const { writeMetaData } = require('pdf-utils');
const fs = require('fs');

cliProgram
  .command('add <pdfPath> <jsonPath>')
  .description('Sets specified json file as metadata for a given pdf. The metadata is added to "mr-transcript" key')
  .action(async (pdfPath, jsonPath) => {
    const mrTranscript = fs.readFileSync(jsonPath, 'utf8');
    await writeMetaData(pdfPath, 'mr-transcript', mrTranscript);
    console.log('Metadata "mr-transcript" has been added')
  });

cliProgram
  .command('show-mr-transcript <pdfPath>')
  .description('Prints "mr-transcript" metadata for a given pdf')
  .action(async (pdfPath) => {
    const data = await readMetaData(pdfPath, 'mr-transcript');
    console.log(data)
  });

cliProgram
  .command('show-proof-metadata <pdfPath>')
  .description('Prints "proof-metadata" metadata for a given pdf')
  .action(async (pdfPath) => {
    const data = await readMetaData(pdfPath, 'proof-metadata');
    console.log(data)
  });

cliProgram
  .command('show <pdfPath>')
  .option('-k,--key <key>', 'returns the metadata information of the provided ' +
    'key from the pdf')
  .description('Read the metadata with given key from pdf path passed as ' +
    'argument.The list of metadata keys that is currently available are mr-transcript, proof-metadata and ModDate.')
  .action(async (pdfPath, args) => {
    const key = args.key;
    const data = key ? await readMetaData(pdfPath, key) : await readCustomMetaData(pdfPath);
    console.log(data);
  });


cliProgram.action(() => {
  cliProgram.help();
});


cliProgram.parse(process.argv);