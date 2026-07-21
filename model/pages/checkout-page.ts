import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { Routes } from '../data/constants';

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  checkoutStep(stepName: RegExp): Locator {
    return this.page.locator('li').filter({ has: this.page.getByRole('heading', { name: stepName }) }).first();
  }

  orderSuccessMessage(): Locator {
    return this.page.locator('strong, .result').filter({ hasText: /your order has been successfully processed/i }).first();
  }

  checkoutTitle(): Locator {
    return this.page.getByRole('heading', { name: /checkout/i }).first();
  }

  billingAddressContinueButton(): Locator {
    return this.checkoutStep(/billing address/i).locator('input[type="button"][value="Continue"]:visible, button:has-text("Continue"):visible').first();
  }

  shippingAddressContinueButton(): Locator {
    return this.checkoutStep(/shipping address/i).locator('input[type="button"][value="Continue"]:visible, button:has-text("Continue"):visible').first();
  }

  shippingMethodContinueButton(): Locator {
    return this.checkoutStep(/shipping method/i).locator('input[type="button"][value="Continue"]:visible, button:has-text("Continue"):visible').first();
  }

  paymentMethodContinueButton(): Locator {
    return this.checkoutStep(/payment method/i).locator('input[type="button"][value="Continue"]:visible, button:has-text("Continue"):visible').first();
  }

  paymentInfoContinueButton(): Locator {
    return this.checkoutStep(/payment information/i).locator('input[type="button"][value="Continue"]:visible, button:has-text("Continue"):visible').first();
  }

  confirmOrderButton(): Locator {
    return this.checkoutStep(/confirm order/i).locator('input[type="button"][value="Confirm"]:visible, button:has-text("Confirm"):visible').first();
  }

  async navigateToCheckout(): Promise<void> {
    await this.page.goto(Routes.Checkout);
    await this.page.waitForLoadState('domcontentloaded');
    await this.expectCheckoutPageVisible();
  }

  async expectCheckoutPageVisible(): Promise<void> {
    await expect(this.page).toHaveURL(/\/onepagecheckout/);
    await expect(this.checkoutTitle()).toBeVisible();
  }

  async continueBillingAddress(): Promise<void> {
    await this.advanceCheckoutStep(this.billingAddressContinueButton(), this.shippingAddressContinueButton());
  }

  async continueShippingAddress(): Promise<void> {
    await this.advanceCheckoutStep(this.shippingAddressContinueButton(), [this.shippingMethodContinueButton(), this.paymentMethodContinueButton()]);
  }

  async continueShippingMethod(): Promise<void> {
    await this.advanceCheckoutStep(this.shippingMethodContinueButton(), this.paymentMethodContinueButton());
  }

  async continuePaymentMethod(): Promise<void> {
    await this.advanceCheckoutStep(this.paymentMethodContinueButton(), [this.paymentInfoContinueButton(), this.confirmOrderButton()]);
  }

  async continuePaymentInfo(): Promise<void> {
    await this.advanceCheckoutStep(this.paymentInfoContinueButton(), this.confirmOrderButton());
  }

  async confirmOrder(): Promise<void> {
    const button = this.confirmOrderButton();
    await expect(button).toBeVisible();
    await button.scrollIntoViewIfNeeded();
    await button.click({ force: true });
  }

  async expectOrderConfirmed(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout\/completed\/?$/);
    await expect(this.orderSuccessMessage()).toBeVisible();
  }

  private async advanceCheckoutStep(button: Locator, nextButtons: Locator | Locator[]): Promise<void> {
    const targets = Array.isArray(nextButtons) ? nextButtons : [nextButtons];

    await expect
      .poll(async () => {
        if (await button.isVisible().catch(() => false)) {
          return 'button';
        }

        for (const target of targets) {
          if (await target.isVisible().catch(() => false)) {
            return 'next';
          }
        }

        return 'waiting';
      }, { timeout: 10000 })
      .not.toBe('waiting');

    if (await button.isVisible().catch(() => false)) {
      await button.scrollIntoViewIfNeeded();
      await button.click({ force: true });
      await expect
        .poll(async () => {
          for (const target of targets) {
            if (await target.isVisible().catch(() => false)) {
              return true;
            }
          }

          return false;
        }, { timeout: 10000 })
        .toBe(true);
      return;
    }

    await expect
      .poll(async () => {
        for (const target of targets) {
          if (await target.isVisible().catch(() => false)) {
            return true;
          }
        }

        return false;
      }, { timeout: 10000 })
      .toBe(true);
  }
}