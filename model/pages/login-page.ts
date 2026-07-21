import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
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

  async login(username: string, password: string): Promise<void> {
    const emailInput = await this.emailInput();
    const passwordInput = await this.passwordInput();
    const loginButton = await this.loginButton();

    await emailInput.fill(username);
    await passwordInput.fill(password);
    await loginButton.click();
  }

  async expectLoggedIn(): Promise<void> {
    const logoutLink = await this.logoutLink();
    await expect(logoutLink).toBeVisible();
  }
}
