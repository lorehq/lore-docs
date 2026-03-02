import { test, expect } from '@playwright/test';

const ROUTES = [
  { path: '/',                          title: 'About',           content: 'lore' },
  { path: '/explanation/architecture',  title: 'Architecture',    content: 'Enclave' },
  { path: '/explanation/memory',        title: 'Heat-Based',      content: 'Hot Tier' },
  { path: '/how-to',                    title: 'How-to',          content: null },
  { path: '/reference',                 title: 'Reference',       content: null },
];

for (const { path, title, content } of ROUTES) {
  test(`${path} renders without error`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    // No error page
    await expect(page.locator('text=An error occurred')).not.toBeVisible();
    await expect(page.locator('text=ENOENT')).not.toBeVisible();

    // Title in <title> tag
    await expect(page).toHaveTitle(new RegExp(title, 'i'));

    // Layout elements present
    await expect(page.locator('aside')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Nav links present
    await expect(page.locator('aside a[href="/"]')).toBeVisible();
    await expect(page.locator('aside a[href="/explanation/architecture"]')).toBeVisible();

    // Content if specified
    if (content) {
      await expect(page.locator('article')).toContainText(content);
    }
  });
}

test('architecture page renders actual content not empty', async ({ page }) => {
  await page.goto('/explanation/architecture');
  const article = page.locator('article');
  await expect(article).toContainText('Secure Enclave');
  await expect(article).toContainText('Sidecar');
  await expect(article).toContainText('LORE SIDE-CAR');
});

test('memory page renders actual content', async ({ page }) => {
  await page.goto('/explanation/memory');
  const article = page.locator('article');
  await expect(article).toContainText('Hot Tier');
  await expect(article).toContainText('Memprint');
});

test('logo is visible on home page', async ({ page }) => {
  await page.goto('/');
  const logo = page.locator('div.whitespace-pre');
  await expect(logo).toBeVisible();
  // figlet art — check for structural chars rather than the word "lore"
  await expect(logo).toContainText('___');
});

test('solarized dark colors applied', async ({ page }) => {
  await page.goto('/');
  const body = page.locator('body');
  const bg = await body.evaluate(el =>
    getComputedStyle(el).getPropertyValue('background-color')
  );
  // #002b36 = rgb(0, 43, 54)
  expect(bg).toBe('rgb(0, 43, 54)');
});

test('nav links are all reachable', async ({ page }) => {
  await page.goto('/');
  const links = await page.locator('aside a').all();
  for (const link of links) {
    const href = await link.getAttribute('href');
    if (!href || href.startsWith('#')) continue;
    const resp = await page.request.get(href);
    expect(resp.status(), `${href} should return 200`).toBe(200);
  }
});
