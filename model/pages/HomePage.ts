import { expect, Page } from '@playwright/test';


export class HomePage {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
    this.init(page);
  }

   async init(page: Page) {
    await expect(page).toHaveURL('/');
  }

   loginLink() {
    return this.page.getByRole('link', { name: 'Log in' });
  }

  searchInput(){
    return this.page.getByPlaceholder('Search store');
  }

  searchButton(){
    return this.page.getByRole('button', { name: 'Search' });
  }

   registerLink() {
    return this.page.getByRole('link', { name: 'Register' });
  }

  shoppingCartLink() {
    return this.page.getByRole('link', { name: 'Shopping cart' });
  }

  welcomeBanner() {
    return this.page.getByText('Welcome to our store').first();
  }

  booksLink() {
    return this.page.getByRole('link', { name: 'Books' }).first();
  }

  productTitleLinks() {
    return this.page.locator('h2.product-title a');
  }


  async clickRegister() {
    await this.registerLink().click();
  }

  async clickLogin() {
    await this.loginLink().click();
  }

  async clickShoppingCart() {
    await this.shoppingCartLink()   .click();
  }

  async clickBooks() {
    await this.booksLink().click();
  }

  async selectFirstBook() {
    await this.productTitleLinks().first().click();
  }

  async expectHomePageVisible() {
    await expect(this.welcomeBanner()).toBeVisible();
    await expect(this.welcomeBanner()).toHaveText('Welcome to our store');
  }
}
