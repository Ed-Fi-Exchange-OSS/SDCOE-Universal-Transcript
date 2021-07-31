/**
 * Converts attribute to Hex value
 * Reference: https://github.com/uport-project/ethr-did/blob/develop/src/index.js
 * @param {string} key attribute key
 * @param {string} value attribute value
 */
function attributeToHex(key, value) {
  if (Buffer.isBuffer(value)) {
    return `0x${value.toString('hex')}`;
  }
  const match = key.match(/^did\/(pub|auth|svc)\/(\w+)(\/(\w+))?(\/(\w+))?$/);
  if (match) {
    const encoding = match[6];
    if (encoding === 'base64') {
      return `0x${Buffer.from(value, 'base64').toString('hex')}`;
    }
  }
  if (value.match(/^0x[0-9a-fA-F]*$/)) {
    return value;
  }
  return `0x${Buffer.from(value).toString('hex')}`;
}

module.exports = attributeToHex;
