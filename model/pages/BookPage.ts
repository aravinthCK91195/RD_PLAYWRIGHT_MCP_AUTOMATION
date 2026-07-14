import { expect, Page } from '@playwright/test';

export class BookPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
    this.init(page);
  }

  async init(page: Page) {
    await expect(page).toHaveURL(/\/p\//);
  }

  bookTitle() {
    return this.page.locator('h1.product-name').first();
  }

  bookPrice() {
    return this.page.locator('[class*="price"]').first();
  }

  bookDescription() {
    return this.page.locator('[class*="description"]').first();
  }

  addToCartButton() {
    return this.page.getByRole('button', { name: /Add to cart/i });
  }

  addToWishlistButton() {
    return this.page.getByRole('button', { name: /Add to wishlist/i });
  }

  quantityInput() {
    return this.page.locator('input[name="addtocart_1.EnteredQuantity"]');
  }

  backToBooks() {
    return this.page.getByRole('link', { name: 'back to the product list' });
  }

  async addBookToCart(quantity: number = 1) {
    if (quantity > 1) {
      await this.quantityInput().fill(quantity.toString());
    }
    await this.addToCartButton().click();
  }

  async addBookToWishlist() {
    await this.addToWishlistButton().click();
  }

  async getBookTitle(): Promise<string | null> {
    return await this.bookTitle().textContent();
  }

  async getBookPrice(): Promise<string | null> {
    return await this.bookPrice().textContent();
  }

  async verifyBookPageLoaded(): Promise<void> {
    await expect(this.bookTitle()).toBeVisible();
  }
}
