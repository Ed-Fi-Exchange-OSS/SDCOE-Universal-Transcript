/**
 * @param { String } base64String
 * @returns { String }
 */
function base64ToString(base64String) {
  return Buffer.from(base64String, 'base64').toString('ascii');
}

/**
 * @param { String } string
 * @returns { String }
 */
function stringToBase64(string) {
  return Buffer.from(string).toString('base64');
}

module.exports = {
  stringToBase64,
  base64ToString,
};
