#!/usr/bin/env node

/**
 * Security Utils CLI
 */
const fs = require('fs');
const dotenv = require("dotenv");
const cliProgram = require("commander");

const signature = require("../jwt/sign");
const verification = require("../jwt/verify");
const security = require("../blockchain/security");
const { base64Encoder } = require('../utils/base64');

dotenv.config();

security.initialize(process.env.SECURED_FOLDER);
const keyId = process.env.KEY_ID;

cliProgram
  .version("1.0.0")
  .name("security-utils")
  .description("SDCOE Security functionalities");

cliProgram
  .command("new-rsa")
  .option('--label <label>', 'Label used as identifier')
  .description("generate a key-pair and store them in a separate secure folder")
  .action(({ label }) => {
    const status = security.createRsaKeyPair(label);
    
    console.log(`The RSA key pair is successfully added to directory ${process.env.SECURED_FOLDER}.`);
  });

cliProgram
  .command("encode-key [path]")
  .description("base64 encode of the key")
  .action((path) => {
    const publicKey = fs.readFileSync(path);
    const base64Key = base64Encoder(publicKey);
    
    console.log(base64Key);
  });

cliProgram
  .command("list-labels")
  .description("list all labels available")
  .action(() => {
    const labels = security.listAllLabels();
    console.log(labels);
  });

cliProgram
  .command("get-rsa [label]")
  .description("Get keypair for a particular label")
  .action((label) => {
    const keypair = security.getRsaKeyPair(label);

    console.log(keypair);
  });

cliProgram
  .command("sign [algorithm] [payload] [privateKey]")
  .description("sign the payload with the private key and returns a jwt token")
  .action((algorithm, payload, privateKey) => {
    const jwt = signature.sign(algorithm, keyId, payload, privateKey);
    console.log(jwt);
  });

cliProgram
  .command("verify [jwt] [publicKey]")
  .description("verify the jwt with the given public key and returns a status")
  .action((jwt, publicKey) => {
    const isValid = signature.verify(jwt, publicKey);
    console.log(isValid);
  });

cliProgram
  .command("verify-pdf [jwt] [ethNodeURL] [didRegistryAddress] [did]")
  .description("verify the pdf proofdata with the given public key stored in blockchain and returns a status")
  .action(async (jwt, ethNodeURL, didRegistryAddress, did) => {
    const isValid = await verification.verify(jwt, ethNodeURL, didRegistryAddress, did);
    console.log(isValid);
  });


cliProgram.parse(process.argv);

