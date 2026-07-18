import { expect, test } from './fixtures';



declare const process: {
  env: Record<string, string | undefined>;
};

const username = process.env.RDUSERNAME as string;
const password = process.env.RDPASSWORD as string;
const baseURL = process.env.BASE_URL as string;

test.describe('Demo Web Shop - Purchase Book Flow', () => {


  
  test('TC001 - Login and Browse Books with Price Filter < $15', async ({ page, homePage, loginPage, bookPage }) => {
    // Arrange
    
    await homePage.clickLogin();
    await expect(page).toHaveURL(/\/login/);
    await loginPage.login(username, password);
    await loginPage.expectLoggedIn();
    
    const priceLimit = 15;

    // Act: Step 1 - Navigate to Books section
    await homePage.clickBooks();
    await expect(page).toHaveURL(/\/books/);

    // Assert: Step 2 - Verify books page is loaded
    await bookPage.verifyBooksLoaded();

    // Act: Step 3 - Apply price filter less than $15
    await bookPage.filterByPriceLessThan(priceLimit);

    // Assert: Step 4 - Verify filtered books are available
    const bookCount = await bookPage.getBookCount();
    expect(bookCount).toBeGreaterThan(0);

    // Act: Step 5 - Get first book details before selection
    const firstBook = await bookPage.getBookDetails();
    const firstBookTitle = firstBook.title;
    const firstBookPrice = firstBook.price;

    // Act: Step 6 - Select first available book
    const selectedBookHref = await bookPage.selectFirstBook();

    console.log(`Selected book: "${firstBookTitle}" - Price: ${firstBookPrice}`);

    // Assert: Step 7 - Verify navigation to the selected book's details page
    expect(selectedBookHref).not.toBeNull();
    const selectedBookPath = new URL(selectedBookHref as string, baseURL).pathname;
    await expect(page).toHaveURL(new RegExp(selectedBookPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await bookPage.verifyBooksLoaded();

    // Act: Step 8 - Add the selected product to cart
    await bookPage.addProductToCart();
    await bookPage.expectProductAddedToCart();

    // Act: Step 9 - Verify the product appears in the shopping cart
    await homePage.clickShoppingCart();
    await expect(page).toHaveURL(/cart/);
    await bookPage.expectProductVisibleInCart(firstBookTitle);

    // Log successful test execution
    console.log(`✓ Successfully logged in to Demo Web Shop`);
    console.log(`✓ Navigated to Books section`);
    console.log(`✓ Applied price filter for books < $${priceLimit}`);
    console.log(`✓ Found ${bookCount} books matching filter`);
    console.log(`✓ Selected book: "${firstBookTitle}" - Price: ${firstBookPrice}`);
    console.log(`✓ Book details page loaded successfully`);
    console.log(`✓ Product added to the shopping cart`);
  });

})


