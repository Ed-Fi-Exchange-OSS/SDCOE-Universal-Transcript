const fs = require('fs');
const path = require('path');
const hbs = require('handlebars');
const { getHandlebarModel } = require('./model');
const { browserInstance } = require('./browser-instance');

/**
 * Thanks to https://gist.github.com/benw/3824204
 */
function readPartialsFromDir(directory) {
  const filenames = fs.readdirSync(directory);

  filenames.forEach(function(filename) {
    const matches = /^([^.]+).hbs$/.exec(filename);
    if (!matches) {
      return;
    }
    const name = matches[1];
    const template = fs.readFileSync(directory + '/' + filename, 'utf8');
    hbs.registerPartial(name, template);
  });
}

//hbs helper function to get first char of a string
hbs.registerHelper('firstChar', function(string) {
  const firstStr = string.substring(0, 1);
  return new hbs.SafeString(firstStr);
});

hbs.registerHelper('checkEmpty', function(val) {
  return new hbs.SafeString(val ? val : '--');
});

/**
 * This function takes type of document and registers the partials for handlebars.
 * @param { String } documentType
 */

function setupHandlebars(documentType) {
  readPartialsFromDir(__dirname + `/templates/${documentType}/partials`);
}


function getHandleBarsTemplateFile(documentType) {
  return path.join(__dirname, `templates/${documentType}/${documentType}-transcript.hbs`);
}

async function renderTranscript(transcriptType, standardTranscriptData, destination, otherData) {
  setupHandlebars(transcriptType);
  const handlebarsModel = getHandlebarModel(transcriptType, standardTranscriptData, otherData);
  const handleBarTemplateFile = getHandleBarsTemplateFile(transcriptType);
  return await generatePDF(handlebarsModel, handleBarTemplateFile, destination);
}

async function generatePDF(handlebarsModel, handleBarTemplateFile, destination) {
  const templateFile = fs.readFileSync(handleBarTemplateFile, 'utf-8');

  const template = hbs.compile(templateFile);
  const result = template(handlebarsModel);

  let _browser;
  let _page;
  const filePath = destination ? destination : 'output.pdf';

  try {
    // Thanks to https://remarkablemark.org/blog/2018/04/15/puppeteer-without-async-await/
    await browserInstance()
      .then(browser => (_browser = browser))
      .then(browser => (_page = browser.newPage()))
      .then(page => page.setContent(result))
      .then(() => _page)
      .then(page =>
        page.pdf({
          path: filePath,
          format: 'letter',
          printBackground: true,
          PreferCSSPageSize: true,
          margin: {
            top: '24px',
            bottom: '24px'
          }
        }))
      .catch(console.error)
      .finally(() => {
        _browser.close();
      });
  } catch (e) {
    console.error(e);
  } finally {
    if (_browser)
      _browser.close();
  }

  console.debug(`PDF Rendered : ${filePath}`);

  return { status: 'Success', filePath };
}


module.exports = {
  renderTranscript: renderTranscript
};
