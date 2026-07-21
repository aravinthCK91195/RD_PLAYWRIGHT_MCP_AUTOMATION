import { expect, Page } from '@playwright/test';
import { Routes, Products } from '../data/constants';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async VerifyUrl( route: Routes): Promise<void> {
    console.log(`Verifying the landing URL: ${route}`);
    await expect(this.page).toHaveURL(route);
  }

  async selectProduct(page:Page,product: Products): Promise<void> {
  console.log(`Selecting product: ${product}`);
  await this.page.getByRole('link', { name: product }).first().click();
  }
  
  registerLink() {
    return this.page.getByRole('link', { name: 'Register' });
  }

  loginLink() {
    return this.page.getByRole('link', { name: 'Log in' });
  }

  shoppingCartLink() {
    return this.page.getByRole('link', { name: /shopping cart/i }).filter({ hasNot: this.page.locator('.cart-qty') }).first();
  }

  wishlistLink() {
    return this.page.getByRole('link', { name: 'Wishlist' });
  }

  searchInput() {
    return this.page.getByPlaceholder('Search store');
  }

  searchButton() {
    return this.page.getByRole('button', { name: 'Search' });
  }


  // ----------------------------
  // Actions
  // ----------------------------

  async clickRegister() {
    await this.registerLink().click();
  }

  async clickLogin() {
    await this.loginLink().click();
  }

  async clickShoppingCart() {
    await this.shoppingCartLink().click();
  }

  async clickWishlist() {
    await this.wishlistLink().click();
  }

  async enterSearchText(productName: string) {
    await this.searchInput().fill(productName);
  }

  async clickSearch() {
    await this.searchButton().click();
  }

  async searchProduct(productName: string) {
    await this.enterSearchText(productName);
    await this.clickSearch();
  }

  // ----------------------------
  // Getters
  // ----------------------------

  async getShoppingCartCount(): Promise<number> {
    const text = await this.shoppingCartLink().textContent();
    const match = text?.match(/(\d+)/);
    return match ? Number.parseInt(match[1], 10) : 0;
  }

  async getWishlistCount(): Promise<number> {
    const text = await this.wishlistLink().textContent();
    const match = text?.match(/(\d+)/);
    return match ? Number.parseInt(match[1], 10) : 0;
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async getPageTitle() {
    return this.page.title();
  }

  // ----------------------------
  // Validations
  // ----------------------------

  async expectHeaderVisible() {
    await expect(this.registerLink()).toBeVisible();
    await expect(this.loginLink()).toBeVisible();
    await expect(this.shoppingCartLink()).toBeVisible();
    await expect(this.wishlistLink()).toBeVisible();
    await expect(this.searchInput()).toBeVisible();
    await expect(this.searchButton()).toBeVisible();
  }

  async verifyDemoWebShopHeaderVisible(
    url?: string,
    navigate = false
  ) {
    if (navigate && url) {
      await this.page.goto(url);
    }

    await this.page.waitForLoadState('domcontentloaded');

    const candidates = [
      this.page.getByRole('heading', { name: /Demo Web Shop/i }),
      this.page.locator('text=Sample Application by Tricentis'),
      this.page.locator('img[alt*="Demo Web Shop"]'),
      this.page.locator('.header-logo img'),
    ];

    for (const locator of candidates) {
      if (await locator.count()) {
        await expect(locator.first()).toBeVisible();
        return;
      }
    }

    throw new Error('Demo Web Shop header/banner not visible');
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
  }
}