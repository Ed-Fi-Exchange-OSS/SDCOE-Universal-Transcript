#!/usr/bin/env node

/**
 * Ganache Utils CLI
 */
const fs = require('fs');
const cliProgram = require('commander');
const { exec } = require('child_process');
require('dotenv').config();

const ethrDid = require('../blockchain/ethrDidUtils');

cliProgram.version('1.0.0').name('smart-contract').description('SDCOE Smart Contract functionalities');

cliProgram
  .command('start-ganache')
  .option('--port <port>', 'Port Address')
  .option('--accounts <noOfAccounts>', 'Number of accounts')
  .option('--mnemonic <mnemonic>', 'Mnemonics')
  .description('Start ganache server at given port')
  .action(async ({ port, mnemonic, accounts }) => {
    port = port || process.env.GANACHE_PORT;
    mnemonic = mnemonic || process.env.GANACHE_MNEMONIC;
    accountKeysPath = `${process.env.BLOCKCHAIN_PATH}/keys.json`;
    accounts = accounts || process.env.GANACHE_ACCOUNTS;
    try {
      await exec(
        `ganache-cli --port ${port} --mnemonic ${mnemonic} --account_keys_path ${accountKeysPath} --accounts ${accounts}`
      );

      console.log(`Ganache server started at port ${port} using mnemonic ${mnemonic}`);
    } catch (err) {
      console.error(err);
    }
  });

cliProgram
  .command('deploy-smart-contract')
  .option('--port <port>', 'Port Address')
  .description('smart contract to a ganache instance')
  .action(async ({ port }) => {
    const info = await ethrDid.deploySmartContract(port);

    console.log(`Smart Contract deployed`);
    console.log(JSON.stringify(info));
  });

cliProgram
  .command('ganache-key-info')
  .description('display account address and its private key')
  .action(() => {
    accountKeysPath = `${process.env.BLOCKCHAIN_PATH}/${process.env.BLOCKCHAIN_KEY_FILE}`;
    let keys = fs.readFileSync(accountKeysPath, 'utf8');
    keys = JSON.parse(keys);

    console.log(`BLOCKCHAIN ACCOUNT ADDRESS: ${Object.keys(keys.private_keys)[0]}`);
    console.log(`BLOCKCHAIN PRIVATE KEY: ${keys.private_keys[Object.keys(keys.private_keys)[0]]}`);
  });

cliProgram.parse(process.argv);
