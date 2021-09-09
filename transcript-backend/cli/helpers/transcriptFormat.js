const availableFormats = {
  standard: ['pdf', 'json'],
  rop: ['pdf']
};


/**
 * This function takes the PDF type i.e either standard or rop and format i.e. pdf or json as an argument
 * and returns either true, false or throws error
 *
 * @param { String } type
 * @param { String } format
 * @returns { bool }
 */
function isFormatAvailable(type, format) {
  return availableFormats[type] ? availableFormats[type].includes(format) : false;
}

module.exports = isFormatAvailable;

