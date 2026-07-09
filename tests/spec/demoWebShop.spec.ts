import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';

const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;

if (!username || !password) {
  throw new Error('USERNAME and PASSWORD must be defined in .env');
}

test.describe('Demo Web Shop login', () => {
  test('should log in with credentials from .env and show home page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, password);
    await loginPage.expectLoggedIn();
    const homePage = new HomePage(page);
    await homePage.expectHomePageVisible();

  });
});
