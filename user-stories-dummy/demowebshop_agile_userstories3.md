# Demo Web Shop - Agile User Stories for Login, Navigation, Cart, Checkout, and Logout

## Document Purpose
This document provides Agile-ready functional decomposition, user stories, acceptance criteria, test scenarios, test cases, and a traceability matrix for the Demo Web Shop end-to-end flow covering:

Login → Navigation Menu → Category Selection → Subcategory Navigation → Product Listing → Add to Cart → Shopping Cart → Checkout → Confirm Order → Logout

Application Under Test: https://demowebshop.tricentis.com/

---

## 1. Functional Decomposition

### Business Process Scope
The business flow covers a logged-in customer who logs into the application, uses the top navigation menu to browse categories, views products or subcategories, adds a product to the shopping cart, reviews the cart, proceeds to checkout, confirms the order, and logs out.

### Functional Decomposition Breakdown

1. Authentication and Session Access
   - A registered customer successfully logs in.
   - The user session is established and the account state is visible.

2. Home Page and Top Navigation Visibility
   - The home page displays the top navigation categories.
   - All expected categories are visible and selectable.

3. Category Navigation
   - Selecting a standard category such as Books, Apparel & Shoes, Digital Downloads, Jewellery, or Gift Cards opens the corresponding category page.
   - The page displays relevant products for that category.

4. Subcategory Navigation for Computers and Electronics
   - Selecting Computers or Electronics displays related subcategories such as Desktops, Notebooks, Accessories, Camera & Photo, and Cell Phones.
   - The user can navigate into a selected subcategory.

5. Product Selection and Cart Management
   - The customer can select a product from the listing.
   - The customer can add the product to the shopping cart.
   - The cart reflects the newly added item.

6. Checkout and Order Placement
   - The customer can proceed from the cart to checkout.
   - The order can be confirmed successfully.

7. Logout
   - The customer can end the session securely.

---

## 2. User Stories

### US-DWS-001: User Login to the Application
- User Story ID: US-DWS-001
- Title: Log in to the application with a registered customer account
- Business Value: Allows existing customers to access their account and continue shopping securely.
- Priority: High
- Dependencies: None

As a registered customer, I want to log in to the Demo Web Shop, so that I can access my account and proceed with shopping.

#### Acceptance Criteria
- AC-001.1: Given the customer is on the login page, when they enter a valid email and password, then the application shall authenticate the user successfully.
- AC-001.2: Given the login is successful, when the user is redirected to the home page, then the account state shall show that the user is logged in.
- AC-001.3: Given the customer enters invalid credentials, when they submit the form, then the application shall display an error message and remain on the login page.
- AC-001.4: Given the customer is authenticated, when they navigate to the home page, then the top navigation menu shall be available for browsing.

#### Test Scenarios
- Positive Scenario: SC-001-P1
  - Scenario Description: Verify a valid registered customer can log in successfully.
- Negative Scenario: SC-001-N1
  - Scenario Description: Verify invalid credentials display an authentication error and prevent login.
- Boundary/Validation Scenario: SC-001-B1
  - Scenario Description: Verify empty email or password fields are handled with validation and do not allow login.

---

### US-DWS-002: View and Access Top Navigation Categories
- User Story ID: US-DWS-002
- Title: View and access all top navigation menu categories
- Business Value: Helps customers find products quickly and improves browsing efficiency.
- Priority: High
- Dependencies: US-DWS-001

As a customer, I want to view the top navigation categories on the home page, so that I can quickly move to the category I want.

#### Acceptance Criteria
- AC-002.1: Given the customer is on the home page, when the page loads, then the categories Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, and Gift Cards shall be visible.
- AC-002.2: Given the customer views the menu, when they click a category, then the application shall navigate to the corresponding category page.
- AC-002.3: Given the customer uses keyboard navigation, when they tab through the menu links, then each category link shall be accessible and selectable.
- AC-002.4: Given the menu is displayed, when one category is selected, then the user shall not see duplicate or missing category labels.

#### Test Scenarios
- Positive Scenario: SC-002-P1
  - Scenario Description: Verify all expected top navigation category links are visible and clickable.
- Negative Scenario: SC-002-N1
  - Scenario Description: Verify a broken or missing category link does not create incorrect navigation.
- Boundary/Validation Scenario: SC-002-B1
  - Scenario Description: Verify no duplicate or blank menu entries appear in the navigation bar.

---

### US-DWS-003: Navigate to a Category and View Product Listing
- User Story ID: US-DWS-003
- Title: Open a category page and display relevant products
- Business Value: Ensures customers can browse products relevant to the chosen category without confusion.
- Priority: High
- Dependencies: US-DWS-002

As a customer, I want to select a category from the top navigation and view the products in that category, so that I can browse relevant items.

#### Acceptance Criteria
- AC-003.1: Given the customer selects a category such as Books or Apparel & Shoes, when the category page opens, then the page shall load successfully.
- AC-003.2: Given the category page is displayed, when the page loads, then products belonging to the selected category shall be shown.
- AC-003.3: Given the selected category has products, when the page is rendered, then the category name shall be reflected in the page heading, breadcrumb, or URL.
- AC-003.4: Given a category has no products available, when the page opens, then an empty-state message shall be displayed rather than a blank or broken page.

#### Test Scenarios
- Positive Scenario: SC-003-P1
  - Scenario Description: Verify selecting Books opens a page that displays books-related products.
- Negative Scenario: SC-003-N1
  - Scenario Description: Verify selecting an invalid category does not show unrelated product listings.
- Boundary/Validation Scenario: SC-003-B1
  - Scenario Description: Verify an empty category shows a clear message and a usable navigation option.

---

### US-DWS-004: View and Navigate Subcategories for Computers and Electronics
- User Story ID: US-DWS-004
- Title: Display and access subcategories for Computers and Electronics
- Business Value: Allows customers to drill down into product groups and find products faster.
- Priority: High
- Dependencies: US-DWS-002

As a customer, I want to select Computers or Electronics and see their subcategories, so that I can navigate to the product group I need.

#### Acceptance Criteria
- AC-004.1: Given the customer selects Computers, when the category page opens, then subcategories such as Desktops, Notebooks, and Accessories shall be displayed.
- AC-004.2: Given the customer selects Electronics, when the category page opens, then subcategories such as Camera & Photo and Cell Phones shall be displayed.
- AC-004.3: Given the subcategory list is shown, when the customer selects a subcategory, then the application shall navigate to the relevant product listing.
- AC-004.4: Given the customer reviews the subcategory list, when the page renders, then each expected subcategory shall appear only once and be legible.

#### Test Scenarios
- Positive Scenario: SC-004-P1
  - Scenario Description: Verify Computers displays its expected subcategories and navigation works correctly.
- Negative Scenario: SC-004-N1
  - Scenario Description: Verify an incorrect subcategory selection does not lead to a misleading or empty listing.
- Boundary/Validation Scenario: SC-004-B1
  - Scenario Description: Verify the subcategory list contains all expected options without duplicates or omissions.

---

### US-DWS-005: Select a Product and Add It to the Shopping Cart
- User Story ID: US-DWS-005
- Title: Add a product to the shopping cart from the product listing
- Business Value: Converts browsing into a purchase action and supports the core checkout journey.
- Priority: High
- Dependencies: US-DWS-003, US-DWS-004

As a customer, I want to add a selected product to the shopping cart, so that I can continue to checkout.

#### Acceptance Criteria
- AC-005.1: Given the customer is on a product listing page, when they select a product, then the product details page shall open.
- AC-005.2: Given a product is available, when the customer clicks Add to Cart, then the product shall be added to the shopping cart successfully.
- AC-005.3: Given the product is added, when the confirmation is displayed, then the cart count or cart summary shall increase accordingly.
- AC-005.4: Given the product is in the cart, when the customer opens the cart, then the product shall appear with the correct name, quantity, and price.
- AC-005.5: Given the add-to-cart action fails, when the customer attempts it, then a clear error message shall be shown and no false success state shall be displayed.

#### Test Scenarios
- Positive Scenario: SC-005-P1
  - Scenario Description: Verify selecting a product and clicking Add to Cart adds the item successfully.
- Negative Scenario: SC-005-N1
  - Scenario Description: Verify failed add-to-cart actions show a clear error and do not falsely update the cart.
- Boundary/Validation Scenario: SC-005-B1
  - Scenario Description: Verify the cart reflects the correct quantity when the same product is added more than once intentionally.

---

### US-DWS-006: Review the Shopping Cart and Proceed to Checkout
- User Story ID: US-DWS-006
- Title: Review the shopping cart and begin checkout
- Business Value: Ensures the customer can verify selected products before completing the purchase.
- Priority: High
- Dependencies: US-DWS-005

As a customer, I want to review my shopping cart and proceed to checkout, so that I can complete my purchase.

#### Acceptance Criteria
- AC-006.1: Given the cart contains one or more products, when the customer opens the cart, then the products, quantities, and prices shall be displayed.
- AC-006.2: Given the customer is viewing the cart, when they click Checkout, then the checkout flow shall begin.
- AC-006.3: Given the cart is empty, when the customer attempts to checkout, then the system shall prevent checkout and display a relevant message.
- AC-006.4: Given the customer reviews the cart, when the cart contents are displayed, then the values shall match the added products.

#### Test Scenarios
- Positive Scenario: SC-006-P1
  - Scenario Description: Verify the cart displays the correct product details and checkout begins successfully.
- Negative Scenario: SC-006-N1
  - Scenario Description: Verify checkout is blocked when the cart is empty.
- Boundary/Validation Scenario: SC-006-B1
  - Scenario Description: Verify the cart total and line-item details remain accurate after item quantity changes.

---

### US-DWS-007: Confirm the Order and Log Out
- User Story ID: US-DWS-007
- Title: Confirm the placed order and end the session
- Business Value: Confirms purchase completion and secures the customer session.
- Priority: High
- Dependencies: US-DWS-006

As a customer, I want to confirm my order and then log out, so that I can complete the purchase and end my session securely.

#### Acceptance Criteria
- AC-007.1: Given the customer completes checkout, when the order is submitted, then an order confirmation page shall be displayed.
- AC-007.2: Given the confirmation page is displayed, when the customer reviews it, then the order number and confirmation message shall be visible.
- AC-007.3: Given the customer chooses to log out, when they click Logout, then the session shall end and the user shall return to a logged-out state.
- AC-007.4: Given the user is logged out, when they refresh or navigate, then the login or guest view shall be displayed.

#### Test Scenarios
- Positive Scenario: SC-007-P1
  - Scenario Description: Verify a valid order can be confirmed and the user can log out successfully.
- Negative Scenario: SC-007-N1
  - Scenario Description: Verify order confirmation does not appear when checkout is incomplete or invalid.
- Boundary/Validation Scenario: SC-007-B1
  - Scenario Description: Verify the confirmation page displays the correct order reference and no duplicate confirmations are shown.

---

## 3. Test Cases

### TC-001: Login with valid credentials
- Test Scenario: SC-001-P1
- Test Case Description: Verify that a registered customer can log in successfully.
- Preconditions: The customer account exists and the login page is available.
- Test Steps:
  1. Open the Demo Web Shop home page.
  2. Click Login.
  3. Enter a valid email address.
  4. Enter a valid password.
  5. Click Login.
- Expected Result: The user is logged in and redirected to the home page with an authenticated session.
- Priority: High

### TC-002: Login with invalid credentials
- Test Scenario: SC-001-N1
- Test Case Description: Verify invalid credentials are rejected.
- Preconditions: The login page is available.
- Test Steps:
  1. Open the login page.
  2. Enter an invalid email and password.
  3. Click Login.
- Expected Result: An error message is displayed and the user remains on the login page.
- Priority: High

### TC-003: Verify top navigation categories
- Test Scenario: SC-002-P1
- Test Case Description: Verify all required top navigation categories are visible.
- Preconditions: The user is on the home page.
- Test Steps:
  1. Navigate to the home page.
  2. Observe the top navigation bar.
  3. Check for the listed categories.
- Expected Result: Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, and Gift Cards are all displayed.
- Priority: High

### TC-004: Open a non-computer/non-electronics category
- Test Scenario: SC-003-P1
- Test Case Description: Verify selecting a normal category opens a product listing.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Click Books or another allowed category.
  2. Wait for the page to load.
- Expected Result: The category page opens and relevant products are displayed.
- Priority: High

### TC-005: Verify Computers subcategories
- Test Scenario: SC-004-P1
- Test Case Description: Verify Computers displays its subcategories.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Click Computers.
  2. Observe the displayed subcategories.
- Expected Result: Subcategories such as Desktops, Notebooks, and Accessories are displayed.
- Priority: High

### TC-006: Verify Electronics subcategories
- Test Scenario: SC-004-P1
- Test Case Description: Verify Electronics displays its subcategories.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Click Electronics.
  2. Observe the displayed subcategories.
- Expected Result: Subcategories such as Camera & Photo and Cell Phones are displayed.
- Priority: High

### TC-007: Add a product to the cart
- Test Scenario: SC-005-P1
- Test Case Description: Verify a selected product can be added to the shopping cart.
- Preconditions: The user is on a product listing page.
- Test Steps:
  1. Select a product from the category or subcategory listing.
  2. Click Add to Cart.
- Expected Result: The product is added to the cart and a success confirmation is shown.
- Priority: High

### TC-008: Verify cart contents
- Test Scenario: SC-006-P1
- Test Case Description: Verify the shopping cart contains the correct items.
- Preconditions: A product has been added to the cart.
- Test Steps:
  1. Open the shopping cart.
  2. Review the listed product.
- Expected Result: The selected product appears with the expected name, quantity, and price.
- Priority: High

### TC-009: Checkout the selected product
- Test Scenario: SC-006-P1
- Test Case Description: Verify the customer can proceed to checkout from the cart.
- Preconditions: The cart contains at least one product.
- Test Steps:
  1. Open the shopping cart.
  2. Click Checkout.
- Expected Result: The checkout process begins successfully.
- Priority: High

### TC-010: Confirm order placement
- Test Scenario: SC-007-P1
- Test Case Description: Verify order confirmation is displayed after checkout completion.
- Preconditions: The checkout flow has been completed successfully.
- Test Steps:
  1. Complete the required checkout details.
  2. Submit the order.
- Expected Result: An order confirmation page is displayed with the order number and success message.
- Priority: High

### TC-011: Logout from the application
- Test Scenario: SC-007-P1
- Test Case Description: Verify the customer can log out successfully.
- Preconditions: The customer is logged in.
- Test Steps:
  1. Click Logout.
- Expected Result: The user is logged out and the login or guest state is displayed.
- Priority: High

---

## 4. Traceability Matrix

| Process Step | User Story | Acceptance Criteria | Test Scenario |
|---|---|---|---|
| 1. Login using an existing customer account | US-DWS-001 | AC-001.1, AC-001.2 | SC-001-P1, SC-001-N1 |
| 2. Navigate to the Home Page | US-DWS-002 | AC-002.1, AC-002.2 | SC-002-P1 |
| 3. Identify top navigation categories | US-DWS-002 | AC-002.1, AC-002.4 | SC-002-P1, SC-002-B1 |
| 4. Select a category except Computers or Electronics | US-DWS-003 | AC-003.1, AC-003.2 | SC-003-P1 |
| 5. Verify related products are displayed | US-DWS-003 | AC-003.2, AC-003.3 | SC-003-P1, SC-003-B1 |
| 6. Select Computers or Electronics | US-DWS-004 | AC-004.1, AC-004.2 | SC-004-P1 |
| 7. Verify related subcategories are displayed | US-DWS-004 | AC-004.1, AC-004.2, AC-004.4 | SC-004-P1, SC-004-B1 |
| 8. Navigate to a subcategory | US-DWS-004 | AC-004.3 | SC-004-P1 |
| 9. Verify product listing is displayed | US-DWS-005 | AC-005.1 | SC-005-P1 |
| 10. Select a product | US-DWS-005 | AC-005.1 | SC-005-P1 |
| 11. Add the product to cart | US-DWS-005 | AC-005.2, AC-005.3 | SC-005-P1, SC-005-N1 |
| 12. Verify the product is added to the shopping cart | US-DWS-006 | AC-006.1, AC-006.4 | SC-006-P1, SC-006-B1 |
| 13. Navigate to shopping cart | US-DWS-006 | AC-006.1 | SC-006-P1 |
| 14. Checkout the product | US-DWS-006 | AC-006.2 | SC-006-P1 |
| 15. Confirm order | US-DWS-007 | AC-007.1, AC-007.2 | SC-007-P1 |
| 16. Verify order is successfully placed | US-DWS-007 | AC-007.1, AC-007.2 | SC-007-P1, SC-007-B1 |
| 17. Logout | US-DWS-007 | AC-007.3, AC-007.4 | SC-007-P1 |

---

## 5. Test Scenario Summary

### Positive Scenarios
- Valid login succeeds.
- Top navigation categories are visible and clickable.
- Selecting a standard category displays correct products.
- Selecting Computers or Electronics displays expected subcategories.
- Products can be selected and added to the cart.
- Cart contents are displayed correctly and checkout can begin.
- Orders can be confirmed and the user can log out successfully.

### Negative Scenarios
- Invalid login credentials are rejected.
- Broken or missing category links do not create incorrect navigation.
- Incorrect subcategory selection does not lead to a misleading or empty listing.
- Add-to-cart failure shows an error and does not falsely update the cart.
- Checkout is blocked when the cart is empty.
- Order confirmation does not display when checkout is incomplete.

### Boundary/Validation Scenarios
- Empty email or password fields are rejected.
- The navigation menu contains no duplicate or blank labels.
- Subcategory lists contain the expected options without omissions or duplicates.
- Cart quantity and totals remain accurate when products are added more than once.
- Confirmation pages display a single, correct order reference.
