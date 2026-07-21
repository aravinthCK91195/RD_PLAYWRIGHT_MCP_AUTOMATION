import { expect, test } from './fixtures';
import { Routes,Products } from '../model/data/constants';

const baseURL = process.env.BASE_URL as string;
const username = process.env.RDUSERNAME as string;
const password = process.env.RDPASSWORD as string;

declare const process: {
  env: Record<string, string | undefined>;
};


test.describe('Demo Web Shop - Purchase Book Flow' , () => {
  
  test('TC001 - Login, Add Book, and Complete Checkout', async ({ page,basePage, homePage, loginPage, bookPage, cartPage, checkoutPage }) => {   
    let bookCount = 0;
    let firstBookTitle = '';
    let firstBookPrice = '';
    let expectedUnitPrice = 0;
    let orderNumber = '';

    

    await test.step('TC03 - Open Books Section and Select Product', async () => {
      await homePage.clickShoppingCart();
      await basePage.VerifyUrl(Routes.ShoppingCart);
      await cartPage.clearCart();

      await basePage.selectProduct(page, Products.Books);
      await basePage.VerifyUrl(Routes.Books);
      await bookPage.verifyBooksLoaded();

      bookCount = await bookPage.getBookCount();
      expect(bookCount).toBeGreaterThan(0);

      const firstBook = await bookPage.getBookDetails();
      firstBookTitle = firstBook.title;
      firstBookPrice = firstBook.price;
      expectedUnitPrice = Number((firstBookPrice.match(/\d+(?:\.\d+)?/) || ['0'])[0]);

      const selectedBookHref = await bookPage.selectFirstBook();
      expect(selectedBookHref).not.toBeNull();

      const selectedBookPath = new URL(selectedBookHref as string, baseURL).pathname;
      await expect(page).toHaveURL(new RegExp(selectedBookPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      await bookPage.verifyProductDetailsLoaded(firstBookTitle);

      console.log(`✓ Books page loaded (${bookCount} books found)`);
      console.log(`✓ Selected book: "${firstBookTitle}" - Price: ${firstBookPrice}`);
    });

    await test.step('TC04 - Add Product to Cart', async () => {
      const detailPriceText = await bookPage.getProductDetailPrice();
      const priceMatches = Array.from(detailPriceText.matchAll(/(\d+(?:\.\d+)?)/g));
      expectedUnitPrice = priceMatches.length > 0 ? Number(priceMatches[priceMatches.length - 1][0]) : 0;

      await bookPage.addProductToCart();
      await bookPage.expectProductAddedToCart();
      console.log('✓ Product added to the shopping cart');
    });

    await test.step('TC05 - Navigate to Shopping Cart', async () => {
      await bookPage.clickShoppingCart();
      await expect(page).toHaveURL(Routes.ShoppingCart);
      await cartPage.expectCartPageVisible();
      await cartPage.expectCartItemDetails(firstBookTitle, 1, expectedUnitPrice);
      console.log('✓ Verified selected product in shopping cart');
    });

    await test.step('TC06 - Complete Checkout', async () => {
      await cartPage.agreeToTermsAndConditions();
      await cartPage.clickCheckout();
      await checkoutPage.expectCheckoutPageVisible();
      await checkoutPage.continueBillingAddress();
      await checkoutPage.continueShippingAddress();
      await checkoutPage.continueShippingMethod();
      await checkoutPage.continuePaymentMethod();
      await checkoutPage.continuePaymentInfo();
      await checkoutPage.confirmOrder();
      await checkoutPage.expectOrderConfirmed();
      console.log('✓ Checkout completed successfully');
    });

    await test.step('TC07 - Save and Verify Order Number', async () => {
      orderNumber = await checkoutPage.getOrderNumber();
      expect(orderNumber).toBeTruthy();
      console.log(`✓ Captured order number: ${orderNumber}`);
    });

    await test.step('TC08 - Logout', async () => {
      await loginPage.clickLogout();
      await loginPage.expectLoggedOut();
      console.log('✓ Logged out successfully');
    });
  });


})


