import { expect, Locator, Page } from '@playwright/test';

export class BookPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async init(page: Page): Promise<void> {
    await expect(page).toHaveURL(/\/books/);
  }

  // Price Filter Locators
  async priceFilterInput(): Promise<Locator> {
    return this.page.locator('input[id*="price"]').first();
  }

  async priceFilterButton(): Promise<Locator> {
    return this.page.getByRole('button', { name: /filter|apply/i });
  }

  // Books List Locators
  async bookItems(): Promise<Locator> {
    return this.page.locator('[class*="product-item"]');
  }

  async bookPriceInList(index: number = 0): Promise<Locator> {
    const books = await this.bookItems();
    return books.nth(index).locator('[class*="price"]').first();
  }

  async bookTitleInList(index: number = 0): Promise<Locator> {
    const books = await this.bookItems();
    return books.nth(index).locator('h2, h3, a').first();
  }

  async selectBookButton(index: number = 0): Promise<Locator> {
    const books = await this.bookItems();
    return books.nth(index).locator('a').first();
  }

  // Filter by price less than specified amount
  async filterByPriceLessThan(maxPrice: number): Promise<void> {
    const priceInput = this.page.locator('input[id*="price"], input[name*="price"], input[placeholder*="price" i]').first();

    if (await priceInput.count()) {
      await priceInput.fill(maxPrice.toString());

      const filterButton = await this.priceFilterButton();
      if (await filterButton.isVisible().catch(() => false)) {
        await filterButton.click();
      }

      await this.page.waitForTimeout(1000);
    }
  }

  // Select first available book and return its destination URL
  async selectFirstBook(): Promise<string | null> {
    const firstBook = await this.selectBookButton(0);
    await expect(firstBook).toBeVisible();
    const href = await firstBook.getAttribute('href');
    await firstBook.click();
    return href;
  }

  // Select book by index
  async selectBookByIndex(index: number): Promise<void> {
    const book = await this.selectBookButton(index);
    await expect(book).toBeVisible();
    await book.click();
  }

  // Get number of books displayed
  async getBookCount(): Promise<number> {
    const books = await this.bookItems();
    return await books.count();
  }

  // Verify books are loaded
  async verifyBooksLoaded(): Promise<void> {
    const books = await this.bookItems();
    await expect(books.first()).toBeVisible();
  }

  async getBookDetails(index: number = 0): Promise<{ title: string; price: string }> {
    const titleLocator = await this.bookTitleInList(index);
    const priceLocator = await this.bookPriceInList(index);
    const title = (await titleLocator.textContent())?.trim() ?? '';
    const price = (await priceLocator.textContent())?.trim() ?? '';

    return { title, price };
  }

  // Get first book price
  async getFirstBookPrice(): Promise<string> {
    const priceLocator = await this.bookPriceInList(0);
    return (await priceLocator.textContent())?.trim() ?? '';
  }

  // Get first book title
  async getFirstBookTitle(): Promise<string> {
    const titleLocator = await this.bookTitleInList(0);
    return (await titleLocator.textContent())?.trim() ?? '';
  }
}
