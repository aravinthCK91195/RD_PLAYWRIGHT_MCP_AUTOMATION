import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { CartPage } from './cart-page';
import { ComputerSubcategories, Products } from '../data/constants';

export class ComputersPage extends BasePage {
  

  constructor(page: Page) {
    super(page);
  }

  // Chaining method - returns CartPage for promise chaining
  async clickShoppingCart(): Promise<CartPage> {
    const shoppingCartLink = await this.shoppingCartLink();
    await shoppingCartLink.click();
    await this.page.waitForLoadState('domcontentloaded');
    return new CartPage(this.page);
  }

  // Hover over Computers and select subcategory
  // async selectComputerSubcategory(category: Products, subcategory: ComputerSubcategories): Promise<void> {
  //   console.log(`Selecting computer subcategory: ${subcategory}`);
  //   // Hover over the Computers navigation item to reveal the dropdown
  //   const categoryLink = this.chooseProduct(category);
  //   await expect(categoryLink).toBeVisible();
  //   await categoryLink.hover();
  //  // const computersNav = this.page.getByRole('link', { name: 'COMPUTERS' });
    
    
  //   // Wait for the dropdown to appear and click the subcategory
  //   await this.page.waitForTimeout(500); // Small delay for hover menu to appear
  //   const subcategoryLink = this.page.getByRole('link', { name: subcategory }).first();
  //   await expect(subcategoryLink).toBeVisible();
  //   await subcategoryLink.click();
  // }

  // Price Filter Locators
  async priceFilterInput(): Promise<Locator> {
    return this.page.locator('input[id*="price"]').first();
  }

  async priceFilterButton(): Promise<Locator> {
    return this.page.getByRole('button', { name: /filter|apply/i });
  }

  
  async computerItems(): Promise<Locator> {
    return this.page.locator('[class*="product-item"]');
  }


  async selectComputerButton(index: number = 0): Promise<Locator> {
    const computers = await this.computerItems();
    return computers.nth(index).locator('h2.product-title a, a.product-name, .product-title a').first();
  }

  // Select first available computer and return its destination URL
  async selectFirstComputer(): Promise<string | null> {
    const firstComputer = await this.selectComputerButton(0);
    await expect(firstComputer).toBeVisible();
    const href = await firstComputer.getAttribute('href');
    await firstComputer.click();
    return href;
  }

  // Select computer by index
  async selectComputerByIndex(index: number): Promise<void> {
    const computer = await this.selectComputerButton(index);
    await expect(computer).toBeVisible();
    await computer.click();
  }

  // Get number of computers displayed
  async getComputerCount(): Promise<number> {
    const computers = await this.computerItems();
    return await computers.count();
  }

  // Verify computers are loaded
  async verifyComputersLoaded(): Promise<void> {
    const computers = await this.computerItems();
    await expect(computers.first()).toBeVisible();
  }

  async verifyProductDetailsLoaded(expectedTitle?: string): Promise<void> {
    const titleLocator = this.page.locator('.product-name, .product-title, h1').first();
    await expect(titleLocator).toBeVisible();
    if (expectedTitle) {
      await expect(titleLocator).toHaveText(new RegExp(expectedTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    }
  }

  async getProductDetailPrice(): Promise<string> {
    await this.page.waitForLoadState('domcontentloaded');
    const priceText = await this.page.evaluate(() => {
      const overview = document.querySelector('.product-essential, .product-overview');
      if (!overview) return null;

      const priceDiv = overview.querySelector('.prices, .product-price, .product-price .price, .product-price');
      if (!priceDiv) return null;

      const actualPrice = priceDiv.querySelector('.price.actual-price:not(.old-price), .price:not(.old-price)');
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

  async getComputerDetails(index: number = 0): Promise<{ title: string; price: string }> {
    const titleLocator = await this.computerTitleInList(index);
    const priceLocator = await this.computerPriceInList(index);
    const title = (await titleLocator.textContent())?.trim() ?? '';
    const price = (await priceLocator.textContent())?.trim() ?? '';

    return { title, price };
  }

  async computerTitleInList(index: number = 0): Promise<Locator> {
    const computers = await this.computerItems();
    return computers.nth(index).locator('h2.product-title a, .product-title a').first();
  }

  async computerPriceInList(index: number = 0): Promise<Locator> {
    const computers = await this.computerItems();
    return computers
      .nth(index)
      .locator('.prices .price.actual-price, .prices .price, .price')
      .first();
  }

  // Get first computer price
  async getFirstComputerPrice(): Promise<string> {
    const priceLocator = await this.computerPriceInList(0);
    return (await priceLocator.textContent())?.trim() ?? '';
  }

  // Get first computer title
  async getFirstComputerTitle(): Promise<string> {
    const titleLocator = await this.computerTitleInList(0);
    return (await titleLocator.textContent())?.trim() ?? '';
  }
}
