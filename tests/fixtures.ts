import { test as base, expect } from '@playwright/test';
import { HomePage } from '../model/pages/home-page';
import { LoginPage } from '../model/pages/login-page';
import { BookPage } from '../model/pages/book-page';
import { CartPage } from '../model/pages/cart-page';
import { CheckoutPage } from '../model/pages/checkout-page';
import { BasePage } from '../model/pages/base-page';
import { Routes } from '../model/data/constants';
 
const username = process.env.RDUSERNAME as string;
const password = process.env.RDPASSWORD as string;
const baseURL = process.env.BASE_URL as string;
 
type DemoShopFixtures = {
  basePage: BasePage;
  homePage: HomePage;
  loginPage: LoginPage;
  bookPage: BookPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};
 
export const test = base.extend<DemoShopFixtures>({

basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },

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

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});
 
test.beforeEach(async ({ page, homePage, basePage,loginPage }) => {
  await page.goto(baseURL);
  await basePage.VerifyUrl(Routes.Home);
  await homePage.expectHomePageVisible();
  await homePage.clickLogin();
  await loginPage.login(username, password);
  await loginPage.expectLoggedIn();
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
 