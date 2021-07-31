const constants = require('./constants');
const { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync } = require('fs');
const path = require('path');
const security = require('security-utils/blockchain/security');

/**
 * Returns the path of the configuration/settings file
 * @returns {string}
 */
const getConfigPath = () => {
  return path.join(constants.CONFIG_FILE);
};

/**
 * Returns the template used to create the configuration file
 * @returns {any}
 */
const getConfigFileTemplate = () => {
  const templatePath = constants.CONFIG_TEMPLATE_PATH;
  const fileContent = readFileSync(templatePath, 'utf8');
  return JSON.parse(fileContent);
}

/**
 * Returns the configuration file
 * @returns {any}
 */
const getConfig = () => {
  const configFilePath = getConfigPath();
  if (existsSync(configFilePath)) {
    const fileContent = readFileSync(configFilePath, 'utf8');
    return JSON.parse(fileContent);
  } else {
    return {}
  }

};

/**
 * Returns the location of the resource directory
 * @returns {string}
 */
const getResourceDir = () => {

  const config = getConfig()
  return config["resourceDir"] || constants.DEFAULT_RESOURCE_DIR
}

/**
 * Resets the configuration file to the initial state
 */
const resetConfigFile = () => {
  const configFilePath = getConfigPath();
  const configTemplate = getConfigFileTemplate();
  writeFileSync(configFilePath, JSON.stringify(configTemplate, null, 2));
};

/**
 * Initializes the configuration file if it doesn't exist
 */
const initializeConfigFile = () => {
  const configFilePath = getConfigPath();
  if (!existsSync(configFilePath))
    resetConfigFile();
};

/**
 * Creates a resource directory
 */
const createResourceDir = () => {
  const resourceDir = getResourceDir()
  if (!existsSync(resourceDir)) {
    console.debug('Creating resource directory');
    mkdirSync(resourceDir);
  }

  if (!existsSync(getJSONDir())) {
    console.debug('Creating JSON directory');
    mkdirSync(getJSONDir());
  }

  if (!existsSync(getPDFDir())) {
    console.debug('Creating PDF directory');
    mkdirSync(getPDFDir());
  }

  if (!existsSync(getSecretDir())) {
    console.debug('Creating (not so) secret directory');
    mkdirSync(getSecretDir());
  }
};

/**
 * Returns location of the JSON directory
 * @returns {string}
 */
const getJSONDir = () => {
  return path.join(getResourceDir(), constants.JSON_RESOURCE_DIR);
}

/**
 * Returns location of the PDF directory
 * @returns {string}
 */
const getPDFDir = () => {
  return path.join(getResourceDir(), constants.PDF_RESOURCE_DIR);
}


/**
 * Saves the JSON file to the JSON directory
 * @param fileName
 * @param data
 */
const saveJSONFile = (fileName, data) => {
  const filePath = path.join(getJSONDir(), fileName);
  writeFileSync(filePath, JSON.stringify(data, null, 2));
};

/**
 * Returns the list of JSON files from the JSON directory
 * @returns {[]}
 */
const getJSONFiles = () => {
  const jsonDir = getJSONDir();

  const listOfFiles = [];

  readdirSync(jsonDir).forEach(file => {
    listOfFiles.push(path.join(jsonDir, file));
  });

  return listOfFiles;
};

/**
 * Returns the list of PDF files from the PDF directory
 * @returns {[]}
 */
const getPDFFiles = () => {
  const pdfDir = getPDFDir();

  const listOfFiles = [];

  readdirSync(pdfDir).forEach(file => {
    listOfFiles.push(path.join(pdfDir, file));
  });

  return listOfFiles;
};

const getSecretDir = () => {
  return path.join(getResourceDir(), constants.SECRET_RESOURCE_DIR);
}

/***
 * WARNING: Do not use in actual development or in production
 *
 * Will create a short sample key pair to be used by default by CLI.
 *
 */
const createSampleKeyPair = (override=false) => {

  const privateFilePath = path.join(getSecretDir(), 'private.key');
  const publicFilePath = path.join(getSecretDir(), 'public.key');

  if (override || !existsSync(privateFilePath)) {
    const keyPair = security.generateRsaKeyPair(constants.RSA_BIT_LENGTH);

    writeFileSync(privateFilePath, keyPair.private)
    writeFileSync(
      publicFilePath,
      Buffer.from(keyPair.public).toString("base64")
    )

    console.debug('Sample Key pair created')
  }


}

module.exports = {
  initializeConfigFile,
  createResourceDir,
  resetConfigFile,
  getConfig,
  getConfigPath,
  saveJSONFile,
  getJSONFiles,
  getPDFDir,
  getPDFFiles,
  createSampleKeyPair
};