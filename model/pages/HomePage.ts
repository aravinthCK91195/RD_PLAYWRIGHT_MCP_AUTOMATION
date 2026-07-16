import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async init(page: Page): Promise<void> {
    await super.init(page);
    await expect(page).toHaveURL('/');
  }

  // async loginLink(): Promise<Locator> {
  //   return this.page.getByRole('link', { name: 'Log in' });
  // }

  // async searchInput(): Promise<Locator> {
  //   return this.page.getByPlaceholder('Search store');
  // }

  // async searchButton(): Promise<Locator> {
  //   return this.page.getByRole('button', { name: 'Search' });
  // }

  // async registerLink(): Promise<Locator> {
  //   return this.page.getByRole('link', { name: 'Register' });
  // }

  // async shoppingCartLink(): Promise<Locator> {
  //   return this.page.getByRole('link', { name: 'Shopping cart' });
  // }

  async welcomeBanner(): Promise<Locator> {
    return this.page.getByText('Welcome to our store').first();
  }

  async booksLink(): Promise<Locator> {
    return this.page.getByRole('link', { name: 'Books' }).first();
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
    const booksLink = await this.booksLink();
    await booksLink.click();
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
