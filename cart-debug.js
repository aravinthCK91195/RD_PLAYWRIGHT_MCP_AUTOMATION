const playwright = require('playwright');
(async () => {
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  try {
    await page.goto('https://demowebshop.tricentis.com/books', { waitUntil: 'domcontentloaded', timeout: 30000 });
    const html = await page.locator('.product-item').first().innerHTML();
    console.log(html.slice(0,3000).replace(/\n/g,' '));
    const title = await page.locator('.product-item').first().locator('h2.product-title a, .product-title a, h2, h3, a').first().textContent();
    const price = await page.locator('.product-item').first().locator('.prices .price, .price').first().textContent();
    console.log('TITLE:', title?.trim());
    console.log('PRICE:', price?.trim());
  } catch (e) {
    console.error('ERROR', e.message);
  } finally {
    await browser.close();
  }
})();
