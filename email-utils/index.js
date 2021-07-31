const { sendEmail, initialize } = require('./email/index.js');
const  getTemplate  = require('./email/utils/getTemplate');

module.exports = {
  initialize,
  sendEmail,
  getTemplate
};
