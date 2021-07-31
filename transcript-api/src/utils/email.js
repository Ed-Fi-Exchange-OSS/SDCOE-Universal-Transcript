require('../env');

const { initialize, sendEmail, getTemplate } = require('email-utils');

// Initialize Email
const config = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  username: process.env.SMTP_AUTH_USER,
  password: process.env.SMTP_AUTH_PASSWORD,
};

initialize(config);

const emailer = async (subject, email, template, transcriptLink = null) => {
  const emailConfig = {
    from: process.env.SMTP_FROM,
    templateName: getTemplate(template),
    subject: subject,
    email: email,
    mailTo: process.env.MAIL_TO,
    sdcoeLogo: process.env.SDCOE_LOGO_URI,
    transcriptLink: transcriptLink || null,
  };

  if (email) {
    const emailInfo = await sendEmail(emailConfig);

    return emailInfo;
  } else {
    throw new Error('Email address was not set');
  }
};

module.exports = {
  emailer,
};
