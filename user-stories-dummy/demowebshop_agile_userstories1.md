## Demo Web Shop - Top Navigation Menu: Agile User Stories

Context: https://demowebshop.tricentis.com/ — top navigation contains categories (Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, Gift Cards). These user stories focus on verifying that selecting a category displays the appropriate items and supports Add to Cart actions for functional, automation, and E2E testing.

---

**User Story 1 — View Categories in Top Navigation**
- ID: US-TNM-001
- As a: Shopper
- I want: to see the top navigation listing product categories (Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, Gift Cards)
- So that: I can quickly navigate to the product category I'm interested in.

Acceptance Criteria:
- AC1.1: The top navigation displays the following category labels: Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, Gift Cards.
- AC1.2: Each category is rendered as a clickable element (link or button).
- AC1.3: Categories are visible and accessible on page load without requiring login.
- AC1.4 (Accessibility): Each category has an accessible name and is reachable via keyboard (tab focus) and has an ARIA role appropriate for navigation links.

Test Steps (functional):
1. Navigate to the home page.
2. Observe the top navigation bar.
3. Verify presence of each category label and that each is clickable.

Automation Notes:
- Preferred selectors: link text (e.g., text=Books), or data-test-id if available. Use Playwright's `getByRole('link', { name: 'Books' })` where possible. Include waits for navigation stability.

---

**User Story 2 — Navigate to Category Page**
- ID: US-TNM-002
- As a: Shopper
- I want: to click a category in the top navigation and land on the category page showing only items for that category
- So that: I can browse items relevant to my interest.

Acceptance Criteria:
- AC2.1: Clicking a category navigates to a category-specific page or view.
- AC2.2: The category page displays a header or breadcrumb that includes the selected category name.
- AC2.3: Product listing on the category page shows only items that belong to the selected category.
- AC2.4: The URL reflects the category (e.g., contains `/books` or query param) and is bookmarkable.
- AC2.5 (Edge): If the category has many items, pagination or infinite scroll is present and functional.

Test Steps (functional):
1. From the home page, click `Books` in the top navigation.
2. Wait for navigation to complete.
3. Verify the page header/breadcrumb contains "Books" and that product tiles shown are books (product titles or category tags indicate Books).

Automation Notes:
- After clicking, assert `page.url()` contains an expected path fragment (e.g., `/books`).
- Validate product cards by checking category metadata, product attributes, or by verifying known book product titles.

---

**User Story 3 — Add Item to Cart from Category Listing**
- ID: US-TNM-003
- As a: Shopper
- I want: to add a product to the cart directly from the category listing
- So that: I can quickly collect items without visiting each product detail page.

Acceptance Criteria:
- AC3.1: Each product tile includes an actionable `Add to cart` control (button/link) that is visible/enabled.
- AC3.2: Clicking `Add to cart` triggers an add-to-cart action and shows a confirmation (toast, modal, or inline message).
- AC3.3: The global/cart icon count increments by one (or by the specified quantity) and persists across pages.
- AC3.4: The cart page contains the newly added item with correct name, price, and quantity.
- AC3.5 (Negative): If adding fails (out of stock), the user receives an informative error and the cart is not incremented.

Test Steps (functional):
1. Navigate to `Computers` category from the top nav.
2. In the listing, choose the first product and click `Add to cart`.
3. Verify a success confirmation appears and the cart count increments.
4. Open the cart and verify the product details.

Automation Notes:
- Use stable selectors for the product card and its `Add to cart` button (e.g., product card index, data attributes). After clicking, wait for the confirmation element and assert cart-count text changes.
- For repeatable tests, remove items from cart in test teardown.

---

**User Story 4 — Category Empty State Handling**
- ID: US-TNM-004
- As a: Shopper
- I want: a clear message when a selected category has no products
- So that: I understand there are no items available and can choose another category.

Acceptance Criteria:
- AC4.1: If a category has no items, the category page displays a clear empty-state message (for example, "No products were found in this category").
- AC4.2: The page provides an affordance to return to the home page or browse other categories.

Test Steps (functional):
1. Navigate to a category known (or stubbed) to have zero items.
2. Verify the empty-state message and the presence of helpful navigation links.

Automation Notes:
- In automation, mock or prepare test data to ensure the empty-state path is exercised. Assert presence of specific empty-state selector and its text.

---

**User Story 5 — Sorting & Filtering within Category (Supportive Story)**
- ID: US-TNM-005
- As a: Shopper
- I want: to apply available sorting or filtering options on the category page
- So that: I can refine results (e.g., price low->high, bestseller) before adding items to cart.

Acceptance Criteria:
- AC5.1: Sorting options (if present) are visible and selectable.
- AC5.2: Applying a sort changes the order of displayed products accordingly.
- AC5.3: Filters (price range, manufacturer, etc.) update the product listing to match criteria.

Automation Notes:
- Exercise sorting and filter combinations; assert ordering and result counts. Use deterministic waits for list refresh.

---

## End-to-End Test Scenario (covering main flow)
- Scenario: Select category and add first visible item to cart
  - Given the shopper is on the home page
  - When the shopper clicks the `Electronics` category in top navigation
  - And the shopper clicks `Add to cart` on the first displayed product
  - Then a success confirmation is shown
  - And the cart count increments by 1
  - And the cart page contains the added product with correct details

Test Steps (E2E):
1. Go to home page.
2. Click `Electronics` from top navigation.
3. Wait for products to load.
4. Click `Add to cart` on first product tile.
5. Assert visible confirmation and cart badge increment.
6. Navigate to cart and assert product line item details.

Automation Implementation Notes:
- Use Playwright `page.getByRole('link', { name: 'Electronics' })` to click the category.
- For product selection, use `page.locator('.product-item').first()` then click its add-to-cart button.
- After add, `await page.waitForSelector('.bar-notification')` (or site-specific selector) and assert text.
- Cleanup: remove the created line item from the cart in test teardown to keep tests idempotent.

---

## Test Data & Environment Notes
- Use a fresh, authenticated or unauthenticated session depending on whether cart is persisted for guest users on the site.
- Prefer test accounts for scenarios requiring persistent carts across sessions.

---

## Traceability & Next Steps
- Link these stories to product backlog items and create automated Playwright specs for each Acceptance Criteria.
- Prioritize US-TNM-002 and US-TNM-003 for the first automation sprint (navigation and Add to Cart).
