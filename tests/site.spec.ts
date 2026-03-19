import { test, expect } from '@playwright/test';

const ROUTES = [
  { path: '/', title: 'Lore', content: 'abstraction layer over agentic coding harnesses' },
  { path: '/getting-started', title: 'Getting Started', content: 'The Fast Path' },
  { path: '/getting-started/get-up-and-running', title: 'Get Up and Running', content: 'Create new project' },
  { path: '/concepts/what-lore-is', title: 'What Lore Is', content: 'standardizes and projects five things' },
  { path: '/concepts/the-tui-experience', title: 'The TUI Experience', content: 'mouse support' },
];

for (const { path, title, content } of ROUTES) {
  test(`${path} renders without error`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(new RegExp(title, 'i'));
    await expect(page.locator('aside')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('article')).toContainText(content);
  });
}

test('top-level tabs are visible', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('header')).toContainText('Home');
  await expect(page.locator('header')).toContainText('Getting Started');
  await expect(page.locator('header')).toContainText('Concepts');
});
