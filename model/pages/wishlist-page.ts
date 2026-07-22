import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { CartPage } from './cart-page';
import { Routes } from '../data/constants';

export class WishlistPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  wishlistRows(): Locator {
    return this.page.locator('table.wishlist tbody tr');
  }

  async navigateToWishlist(): Promise<void> {
    await this.page.goto(Routes.Wishlist);
    await this.page.waitForLoadState('domcontentloaded');
    await this.expectWishlistPageVisible();
  }

  async expectWishlistPageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/\/wishlist/);
    await expect(this.page.locator('table.wishlist, .wishlist-content').first()).toBeVisible();
  }

  async getWishlistItemCount(): Promise<number> {
    return this.wishlistRows().count();
  }

  async clickShoppingCart(): Promise<CartPage> {
    const shoppingCartLink = await this.shoppingCartLink();
    await shoppingCartLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    return new CartPage(this.page);
  }
}
