const puppeteer = require('puppeteer');
const debug = process.env.TEST_ENV === 'debug';
const width = 1280;
const height = 1000;
let launchOptions = {};

if (debug) {
  launchOptions = {
    headless: false,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  };
}

const createBrowser = async () => await puppeteer.launch(launchOptions);
const setViewport = async (page) => await page.setViewport({ width, height });

module.exports = {
  createBrowser,
  setViewport,
};
