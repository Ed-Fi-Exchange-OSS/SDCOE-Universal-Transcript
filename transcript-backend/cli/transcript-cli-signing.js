const cliProgram = require('commander');
const { verifyPdf} = require('pdf-utils');
const { getConfig } = require('./helpers/resourceUtils');
const { SecurePdfBuilder } = require('pdf-utils');

cliProgram
  .command('secure-pdf <pdfPath>')
  .description('Secures a pdf adding proof-metadata')
  .option('-m, --mode <mode>','Pass either "file" or "did" ')
  .action(async (pdfPath, {mode}) => {
	  if(!mode)
      mode = 'file'

    const digitalSigning = getConfig()?.digitalSigning;
    const signingKeyId = digitalSigning?.signing?.signingKeyId;
    const issuerId = digitalSigning?.signing?.issuerId;
    const jwtIdentifier = digitalSigning?.signing?.jwtIdentifier;
    const verificationKeyId = digitalSigning?.verification[mode]?.verificationKeyId;

    try {
      const securePdf = await new SecurePdfBuilder(pdfPath)
        .setIssuerId(issuerId)
        .setJwtIdentifier(jwtIdentifier)
        .setSigningKeyId(signingKeyId)
        .setVerifyingKeyId(verificationKeyId)
        .build()
      if (securePdf)
        console.log("PDF was secured")
      else
        console.log("Failed to secure PDF")
    } catch (e) {
      console.error(e);
    }
  });


cliProgram
  .command('verify-pdf <pdfPath>')
  .description('Verify a given tamper-evident pdf. The pdf must have "proof-metadata"')
  .action(async (pdfPath) => {
    try {
      const isValid = await new SecurePdfBuilder(pdfPath)
        .verify()
      if (isValid)
        console.log("PDF was verified as un-tampered")
      else
        console.log("Failed to verify PDF as un-tampered")
    } catch (e) {
      console.error(e);
      console.log("Failed to verify PDF as un-tampered")
    }
  });

cliProgram.action(() => {
  cliProgram.help();
});


cliProgram.parse(process.argv);
