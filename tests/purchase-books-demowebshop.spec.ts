import { expect, test } from './fixtures';
import { Routes,Products } from '../model/data/constants';

const baseURL = process.env.BASE_URL as string;

declare const process: {
  env: Record<string, string | undefined>;
};


test.describe('Demo Web Shop - Purchase Book Flow' , () => {
  
  test('TC001 - Login, Add Book, and Complete Checkout', async ({ page,basePage, homePage, loginPage, bookPage, cartPage, checkoutPage }) => {   
    
    // Act: Step 1 - Ensure the shopping cart is empty for a clean checkout state
    await homePage.clickShoppingCart();
    await basePage.VerifyUrl(Routes.ShoppingCart);
    await cartPage.clearCart();
  

    // Act: Step 2 - Navigate to Books section using Products enum
    
    await basePage.selectProduct(page, Products.Books);
    await basePage.VerifyUrl(Routes.Books);
    

    // Assert: Step 3 - Verify books page is loaded
    await bookPage.verifyBooksLoaded();

    // Assert: Step 4 - Verify filtered books are available
    const bookCount = await bookPage.getBookCount();
    expect(bookCount).toBeGreaterThan(0);

    // Act: Step 5 - Get first book details before selection
    const firstBook = await bookPage.getBookDetails();
    const firstBookTitle = firstBook.title;
    const firstBookPrice = firstBook.price;
    let expectedUnitPrice = Number((firstBookPrice.match(/\d+(?:\.\d+)?/) || ['0'])[0]);

    // Act: Step 6 - Select first available book
    const selectedBookHref = await bookPage.selectFirstBook();

    // Assert: Step 7 - Verify navigation to the selected book's details page
    expect(selectedBookHref).not.toBeNull();
    const selectedBookPath = new URL(selectedBookHref as string, baseURL).pathname;
    await expect(page).toHaveURL(new RegExp(selectedBookPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await bookPage.verifyProductDetailsLoaded(firstBookTitle);

    // Act: Step 8 - Capture the product detail price and add the selected product to cart
    const detailPriceText = await bookPage.getProductDetailPrice();
    // Extract the last number in the price string (the actual price, not old price)
    const priceMatches = Array.from(detailPriceText.matchAll(/(\d+(?:\.\d+)?)/g));
    expectedUnitPrice = priceMatches.length > 0 ? Number(priceMatches[priceMatches.length - 1][0]) : 0;
    await bookPage.addProductToCart();
    await bookPage.expectProductAddedToCart();

    // Act: Step 9 - Verify the product appears in the shopping cart with correct title, quantity, and price
    await bookPage.clickShoppingCart();
    await expect(page).toHaveURL(Routes.ShoppingCart);
    //await page.waitForTimeout(10000); // Wait for cart to update
    await cartPage.expectCartPageVisible();
    await cartPage.expectCartItemDetails(firstBookTitle, 1, expectedUnitPrice);

    // Act: Step 10 - Accept the terms and proceed to checkout
    await cartPage.agreeToTermsAndConditions();
    await cartPage.clickCheckout();
    await checkoutPage.expectCheckoutPageVisible();

    // Act: Step 11 - Complete the checkout flow
    await checkoutPage.continueBillingAddress();
    await checkoutPage.continueShippingAddress();
    await checkoutPage.continueShippingMethod();
    await checkoutPage.continuePaymentMethod();
    await checkoutPage.continuePaymentInfo();
    await checkoutPage.confirmOrder();

    // Assert: Step 12 - Verify the order was confirmed
    await checkoutPage.expectOrderConfirmed();

    // Log successful test execution
    console.log(`✓ Successfully logged in to Demo Web Shop`);
    console.log(`✓ Navigated to Books section`);
    console.log(`✓ Found ${bookCount} books matching filter`);
    console.log(`✓ Selected book: "${firstBookTitle}" - Price: ${firstBookPrice}`);
    console.log(`✓ Book details page loaded successfully`);
    console.log(`✓ Product added to the shopping cart`);
    console.log(`✓ Verified selected book, quantity, and price in cart`);
    console.log(`✓ Completed checkout and confirmed the order`);
  });


})


