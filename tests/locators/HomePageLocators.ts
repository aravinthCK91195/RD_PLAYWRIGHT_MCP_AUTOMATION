import { Locator, Page } from '@playwright/test';

export class HomePageLocators {
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly registerLink: Locator;
  readonly loginLink: Locator;
  readonly shoppingCartLink: Locator;
  readonly welcomeBanner: Locator;

  constructor(page: Page) {
    this.searchInput = page.getByPlaceholder('Search store');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.loginLink = page.getByRole('link', { name: 'Log in' });
    this.shoppingCartLink = page.getByRole('link', { name: 'Shopping cart' });
    this.welcomeBanner = page.locator('div.topic-html-content').getByText('Welcome to our store');
  }
}
