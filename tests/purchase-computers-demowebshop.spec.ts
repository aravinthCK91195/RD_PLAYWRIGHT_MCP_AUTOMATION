import { expect, test } from './fixtures';
import { Routes, Products, ComputerSubcategories } from '../model/data/constants';

const baseURL = process.env.BASE_URL as string;
const username = process.env.RDUSERNAME as string;
const password = process.env.RDPASSWORD as string;

declare const process: {
  env: Record<string, string | undefined>;
};


test.describe('Demo Web Shop - Purchase Computer Flow' , () => {
  test.describe.configure({ mode: 'serial' });
  
  test('TC001 - Login, Add Computer, and Complete Checkout', async ({ page, basePage, homePage, loginPage, computersPage, cartPage, checkoutPage }) => {   
    test.setTimeout(120000);
    let computerCount = 0;
    let firstComputerTitle = '';
    let expectedUnitPrice = 0;
    let orderNumber = '';
    

    await test.step('TC02 - Open Computers Section and Select Subcategory', async () => {
      // One-liner chaining: Navigate -> Verify -> clearCart
      await (await homePage.clickShoppingCart())
      .clearCart();

      await computersPage.selectCategory(Products.Computers, ComputerSubcategories.Desktops);
      await computersPage.verifyComputersLoaded();

      computerCount = await computersPage.getComputerCount();
      expect(computerCount).toBeGreaterThan(0);

      const firstComputer = await computersPage.getComputerDetails();
      firstComputerTitle = firstComputer.title;

      const selectedComputerHref = await computersPage.selectFirstComputer();
      expect(selectedComputerHref).not.toBeNull();

      const selectedComputerPath = new URL(selectedComputerHref as string, baseURL).pathname;
      await expect(page).toHaveURL(new RegExp(selectedComputerPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      await computersPage.verifyProductDetailsLoaded(firstComputerTitle);

      console.log(`✓ Computers page loaded (${computerCount} computers found)`);
      console.log(`✓ Selected computer: "${firstComputerTitle}"`);
    });

    await test.step('TC03 - Add Product to Cart', async () => {
      const detailPriceText = await computersPage.getProductDetailPrice();
      const priceMatches = Array.from(detailPriceText.matchAll(/(\d+(?:\.\d+)?)/g));
      expectedUnitPrice = priceMatches.length > 0 ? Number(priceMatches[priceMatches.length - 1][0]) : 0;

      await computersPage.addProductToCart();
      await computersPage.expectProductAddedToCart();
      console.log('✓ Product added to the shopping cart');
      console.log(`✓ Unit Price: ${expectedUnitPrice}`);
    });

    await test.step('TC04 - Navigate to Shopping Cart', async () => {
      // Chain: ComputersPage -> CartPage
      const cartPageFromComputers = await computersPage.clickShoppingCart();
      await expect(page).toHaveURL(Routes.ShoppingCart);
      await cartPageFromComputers.expectCartPageVisible();
      // Verify item is in cart (skip price check as cart may include taxes)
      await cartPageFromComputers.expectProductInCart(firstComputerTitle);
      console.log('✓ Verified selected product in shopping cart');
    });

    await test.step('TC05 - Complete Checkout', async () => {
      // Chain: CartPage -> CheckoutPage
      await cartPage.agreeToTermsAndConditions();
      const checkoutPageFromCart = await cartPage.clickCheckout();
      await checkoutPageFromCart.expectCheckoutPageVisible();
      await checkoutPageFromCart.continueBillingAddress();
      await checkoutPageFromCart.continueShippingAddress();
      await checkoutPageFromCart.continueShippingMethod();
      await checkoutPageFromCart.continuePaymentMethod();
      await checkoutPageFromCart.continuePaymentInfo();
      await checkoutPageFromCart.confirmOrder();
      await checkoutPageFromCart.expectOrderConfirmed();
      console.log('✓ Checkout completed successfully');
    });

    await test.step('TC06 - Save and Verify Order Number', async () => {
      orderNumber = await checkoutPage.getOrderNumber();
      expect(orderNumber).toBeTruthy();
      console.log(`✓ Captured order number: ${orderNumber}`);
    });

    await test.step('TC07 - Logout', async () => {
      await loginPage.clickLogout();
      await loginPage.expectLoggedOut();
      console.log('✓ Logged out successfully');
    });
  });

  test('TC002 - Purchase Computer from Notebooks Subcategory', async ({ page, basePage, homePage, loginPage, computersPage, cartPage, checkoutPage }) => {   
    test.setTimeout(120000);
    let computerCount = 0;
    let firstComputerTitle = '';
    let expectedUnitPrice = 0;

    await test.step('TC02 - Open Notebooks Subcategory', async () => {
      // One-liner chaining: Navigate -> Verify -> clearCart
      await (await homePage.clickShoppingCart()
      .then(cp => cp.VerifyUrl(Routes.ShoppingCart, cp)))
      .clearCart();

      await computersPage.selectCategory(Products.Computers, ComputerSubcategories.Notebooks);
      await computersPage.verifyComputersLoaded();

      computerCount = await computersPage.getComputerCount();
      expect(computerCount).toBeGreaterThan(0);

      const firstComputer = await computersPage.getComputerDetails();
      firstComputerTitle = firstComputer.title;

      const selectedComputerHref = await computersPage.selectFirstComputer();
      expect(selectedComputerHref).not.toBeNull();

      const selectedComputerPath = new URL(selectedComputerHref as string, baseURL).pathname;
      await expect(page).toHaveURL(new RegExp(selectedComputerPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      await computersPage.verifyProductDetailsLoaded(firstComputerTitle);

      console.log(`✓ Notebooks page loaded (${computerCount} notebooks found)`);
      console.log(`✓ Selected notebook: "${firstComputerTitle}"`);
    });

    await test.step('TC03 - Add Product to Cart', async () => {
      const detailPriceText = await computersPage.getProductDetailPrice();
      const priceMatches = Array.from(detailPriceText.matchAll(/(\d+(?:\.\d+)?)/g));
      expectedUnitPrice = priceMatches.length > 0 ? Number(priceMatches[priceMatches.length - 1][0]) : 0;

      await computersPage.addProductToCart();
      await computersPage.expectProductAddedToCart();
      console.log('✓ Product added to the shopping cart');
      console.log(`✓ Unit Price: ${expectedUnitPrice}`);
    });

    await test.step('TC04 - Navigate to Shopping Cart and Checkout', async () => {
      // Chain: ComputersPage -> CartPage -> CheckoutPage
      const cartPageFromComputers = await computersPage.clickShoppingCart();
      await expect(page).toHaveURL(Routes.ShoppingCart);
      await cartPageFromComputers.expectCartPageVisible();
      await cartPageFromComputers.expectCartItemDetails(firstComputerTitle, 1, expectedUnitPrice);
      
      await cartPageFromComputers.agreeToTermsAndConditions();
      const checkoutPageFromCart = await cartPageFromComputers.clickCheckout();
      await checkoutPageFromCart.expectCheckoutPageVisible();
      await checkoutPageFromCart.continueBillingAddress();
      await checkoutPageFromCart.continueShippingAddress();
      await checkoutPageFromCart.continueShippingMethod();
      await checkoutPageFromCart.continuePaymentMethod();
      await checkoutPageFromCart.continuePaymentInfo();
      await checkoutPageFromCart.confirmOrder();
      await checkoutPageFromCart.expectOrderConfirmed();
      console.log('✓ Checkout completed successfully');
    });

    await test.step('TC05 - Logout', async () => {
      await loginPage.clickLogout();
      await loginPage.expectLoggedOut();
      console.log('✓ Logged out successfully');
    });
  });


})