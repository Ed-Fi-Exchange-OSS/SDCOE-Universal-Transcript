const { exec } = require('child_process');


/**
 * Return the latest school year and termDescriptor
 * @param {port, mnemonic, accounts, accountKeysPath} 
 * Stores the keys in keys.json file*
 **/
const startGanacheServer = async (port, mnemonic, accounts, accountKeysPath) => {
  try {
    const program = await exec(`ganache-cli --port ${port} --accounts ${accounts} --mnemonic ${mnemonic} --account_keys_path ${accountKeysPath}`);
    
    console.log(`Ganache server started at port ${port} using mnemonic ${mnemonic}`);
    console.log(`ganache-cli is now running on port: ${port}, with process id: ${program.pid}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = startGanacheServer;