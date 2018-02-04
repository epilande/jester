const { createBrowser, setViewport } = require('./utils');
let browser;
let page;

const github = {
  url: 'https://github.com/',
  user: 'epilande',
  repo: 'jester',
};

beforeAll(async () => {
  browser = await createBrowser();
  page = await browser.newPage();
  await setViewport(page);
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
    await page.type(
      '.header-search-input',
      `user:${github.user} ${github.repo}`,
    );
    const searchInput = await page.$('.header-search-input');
    await searchInput.press('Enter');
    await page.waitForNavigation();
    const repoList = await page.$('.repo-list');
    expect(repoList).toBeTruthy();
  });

  test(`go to repo ${github.user}/${github.repo}`, async () => {
    const repoLink = await page.$(`a[href="/${github.user}/${github.repo}"]`);
    await repoLink.click();
    await page.waitForNavigation();
    const repoContent = await page.$('.repository-content');
    expect(repoContent).toBeTruthy();
  });
});
