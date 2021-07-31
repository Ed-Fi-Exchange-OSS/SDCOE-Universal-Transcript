const puppeteer = require('puppeteer');

async function browserInstance() {
  const browser = puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true
  });

  return browser;
}

module.exports = { browserInstance };
