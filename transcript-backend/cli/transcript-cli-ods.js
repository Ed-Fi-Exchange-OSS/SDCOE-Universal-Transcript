const cliProgram = require('commander');
const { getConfigPath } = require('./helpers/resourceUtils');
const { getConfig } = require('./helpers/resourceUtils');
const {writeFileSync} = require('fs');

cliProgram
  .command('list-endpoints')
  .description('Lists the ods endpoints available for the CLI')
  .action(() => {
    const config = getConfig();
    console.log('You can change the ods endpoints by modifying: ' + getConfigPath());
    console.log(config.ods);

  });

cliProgram
  .command('add-endpoint')
  .description('Adds an ods endpoint available for the CLI')
  .requiredOption('-k, --client-key <clientKey>', 'clientKey for the ods')
  .requiredOption('-s, --client-secret <clientSecret>', 'clientSecret for the ods')
  .requiredOption('-b, --base-url <baseUrl>', 'baseUrl for the ods endpoint')
  .action((args) => {
    let { clientKey, clientSecret, baseUrl } = args;
    const config = getConfig();

    config.ods.push({
      'clientId': clientKey,
      'clientSecret': clientSecret,
      'baseUrl': baseUrl
    });

    const configFilePath = getConfigPath();
    writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    console.log('ODS Endpoint was added to ' + configFilePath)
  });

cliProgram.action(() => {
  cliProgram.help();
});


cliProgram.parse(process.argv);