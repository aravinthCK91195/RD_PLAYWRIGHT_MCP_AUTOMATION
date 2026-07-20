import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { Routes } from '../data/constants';

export class BookPage extends BasePage {
  

  constructor(page: Page) {
    super(page);
  }

 async VerifyBooks(page: Page): Promise<void> {
    await expect(page).toHaveURL(Routes.Books);
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


  async selectBookButton(index: number = 0): Promise<Locator> {
    const books = await this.bookItems();
    return books.nth(index).locator('h2.product-title a, a.product-name, .product-title a').first();
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

      await expect(this.bookItems().first()).toBeVisible();
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

  async addProductToCart(): Promise<void> {
    const addToCartButton = this.page.locator('input[type="button"][value*="Add to cart"], button:has-text("Add to cart")').first();
    await expect(addToCartButton).toBeVisible();
    await addToCartButton.click();
  }

  async expectProductAddedToCart(): Promise<void> {
    const successMessage = this.page.locator('text=The product has been added to your shopping cart').first();
    await expect(successMessage).toBeVisible();
  }

  async expectProductVisibleInCart(productTitle: string): Promise<void> {
    const cartItem = this.page.locator('.cart-item-row, tr').filter({ hasText: productTitle }).first();
    await expect(cartItem).toBeVisible();
  }

  async getBookDetails(index: number = 0): Promise<{ title: string; price: string }> {
    const titleLocator = await this.bookTitleInList(index);
    const priceLocator = await this.bookPriceInList(index);
    const title = (await titleLocator.textContent())?.trim() ?? '';
    const price = (await priceLocator.textContent())?.trim() ?? '';

    return { title, price };
  }

  async verifyProductDetailsLoaded(expectedTitle: string): Promise<void> {
    const heading = this.page.locator('h1').first();
    await expect(heading).toHaveText(new RegExp(expectedTitle, 'i'));
  }

  async bookTitleInList(index: number = 0): Promise<Locator> {
    const books = await this.bookItems();
    return books.nth(index).locator('h2.product-title a, .product-title a').first();
  }

  async bookPriceInList(index: number = 0): Promise<Locator> {
    const books = await this.bookItems();
    const book = books.nth(index);
    const actualPriceLocator = book.locator('.prices .price.actual-price').first();
    if (await actualPriceLocator.count()) {
      return actualPriceLocator;
    }
    return book.locator('.prices .price, .price').first();
  }

  async getProductDetailPrice(): Promise<string> {
    await this.page.waitForLoadState('domcontentloaded');
    const priceText = await this.page.evaluate(() => {
      const overview = document.querySelector('.product-essential, .product-overview');
      if (!overview) return null;
      
      const priceDiv = overview.querySelector('.prices, .product-price');
      if (!priceDiv) return null;
      
      const actualPrice = priceDiv.querySelector('.price.actual-price:not(.old-price)');
      if (actualPrice) {
        return actualPrice.textContent?.trim();
      }
      
      const prices = Array.from(priceDiv.querySelectorAll('.price'));
      if (prices.length > 0) {
        return prices[prices.length - 1].textContent?.trim();
      }
      
      return priceDiv.textContent?.trim();
    });
    
    if (!priceText) {
      throw new Error('Could not find product detail price');
    }
    
    return priceText;
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
