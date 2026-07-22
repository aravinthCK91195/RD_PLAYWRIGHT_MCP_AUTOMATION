import { expect, Page } from '@playwright/test';
import { Routes, Products, ComputerSubcategories } from '../data/constants';
import { CommonTests } from '../../utils/common';

export class BasePage extends CommonTests {

  // Generic method for chaining between pages with <T>
  protected async navigateTo<T extends BasePage>(PageClass: new (page: Page) => T): Promise<T> {
    await this.page.waitForLoadState('domcontentloaded');
    return new PageClass(this.page);
  }

  // Verify URL with chaining - overloaded for type safety
  async VerifyUrl<T extends BasePage>(route: Routes, pageClassOrInstance: (new (page: Page) => T) | T): Promise<T>;
  async VerifyUrl(route: Routes): Promise<void>;
  async VerifyUrl<T extends BasePage>(route: Routes, pageClassOrInstance?: (new (page: Page) => T) | T): Promise<T | void> {
    console.log(`Verifying the landing URL: ${route}`);
    await expect(this.page).toHaveURL(route);
    
    if (!pageClassOrInstance) {
      return; // No page provided - backward compatible
    }

    // Check if it's a page instance (has 'page' property) or a class constructor
    if ('page' in pageClassOrInstance) {
      // It's an instance - return it for chaining
      return pageClassOrInstance as T;
    } else {
      // It's a class constructor - create and return new instance
      return new (pageClassOrInstance as new (page: Page) => T)(this.page);
    }
  }

  

  // Overload 1: Backward compatible signature used by existing tests.
  async selectProduct(page: Page, product: Products): Promise<Page>;
  // Overload 2: Chain-ready signature that returns a typed page object.
  async selectProduct<T extends BasePage>(product: Products, pageClassOrInstance: (new (page: Page) => T) | T): Promise<T>;
  async selectProduct<T extends BasePage>(
    pageOrProduct: Page | Products,
    productOrPageClass: Products | ((new (page: Page) => T) | T)
  ): Promise<Page | T> {
    const isLegacySignature = typeof pageOrProduct !== 'string';
    const product = (isLegacySignature ? productOrPageClass : pageOrProduct) as Products;

    console.log(`Selecting product: ${product}`);
    await this.chooseProduct(product).click();
    await this.page.waitForLoadState('domcontentloaded');

    if (isLegacySignature) {
      return pageOrProduct as Page;
    }

    const pageClassOrInstance = productOrPageClass as (new (page: Page) => T) | T;
    if ('page' in pageClassOrInstance) {
      return pageClassOrInstance as T;
    }
    return new (pageClassOrInstance as new (page: Page) => T)(this.page);
  }


  async selectCategory(category: Products, subcategory: ComputerSubcategories): Promise<void> {
      console.log(`Selecting computer subcategory: ${subcategory}`);
      // Hover over the Computers navigation item to reveal the dropdown
      const categoryLink = this.chooseProduct(category);
      await expect(categoryLink).toBeVisible();
      await categoryLink.hover();     
      
     
      await this.page.waitForTimeout(500); 
      const subcategoryLink = this.chooseProduct(subcategory);
      await expect(subcategoryLink).toBeVisible();
      await subcategoryLink.click();
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

  async clickLogin(): Promise<BasePage> {
    await this.loginLink().click();
    await this.page.waitForLoadState('domcontentloaded');
    return this;
  }

  async clickShoppingCart(): Promise<BasePage> {
    await this.shoppingCartLink().click();
    await this.page.waitForLoadState('domcontentloaded');
    return this;
  }

  async clickWishlist(): Promise<BasePage> {
    await this.wishlistLink().click();
    await this.page.waitForLoadState('domcontentloaded');
    return this;
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