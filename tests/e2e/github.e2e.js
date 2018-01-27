const { createBrowser } = require('./setup');
let browser;
let page;

const github = {
  url: 'https://github.com/',
  user: 'epilande',
  repo: 'yarems',
};

beforeAll(async () => {
  browser = await createBrowser();
  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
});

afterAll(async () => {
  await browser.close();
});

describe('Github view repo', async () => {
  test('has search input', async () => {
    await page.goto(github.url);
    const searchInput = await page.$('.header-search-input');
    expect(searchInput).toBeTruthy();
  });

  test('shows search results after search input', async () => {
    await page.type('.header-search-input', github.repo);
    const searchInput = await page.$('.header-search-input');
    await searchInput.press('Enter');
    await page.waitForNavigation();
    const repoList = await page.$('.repo-list');
    expect(repoList).toBeTruthy();
  });

  test('go to repo', async () => {
    const repoLink = await page.$(`a[href="/${github.user}/${github.repo}"]`);
    await repoLink.click();
    await page.waitForNavigation();
    const repoContent = await page.$('.repository-content');
    expect(repoContent).toBeTruthy();
  });
});
