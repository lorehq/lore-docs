import { test, expect } from '@playwright/test';

test.describe('Theme Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('updates data-theme when a theme button is clicked', async ({ page }) => {
    await page.click('button[data-set-theme="latte"]');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'latte');
  });

  test('persists theme preference in localStorage', async ({ page }) => {
    await page.click('button[data-set-theme="solarized-light"]');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'solarized-light');
  });
});
