import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { Routes, Products } from '../data/constants';
import { LoginPage } from './login-page';
import { CartPage } from './cart-page';

export class HomePage extends BasePage {
  

  constructor(page: Page) {
    super(page);
  }

  async welcomeBanner(): Promise<Locator> {
    return this.page.getByText('Welcome to our store').first();
  }

  async productTitleLinks(): Promise<Locator> {
    return this.page.locator('h2.product-title a');
  }

  async clickRegister(): Promise<void> {
    const registerLink = await this.registerLink();
    await registerLink.click();
  }

  // Chaining method - returns LoginPage for promise chaining
  async clickLogin(): Promise<LoginPage> {
    const loginLink = await this.loginLink();
    await loginLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    return new LoginPage(this.page);
  }

  // Chaining method - returns CartPage for promise chaining
  async clickShoppingCart(): Promise<CartPage> {
    const shoppingCartLink = await this.shoppingCartLink();
    await shoppingCartLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    return new CartPage(this.page);
  }

  async selectFirstBook(): Promise<void> {
    const productTitleLinks = await this.productTitleLinks();
    await productTitleLinks.first().click();
  }

  async expectHomePageVisible(): Promise<void> {
    const welcomeBanner = await this.welcomeBanner();
    await expect(welcomeBanner).toBeVisible();
    await expect(welcomeBanner).toHaveText('Welcome to our store');
  }
}
