const dotenv = require('dotenv');
const program = require('commander');

const getTemplate = require('../email/utils/getTemplate');
const { sendEmail, initialize } = require('../email/index.js');

program.version('1.0.0').description('SDCOE CLI email application');

dotenv.config();

// Initilize Email
const config = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  username: process.env.SMTP_AUTH_USER,
  password: process.env.SMTP_AUTH_PASSWORD,
};
initialize(config);

program
  .command('send-email')
  .option('--template <template>', 'Email Template')
  .option('--subject <subject>', 'Email Subject')
  .option('--email <email>', "Receiver's email address")
  .option('--download <download>', 'Download link')
  .alias('mail-cli')
  .description('Send an email')
  .parse(process.argv)
  .action((program) => {
    const answers = {
      from: process.env.SMTP_FROM,
      sdcoeLogo: process.env.SDCOE_LOGO_URI,
      templateName: getTemplate(program.template),
      subject: program.subject,
      email: program.email,
      mailTo: process.env.MAIL_TO,
      transcriptLink: program.download || null,
    };

    sendEmail(answers);
  });

program.parse(process.argv);
