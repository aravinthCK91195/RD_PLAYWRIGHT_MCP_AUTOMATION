import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { Routes } from '../data/constants';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  termsAndConditionsCheckbox(): Locator {
    return this.page.locator('input#termsofservice, input[name="termsofservice"], input[type="checkbox"][name*="term"]').first();
  }

  checkoutButton(): Locator {
    return this.page.locator('input.checkout-button, input[name="checkout"], input[value="Checkout"], button.checkout-button, button:has-text("Checkout")').first();
  }

  async navigateToCart(): Promise<void> {
    await this.page.goto(Routes.ShoppingCart);
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.locator('table.cart, .cart')).toBeVisible();
  }

  async expectCartPageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart/);
    const cartTable = this.page.locator('table.cart').first();
    const cartDiv = this.page.locator('[class*="cart"]').first();
    const hasCart = await cartTable.count().then(c => c > 0).catch(() => false);
    const hasCartDiv = await cartDiv.count().then(c => c > 0).catch(() => false);
    if (!hasCart && !hasCartDiv) {
      const msg = await this.page.content();
      console.log('PAGE HTML SNIPPET:', msg.slice(0, 1500).replace(/\n/g, ' '));
      throw new Error('Cart page not visible - no cart table or cart div found');
    }
  }

  async cartRowByTitle(productTitle: string): Promise<Locator> {
    const cartRow = this.page.locator('table.cart tbody tr.cart-item-row').filter({ hasText: productTitle }).first();
    await expect(cartRow).toBeVisible();
    return cartRow;
  }

  async expectProductInCart(productTitle: string): Promise<void> {
    await this.cartRowByTitle(productTitle);
  }

  async isCartEmpty(): Promise<boolean> {
    return (await this.page.locator('table.cart tbody tr.cart-item-row').count()) === 0;
  }

  async clearCart(): Promise<void> {
    const itemRows = this.page.locator('table.cart tbody tr.cart-item-row');
    const itemCount = await itemRows.count();
    if (itemCount === 0) {
      return;
    }

    const removeChecks = this.page.locator('table.cart tbody tr.cart-item-row input[name="removefromcart"]');
    for (let i = 0; i < await removeChecks.count(); i++) {
      await removeChecks.nth(i).check();
    }

    const updateButton = this.page.locator('input[name="updatecart"], button:has-text("Update shopping cart")').first();
    await expect(updateButton).toBeVisible();
    await updateButton.click();

    await expect(this.page.locator('table.cart tbody tr.cart-item-row')).toHaveCount(0);
  }

  async agreeToTermsAndConditions(): Promise<void> {
    const checkbox = this.termsAndConditionsCheckbox();
    await expect(checkbox).toBeVisible();
    await checkbox.scrollIntoViewIfNeeded();

    if (!(await checkbox.isChecked().catch(() => false))) {
      await checkbox.check({ force: true });
    }
  }

  async clickCheckout(): Promise<void> {
    const button = this.checkoutButton();
    await expect(button).toBeVisible();
    await button.scrollIntoViewIfNeeded();
    await button.click({ force: true });
  }

  async getCartItemTitle(productTitle: string): Promise<string> {
    const cartRow = await this.cartRowByTitle(productTitle);
    const titleText = await cartRow.locator('td.product a.product-name, td.product').first().textContent();
    return titleText?.trim() ?? '';
  }

  async getCartItemQuantity(productTitle: string): Promise<number> {
    const cartRow = await this.cartRowByTitle(productTitle);
    const qtyInput = cartRow.locator('input.qty-input, input[type="text"][name*="quantity"], input[name*="quantity"]').first();
    await expect(qtyInput).toBeVisible();
    const value = await qtyInput.inputValue();
    return Number.parseInt(value.trim() || '0', 10);
  }

  async getCartItemUnitPrice(productTitle: string): Promise<number> {
    const cartRow = await this.cartRowByTitle(productTitle);
    const priceText = await cartRow.locator('td.unit-price, td:has-text("Price:"), span.product-unit-price').first().textContent();
    return this.parsePrice(priceText);
  }

  async getCartItemTotalPrice(productTitle: string): Promise<number> {
    const cartRow = await this.cartRowByTitle(productTitle);
    const totalText = await cartRow.locator('td.subtotal, td:has-text("Total:"), span.product-subtotal').first().textContent();
    return this.parsePrice(totalText);
  }

  async expectCartItemDetails(productTitle: string, expectedQty: number, expectedUnitPrice: number): Promise<void> {
    await this.expectProductInCart(productTitle);
    const title = await this.getCartItemTitle(productTitle);
    expect(title).toContain(productTitle);
    const quantity = await this.getCartItemQuantity(productTitle);
    expect(quantity).toBe(expectedQty);
    const unitPrice = await this.getCartItemUnitPrice(productTitle);
    expect(unitPrice).toBe(expectedUnitPrice);
    const totalPrice = await this.getCartItemTotalPrice(productTitle);
    expect(totalPrice).toBe(expectedQty * expectedUnitPrice);
  }

  private parsePrice(text: string | null | undefined): number {
    if (!text) return 0;
    const normalized = text.replace(/,/g, '.');
    const match = normalized.match(/(\d+(?:\.\d+)?)/);
    return match ? Number.parseFloat(match[1]) : 0;
  }
}
