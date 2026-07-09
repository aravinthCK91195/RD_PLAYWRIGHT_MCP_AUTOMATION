import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';

const username = process.env.RDUSERNAME as string;
const password = process.env.RDPASSWORD as string;



test.beforeEach(async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
});

test.describe('Demo Web Shop login', () => {
  test('should log in with credentials from .env and show home page', async ({ page }) => {
    const homePage = await HomePage.init(page);
    await homePage.expectHomePageVisible();
    await homePage.clickLogin();
    
    const loginPage = await LoginPage.init(page);    
    await loginPage.login(username, password);
    await loginPage.expectLoggedIn();
    

  });
});
