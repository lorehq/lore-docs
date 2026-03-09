import { test, expect } from '@playwright/test';

test.describe('Font Switcher', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4321');
  });

  test('should update data-font attribute and computed font-family', async ({ page }) => {
    const fonts = ['neon', 'argon', 'xenon', 'radon', 'krypton'];
    const fontFamilies = {
      neon: '"Monaspace Neon"',
      argon: '"Monaspace Argon"',
      xenon: '"Monaspace Xenon"',
      radon: '"Monaspace Radon"',
      krypton: '"Monaspace Krypton"',
    };

    for (const font of fonts) {
      // Click the font button
      await page.click(`button[data-set-font="${font}"]`);

      // Check the data-font attribute on html element
      const htmlFont = await page.getAttribute('html', 'data-font');
      expect(htmlFont).toBe(font);

      // Check the computed font-family on body element
      // Note: Computed style might include fallbacks, so we check if it contains the font name
      const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
      expect(bodyFont).toContain(fontFamilies[font]);
    }
  });

  test('should persist font preference in localStorage', async ({ page }) => {
    await page.click('button[data-set-font="krypton"]');
    
    // Reload the page
    await page.reload();

    const htmlFont = await page.getAttribute('html', 'data-font');
    expect(htmlFont).toBe('krypton');

    const bodyFont = await page.evaluate(() => getComputedStyle(document.body).fontFamily);
    expect(bodyFont).toContain('Monaspace Krypton');
  });
});
