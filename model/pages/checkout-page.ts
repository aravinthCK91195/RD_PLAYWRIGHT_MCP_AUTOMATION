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

  orderNumberText(): Locator {
    return this.page.getByText(/order\s*number\s*:/i).first();
  }

  orderDetailsLink(): Locator {
    return this.page.getByRole('link', { name: /click here for order details/i }).first();
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
    await this.advanceCheckoutStep(this.paymentInfoContinueButton(), this.confirmOrderButton(), 20000);
  }

  async confirmOrder(): Promise<void> {
    const button = this.confirmOrderButton();
    const submittingText = this.page.getByText(/submitting order information/i).first();

    await expect(button).toBeVisible({ timeout: 20000 });
    await button.scrollIntoViewIfNeeded();
    await button.click({ force: true });

    if (await submittingText.isVisible().catch(() => false)) {
      await expect(submittingText).toBeHidden({ timeout: 20000 }).catch(() => {});
    }
  }

  async expectOrderConfirmed(): Promise<void> {
    const completedUrlPattern = /\/checkout\/completed(?:\/\d+)?\/?$/;

    await expect
      .poll(async () => {
        const isCompletedUrl = completedUrlPattern.test(this.page.url());
        const hasSuccessMessage = await this.orderSuccessMessage().isVisible().catch(() => false);
        return isCompletedUrl || hasSuccessMessage;
      }, { timeout: 20000 })
      .toBe(true);

    await expect(this.orderSuccessMessage()).toBeVisible({ timeout: 20000 });
  }

  async getOrderNumber(): Promise<string> {
    await expect(this.orderSuccessMessage()).toBeVisible();
    await expect(this.orderNumberText()).toBeVisible();

    const orderNumberFromText = await this.orderNumberText().textContent().catch(() => null);
    if (orderNumberFromText) {
      const textMatch = orderNumberFromText.match(/order\s*number\s*:\s*([A-Za-z0-9-]+)/i);
      if (textMatch?.[1]) {
        return textMatch[1];
      }
    }

    const orderDetailsHref = await this.orderDetailsLink().getAttribute('href').catch(() => null);
    if (orderDetailsHref) {
      const hrefMatch = orderDetailsHref.match(/\/orderdetails\/(\d+)/i);
      if (hrefMatch?.[1]) {
        return hrefMatch[1];
      }
    }

    const urlMatch = this.page.url().match(/\/checkout\/completed\/(\d+)/i);
    if (urlMatch?.[1]) {
      return urlMatch[1];
    }

    throw new Error('Order number could not be captured from confirmation page');
  }

  private async advanceCheckoutStep(button: Locator, nextButtons: Locator | Locator[], timeoutMs: number = 10000): Promise<void> {
    const targets = Array.isArray(nextButtons) ? nextButtons : [nextButtons];
    const submittingText = this.page.getByText(/submitting order information/i).first();

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
      }, { timeout: timeoutMs })
      .not.toBe('waiting');

    if (await button.isVisible().catch(() => false)) {
      await button.scrollIntoViewIfNeeded();
      await button.click({ force: true });

      if (await submittingText.isVisible().catch(() => false)) {
        await expect(submittingText).toBeHidden({ timeout: timeoutMs }).catch(() => {});
      }

      await expect
        .poll(async () => {
          for (const target of targets) {
            if (await target.isVisible().catch(() => false)) {
              return true;
            }
          }

          return false;
        }, { timeout: timeoutMs })
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
      }, { timeout: timeoutMs })
      .toBe(true);
  }
}