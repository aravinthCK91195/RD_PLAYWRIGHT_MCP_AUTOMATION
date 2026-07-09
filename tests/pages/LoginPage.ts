import { expect, Page } from '@playwright/test';
import { LoginPageLocators } from '../locators/LoginPageLocators';

export class LoginPage {
  private  page: Page;
  private locators: LoginPageLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new LoginPageLocators(page);
  
  }

  static async init(page: Page) {
    await expect(page).toHaveURL("/login");
    return new LoginPage(page);
  }

  async login(username: string, password: string) {
    await this.locators.emailInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.loginButton.click();
  }

  async expectLoggedIn() {
    await expect(this.locators.logoutLink).toBeVisible();
  }
}
