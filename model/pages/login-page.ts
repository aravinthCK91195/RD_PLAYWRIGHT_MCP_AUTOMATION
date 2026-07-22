import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { HomePage } from './home-page';
import { Routes } from '../data/constants';

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }


  async emailInput(): Promise<Locator> {
    return this.page.getByLabel('Email:');
  }

  async passwordInput(): Promise<Locator> {
    return this.page.getByLabel('Password:');
  }

  async loginButton(): Promise<Locator> {
    return this.page.locator('.login-button');
  }

  async logoutLink(): Promise<Locator> {
    return this.page.getByRole('link', { name: 'Log out' });
  }

  async login(username: string, password: string): Promise<HomePage> {
    const emailInput = await this.emailInput();
    const passwordInput = await this.passwordInput();
    const loginButton = await this.loginButton();

    await emailInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();

    // Wait for login to complete - logout link should be visible
    await this.expectLoggedIn();
    
    // Wait for navigation to home page
    await this.VerifyUrl(Routes.Home);
    
    // Return HomePage instance for promise chaining
    return new HomePage(this.page);
  }

  async expectLoggedIn(): Promise<void> {
    const logoutLink = await this.logoutLink();
    await expect(logoutLink).toBeVisible();
  }

  async clickLogout(): Promise<void> {
    const logoutLink = await this.logoutLink();
    await logoutLink.click();
  }

  async expectLoggedOut(): Promise<void> {
    const logoutLink = await this.logoutLink();
    await expect(logoutLink).toBeHidden();
    await expect(this.loginLink()).toBeVisible();
  }
}
