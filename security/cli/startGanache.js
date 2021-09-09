require('dotenv').config();
const startGanacheServer = require('../utils/startGanacheServer');

const port = process.env.GANACHE_PORT;
const mnemonic = process.env.GANACHE_MNEMONIC;
const accounts = process.env.GANACHE_ACCOUNTS;
const accountKeysPath = `${process.env.BLOCKCHAIN_PATH}/${process.env.BLOCKCHAIN_KEY_FILE}`;

startGanacheServer(port, mnemonic, accounts, accountKeysPath);
