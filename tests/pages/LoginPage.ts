import { expect, Page } from '@playwright/test';

export class LoginPage {
  private  page: Page;
  

  constructor(page: Page) {
    this.page = page;
    this.init(page);
  
  }

   async init(page: Page) {
    await expect(page).toHaveURL("/login");
    
  }

  emailInput() {
    return this.page.getByLabel('Email:');
  }

  passwordInput() {
    return this.page.getByLabel('Password:');
  }

  loginButton() {
    return this.page.locator('.login-button');
  }

  logoutLink() {
    return this.page.getByRole('link', { name: 'Log out' });
  }

  async login(username: string, password: string, page: Page) {
    await this.emailInput().fill(username);
    await this.passwordInput().fill(password);

    
    await this.loginButton().click();
    
  }

  async expectLoggedIn() {
    await expect(this.logoutLink()).toBeVisible();
  }
}
