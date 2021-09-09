const fs = require('fs');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

let transport;
const initialize = ({ host, port, username, password }) => {
  transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: username,
      pass: password,
    },
  });
};

const sendEmail = ({ templateName, from, email, subject, sdcoeLogo, mailTo, transcriptLink = null }) => {
  // Open template file
  const source = fs.readFileSync(`${__dirname}/templates/${templateName}`, 'utf8');
  // Create email generator
  const template = handlebars.compile(source);
  const replacements = {
    sdcoeLogo: sdcoeLogo,
    mailTo: mailTo,
    transcriptLink: transcriptLink,
  };
  const htmlToSend = template(replacements);

  const mailOptions = {
    from: from,
    to: email,
    subject: subject,
    text: 'Hey .. ',
    html: htmlToSend,
  };

  return transport.sendMail(mailOptions);
};

module.exports = { initialize, sendEmail };
