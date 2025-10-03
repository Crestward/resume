import { test, expect } from '@playwright/test';

test.describe('Portfolio Website', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    // Check if the page title is present
    await expect(page).toHaveTitle(/Portfolio/i);
  });

  test('hero section is visible', async ({ page }) => {
    await page.goto('/');

    // Wait for the hero section to be visible
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
  });

  test('contact section with profile card is visible', async ({ page }) => {
    await page.goto('/');

    // Scroll to the contact section
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait a bit for animations
    await page.waitForTimeout(1000);

    // Check if "Let's Connect" heading exists
    const connectHeading = page.getByText(/Let's Connect/i);
    await expect(connectHeading).toBeVisible();

    // Check if profile card is present
    const profileCard = page.locator('.pc-card');
    await expect(profileCard).toBeVisible();
  });

  test('social links are working', async ({ page }) => {
    await page.goto('/');

    // Scroll smoothly to trigger animations
    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    // Wait for scroll and animations
    await page.waitForTimeout(3000);

    // Check if social links container exists and has links
    const socialLinksContainer = page.locator('a[aria-label="LinkedIn"]');
    await expect(socialLinksContainer).toBeAttached();

    // Verify links are present in the DOM
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toBeAttached();
    await expect(page.getByRole('link', { name: 'GitHub' })).toBeAttached();
    await expect(page.getByRole('link', { name: 'Email' })).toBeAttached();
  });

  test('footer is visible and contains tech stack', async ({ page }) => {
    await page.goto('/');

    // Scroll to bottom
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await page.waitForTimeout(1000);

    // Check footer content - use more specific selectors
    await expect(page.getByText(/© 2025 Oladimeji Adeyemi/i)).toBeVisible();
    await expect(page.locator('.footer-tech-stack').getByText(/Next.js/i)).toBeVisible();
    await expect(page.locator('.footer-tech-stack').getByText(/Three.js/i)).toBeVisible();
    await expect(page.locator('.footer-tech-stack').getByText(/GSAP/i)).toBeVisible();
    await expect(page.locator('.footer-tech-stack').getByText(/Tailwind CSS/i)).toBeVisible();
  });

  test('no console errors on page load', async ({ page }) => {
    const errors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');

    // Wait for page to load (use domcontentloaded instead of networkidle)
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Check for critical errors (ignore some common warnings)
    const criticalErrors = errors.filter(error =>
      !error.includes('Failed to load resource') &&
      !error.includes('favicon')
    );

    expect(criticalErrors).toHaveLength(0);
  });
});
