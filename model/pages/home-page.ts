import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { Routes,Products } from '../data/constants';

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

  async clickLogin(): Promise<void> {
    const loginLink = await this.loginLink();
    await loginLink.click();
  }

  async clickShoppingCart(): Promise<void> {
    const shoppingCartLink = await this.shoppingCartLink();
    await shoppingCartLink.click();
  }

  async clickBooks(): Promise<void> {
    // Backwards compatible helper that uses the Products enum
    await this.selectProduct(Products.Books);
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
