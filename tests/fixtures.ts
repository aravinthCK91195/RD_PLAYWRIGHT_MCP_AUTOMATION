import { test as base, expect } from '@playwright/test';
import { HomePage } from '../model/pages/home-page';
import { LoginPage } from '../model/pages/login-page';
import { BookPage } from '../model/pages/book-page';
import { ComputersPage } from '../model/pages/computers-page';
import { CartPage } from '../model/pages/cart-page';
import { CheckoutPage } from '../model/pages/checkout-page';
import { BasePage } from '../model/pages/base-page';
import { WishlistPage } from '../model/pages/wishlist-page';
import { Routes } from '../model/data/constants';
 
const username = process.env.RDUSERNAME as string;
const password = process.env.RDPASSWORD as string;
const baseURL = process.env.BASE_URL as string;
 
type DemoShopFixtures = {
  basePage: BasePage;
  homePage: HomePage;
  loginPage: LoginPage;
  bookPage: BookPage;
  computersPage: ComputersPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  wishlistPage: WishlistPage;
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

  computersPage: async ({ page }, use) => {
    const computersPage = new ComputersPage(page);
    await use(computersPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  wishlistPage: async ({ page }, use) => {
    const wishlistPage = new WishlistPage(page);
    await use(wishlistPage);
  },
});
 
test.beforeEach(async ({ page, basePage, loginPage }) => {
  await page.goto(baseURL);
  
  // VerifyUrl with HomePage chaining
  const homePage = await basePage.VerifyUrl(Routes.Home, HomePage) as HomePage;
  await homePage.expectHomePageVisible();
  
  // Login with promise chaining
  await homePage.clickLogin()
    .then(async (login) => {
      return await login.login(username, password);
    })
    .then(async (home) => {
      await home.expectHomePageVisible();
      console.log('✓ Successfully logged in and on HomePage');
    })
    .catch((error) => {
      console.error('Login chain failed:', error);
      throw error;
    });
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
 