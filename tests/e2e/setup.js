const puppeteer = require('puppeteer');
const debug = process.env.TEST_ENV === 'debug';
let launchOptions = {};

if (debug) {
  launchOptions = { headless: false, slowMo: 80 };
  jest.setTimeout(15000);
}

const createBrowser = async () => await puppeteer.launch(launchOptions);

module.exports = {
  createBrowser,
};
