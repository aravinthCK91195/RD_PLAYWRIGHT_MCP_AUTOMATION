import { Locator, Page } from '@playwright/test';

export class LoginPageLocators {
  private emailInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    this.emailInput = page.getByLabel('Email:');
    this.passwordInput = page.getByLabel('Password:');
    this.loginButton = page.getByRole('button', { name: 'Log in' });
    this.logoutLink = page.getByRole('link', { name: 'Log out' });
  }
}
