import { test } from '@playwright/test';
import { HomePage } from './pages/HomePage';

const BASE_URL = 'https://demowebshop.tricentis.com/';

test.describe('Demo Web Shop homepage', () => {
  test('should load homepage and show welcome banner', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.expectHomePageVisible();
  });

  test('should search for a product from the homepage', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.searchProduct('computer');
  });

  test('should navigate to login page from homepage', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.clickLogin();
  });
});
