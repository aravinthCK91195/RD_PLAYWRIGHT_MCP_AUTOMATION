# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: amazon.spec.ts >> searches for a product and shows results
- Location: tests\amazon.spec.ts:13:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#twotabsearchtextbox')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - heading "Click the button below to continue shopping" [level=4] [ref=e9]
    - button "Continue shopping" [ref=e18] [cursor=pointer]
  - generic [ref=e21]:
    - link "Conditions of Use" [ref=e22] [cursor=pointer]:
      - /url: https://www.amazon.com/gp/help/customer/display.html/ref=footer_cou?ie=UTF8&nodeId=508088
    - link "Privacy Policy" [ref=e23] [cursor=pointer]:
      - /url: https://www.amazon.com/gp/help/customer/display.html/ref=footer_privacy?ie=UTF8&nodeId=468496
  - generic [ref=e24]: © 1996-2025, Amazon.com, Inc. or its affiliates
```

# Test source

```ts
  1  | import { expect, type Page } from '@playwright/test';
  2  | 
  3  | export class AmazonHomePage {
  4  |   constructor(private readonly page: Page) {}
  5  | 
  6  |   async open() {
  7  |     await this.page.goto('https://www.amazon.com');
  8  |     await this.page.waitForLoadState('domcontentloaded');
  9  |     return this;
  10 |   }
  11 | 
  12 |   async assertLoaded() {
  13 |     await expect(this.page).toHaveTitle(/Amazon/);
  14 |     await expect(this.page).toHaveURL(/https:\/\/www\.amazon\.com(\/|$)/);
  15 |   }
  16 | 
  17 |   async searchForProduct(productName: string) {
> 18 |     await this.page.locator('#twotabsearchtextbox').fill(productName);
     |                                                     ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  19 |     await this.page.locator('#nav-search-submit-button').click();
  20 |   }
  21 | 
  22 |   async assertSearchResults(productName: string) {
  23 |     await expect(this.page).toHaveURL(new RegExp(`/s\?k=${encodeURIComponent(productName).replace(/%20/g, '\\+')}`));
  24 |     await expect(this.page.locator('#twotabsearchtextbox')).toHaveValue(productName);
  25 |     await expect(this.page.locator('[data-component-type="s-search-result"]').first()).toBeVisible();
  26 |   }
  27 | }
  28 | 
```