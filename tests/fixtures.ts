import { test as base, expect } from '@playwright/test';
import { HomePage } from '../model/pages/home-page';
import { LoginPage } from '../model/pages/login-page';
import { BookPage } from '../model/pages/book-page';
 
const baseURL = process.env.BASE_URL as string;
 
type DemoShopFixtures = {
  homePage: HomePage;
  loginPage: LoginPage;
  bookPage: BookPage;
};
 
export const test = base.extend<DemoShopFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
 
  loginPage: async ({ page}, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
 
  bookPage: async ({ page }, use) => {
    const bookPage = new BookPage(page);
    await use(bookPage);
  },
});
 
test.beforeEach(async ({ page, homePage }) => {
  await page.goto(baseURL);
  await homePage.expectHomePageVisible();
});
 
test.afterEach(async ({ page }) => {
  await page.context().clearCookies();
  await page.evaluate(() => {
    try {
      window.localStorage.clear();
    } catch {}
    try {
      window.sessionStorage.clear();
    } catch {}
  });
});
 
export { expect };
 