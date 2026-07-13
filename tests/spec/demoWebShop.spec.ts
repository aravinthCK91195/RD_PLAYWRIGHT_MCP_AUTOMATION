import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';

const username = process.env.RDUSERNAME as string;
const password = process.env.RDPASSWORD as string;

test.beforeEach(async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  const homePage = new HomePage(page);
    await homePage.expectHomePageVisible();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);
    await loginPage.login(username, password, page);
    await loginPage.expectLoggedIn();
});

 test.describe('Demo Web Shop scenarios', () => {

  test('TC001 should log in and browse the Books section', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickBooks();
    await expect(page).toHaveURL(/books/i);

    await homePage.selectFirstBook();
    await expect(page).not.toHaveURL(/books/i);
    await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();

    await page.waitForTimeout(20000); // Wait for 5 seconds to observe the result
  });
});


