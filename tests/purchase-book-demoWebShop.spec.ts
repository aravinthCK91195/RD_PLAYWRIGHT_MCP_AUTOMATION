import { expect, test } from '@playwright/test';
import { HomePage } from '../model/pages/HomePage';
import { LoginPage } from '../model/pages/LoginPage';
import { BookPage } from '../model/pages/BookPage';

const username = process.env.RDUSERNAME as string;
const password = process.env.RDPASSWORD as string;
const baseURL = process.env.BASE_URL as string;

test.describe('Demo Web Shop - Purchase Book Flow', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let bookPage: BookPage;

  test.beforeEach(async ({ page }) => {
    // Arrange: Initialize page objects
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    bookPage = new BookPage(page);

    // Navigate to home page
    await page.goto(baseURL);

    console.log('Validating Demo Web Shop header via BasePage helper...');
    await homePage.verifyDemoWebShopHeaderVisible(baseURL, false);
    console.log('Demo Web Shop header validation passed.');

    // Login functionality
    await homePage.expectHomePageVisible();
    await homePage.clickLogin();
    await expect(page).toHaveURL(/\/login/);
    await loginPage.login(username, password);
    await loginPage.expectLoggedIn();
  });

  test('TC001 - Login and Browse Books with Price Filter < $15', async ({ page }) => {
    // Arrange
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
    //await bookPage.verifyBookDetails(firstBookTitle, firstBookPrice);

    // Log successful test execution
    console.log(`✓ Successfully logged in to Demo Web Shop`);
    console.log(`✓ Navigated to Books section`);
    console.log(`✓ Applied price filter for books < $${priceLimit}`);
    console.log(`✓ Found ${bookCount} books matching filter`);
    console.log(`✓ Selected book: "${firstBookTitle}" - Price: ${firstBookPrice}`);
    console.log(`✓ Book details page loaded successfully`);
  });

})


