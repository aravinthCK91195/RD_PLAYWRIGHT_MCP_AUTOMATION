import { expect, Page } from '@playwright/test';
import { HomePageLocators } from '../locators/HomePageLocators';

export class HomePage {
  readonly page: Page;
  readonly locators: HomePageLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new HomePageLocators(page);
  }

   static async init(page: Page) {
    await expect(page).toHaveURL("/");
    return new HomePage(page);
  }
  
  async clickRegister() {
    await this.locators.registerLink.click();
  }

  async clickLogin() {
    await this.locators.loginLink.click();
  }

  async clickShoppingCart() {
    await this.locators.shoppingCartLink.click();
  }

  async expectHomePageVisible() {
    await expect(this.locators.welcomeBanner).toBeVisible();
    await expect(this.locators.welcomeBanner).toHaveText('Welcome to our store');
  }
}
