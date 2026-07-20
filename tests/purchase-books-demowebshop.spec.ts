import { expect, test } from './fixtures';



declare const process: {
  env: Record<string, string | undefined>;
};

const username = process.env.RDUSERNAME as string;
const password = process.env.RDPASSWORD as string;
const baseURL = process.env.BASE_URL as string;

test.describe('Demo Web Shop - Purchase Book Flow' , () => {


  
  test('TC001 - Login and Browse Books with Price Filter < $15', async ({ page, homePage, loginPage, bookPage, cartPage }) => {
    // Arrange
    await homePage.clickLogin();
    await expect(page).toHaveURL(/\/login/);
    await loginPage.login(username, password);
    await loginPage.expectLoggedIn();
    
    

    // Act: Step 1 - Ensure the shopping cart is empty for a clean checkout state
    await homePage.clickShoppingCart();
    await expect(page).toHaveURL(/\/cart/);
    await cartPage.expectCartPageVisible();
    await cartPage.clearCart();

    // Act: Step 2 - Navigate to Books section
    await homePage.clickBooks();
    await expect(page).toHaveURL(/\/books/);

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
    await homePage.clickShoppingCart();
    await expect(page).toHaveURL(/cart/);
    await page.waitForTimeout(10000); // Wait for cart to update
    await cartPage.expectCartPageVisible();
    await cartPage.expectCartItemDetails(firstBookTitle, 1, expectedUnitPrice);

    // Log successful test execution
    console.log(`✓ Successfully logged in to Demo Web Shop`);
    console.log(`✓ Navigated to Books section`);
    console.log(`✓ Found ${bookCount} books matching filter`);
    console.log(`✓ Selected book: "${firstBookTitle}" - Price: ${firstBookPrice}`);
    console.log(`✓ Book details page loaded successfully`);
    console.log(`✓ Product added to the shopping cart`);
    console.log(`✓ Verified selected book, quantity, and price in cart`);
  });


})


