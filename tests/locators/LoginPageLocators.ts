import { Locator, Page } from '@playwright/test';

export class LoginPageLocators {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.emailInput = page.getByLabel('Email:');
    this.passwordInput = page.getByLabel('Password:');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }
}
