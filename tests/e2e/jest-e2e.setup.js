const debug = process.env.TEST_ENV === 'debug';

if (debug) {
  jest.setTimeout(15000);
}
