# Demo Web Shop - Agile User Stories for Top Navigation Menu and Purchase Flow

## Document Purpose
This document provides Agile-ready functional decomposition, user stories, acceptance criteria, test scenarios, test cases, and a traceability matrix for the Demo Web Shop customer journey covering:

Login → Home Page → Top Navigation Menu → Category Selection → Subcategory Navigation → Product Listing → Add to Cart → Shopping Cart → Checkout → Confirm Order → Logout

Application Under Test: https://demowebshop.tricentis.com/

---

## 1. Functional Decomposition

### Business Process Scope
The business flow covers a logged-in customer who browses the top navigation menu, selects categories and subcategories, views products, adds an item to the shopping cart, checks out, confirms the order, and logs out.

### Functional Decomposition Breakdown
1. Authentication and Session Access
   - A registered customer logs in successfully.
   - The session becomes active and the home page is available for browsing.

2. Home Page and Navigation Visibility
   - The home page displays the top navigation categories.
   - All expected categories are visible and selectable.

3. Standard Category Navigation
   - Selecting a standard category such as Books, Apparel & Shoes, Digital Downloads, Jewellery, or Gift Cards opens the relevant category page.
   - The page displays products belonging to the selected category.

4. Subcategory Navigation for Computers and Electronics
   - Selecting Computers or Electronics displays related subcategories such as Desktops, Notebooks, Accessories, Camera & Photo, and Cell Phones.
   - The customer can navigate to a subcategory and view the related product listing.

5. Product Selection and Cart Management
   - The customer can select a product from the listing.
   - The customer can add the product to the shopping cart.
   - The shopping cart reflects the added item.

6. Checkout and Order Placement
   - The customer can review the cart and proceed to checkout.
   - The order can be confirmed successfully.

7. Logout
   - The customer can end the session securely.

---

## 2. User Stories

### US-DWS-201: Login to the Application
- User Story ID: US-DWS-201
- Title: Log in to the application with a registered customer account
- Business Value: Enables returning customers to access the catalog and complete purchases.
- Priority: High
- Dependencies: None

As a registered customer, I want to log in to the Demo Web Shop, so that I can access the application and begin shopping.

#### Acceptance Criteria
- AC-201.1: Given the customer is on the login page, when they enter a valid email and password and click Login, then the application shall authenticate the user successfully.
- AC-201.2: Given the login is successful, when the home page is displayed, then the application shall show the customer as logged in.
- AC-201.3: Given the customer enters invalid credentials, when they submit the login form, then the application shall display an authentication error and remain on the login page.
- AC-201.4: Given the customer is authenticated, when they navigate to the home page, then the top navigation menu shall be available.

#### Test Scenarios
- Positive Scenario: SC-201-P1
  - Scenario Description: Verify a valid registered customer can log in successfully.
- Negative Scenario: SC-201-N1
  - Scenario Description: Verify invalid credentials display an authentication error and prevent login.
- Boundary/Validation Scenario: SC-201-B1
  - Scenario Description: Verify empty email or password values are rejected with validation.

---

### US-DWS-202: View and Access Top Navigation Categories
- User Story ID: US-DWS-202
- Title: View and access the main top navigation categories
- Business Value: Helps customers locate products quickly and improves browsing efficiency.
- Priority: High
- Dependencies: US-DWS-201

As a customer, I want to view the top navigation categories on the home page, so that I can reach the products I want quickly.

#### Acceptance Criteria
- AC-202.1: Given the customer is on the home page, when the page loads, then the categories Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, and Gift Cards shall be visible.
- AC-202.2: Given the top navigation menu is visible, when the customer clicks a category, then the application shall navigate to the corresponding category page.
- AC-202.3: Given the customer uses keyboard navigation, when they focus a category link, then the link shall be reachable and selectable.
- AC-202.4: Given the menu is displayed, when the categories are rendered, then no duplicate or blank category labels shall appear.

#### Test Scenarios
- Positive Scenario: SC-202-P1
  - Scenario Description: Verify all expected top navigation categories are visible and clickable.
- Negative Scenario: SC-202-N1
  - Scenario Description: Verify a missing or broken category link does not create incorrect navigation.
- Boundary/Validation Scenario: SC-202-B1
  - Scenario Description: Verify the menu does not contain duplicate or empty category entries.

---

### US-DWS-203: Navigate to a Standard Category and View Products
- User Story ID: US-DWS-203
- Title: Open a standard category page and view relevant products
- Business Value: Ensures customers can browse products in the selected category without confusion.
- Priority: High
- Dependencies: US-DWS-202

As a customer, I want to select a standard category from the top navigation and view its products, so that I can browse relevant items.

#### Acceptance Criteria
- AC-203.1: Given the customer selects a standard category such as Books or Apparel & Shoes, when the category page opens, then the page shall load successfully.
- AC-203.2: Given the category page is displayed, when the page loads, then products belonging to the selected category shall be shown.
- AC-203.3: Given the selected category has products, when the page is rendered, then the category name shall be reflected in the page heading, breadcrumb, or URL.
- AC-203.4: Given the selected category has no available products, when the page opens, then an informative empty-state message shall be shown.

#### Test Scenarios
- Positive Scenario: SC-203-P1
  - Scenario Description: Verify selecting Books opens a page that displays books-related products.
- Negative Scenario: SC-203-N1
  - Scenario Description: Verify an invalid or unavailable category does not display unrelated products.
- Boundary/Validation Scenario: SC-203-B1
  - Scenario Description: Verify an empty category shows a clear message rather than a blank page.

---

### US-DWS-204: View and Navigate Subcategories for Computers and Electronics
- User Story ID: US-DWS-204
- Title: Display and access subcategories for Computers and Electronics
- Business Value: Allows customers to drill down into product groups and find the right products faster.
- Priority: High
- Dependencies: US-DWS-202

As a customer, I want to select Computers or Electronics from the top navigation and view their subcategories, so that I can navigate to the right product group.

#### Acceptance Criteria
- AC-204.1: Given the customer selects Computers, when the category page opens, then subcategories such as Desktops, Notebooks, and Accessories shall be displayed.
- AC-204.2: Given the customer selects Electronics, when the category page opens, then subcategories such as Camera & Photo and Cell Phones shall be displayed.
- AC-204.3: Given the subcategory list is shown, when the customer selects a subcategory, then the application shall navigate to the corresponding product listing.
- AC-204.4: Given the subcategory list is rendered, when the customer reviews it, then each expected subcategory shall appear once and be readable.

#### Test Scenarios
- Positive Scenario: SC-204-P1
  - Scenario Description: Verify selecting Computers displays the expected subcategories and opens the relevant listing.
- Negative Scenario: SC-204-N1
  - Scenario Description: Verify an incorrect subcategory selection does not lead to an empty or unrelated listing.
- Boundary/Validation Scenario: SC-204-B1
  - Scenario Description: Verify the subcategory list includes all expected items without duplication.

---

### US-DWS-205: Select a Product and Add It to the Shopping Cart
- User Story ID: US-DWS-205
- Title: Add a selected product to the shopping cart from a product listing
- Business Value: Converts browsing into a purchase action and supports checkout.
- Priority: High
- Dependencies: US-DWS-203, US-DWS-204

As a customer, I want to select a product from a category or subcategory listing and add it to my cart, so that I can proceed to checkout.

#### Acceptance Criteria
- AC-205.1: Given the customer is on a product listing page, when they select a product, then the product details page shall open.
- AC-205.2: Given a product is available, when the customer clicks Add to Cart, then the product shall be added to the shopping cart successfully.
- AC-205.3: Given the add-to-cart action succeeds, when the confirmation appears, then the cart count or cart summary shall increase accordingly.
- AC-205.4: Given the product is added to the cart, when the customer opens the cart, then the selected product shall appear with the correct name, quantity, and price.
- AC-205.5: Given the add-to-cart action fails, when the customer attempts it, then the system shall display a clear error message and shall not falsely indicate success.

#### Test Scenarios
- Positive Scenario: SC-205-P1
  - Scenario Description: Verify selecting a visible product and clicking Add to Cart adds the item successfully.
- Negative Scenario: SC-205-N1
  - Scenario Description: Verify a failed add-to-cart action shows an error and does not add a false cart entry.
- Boundary/Validation Scenario: SC-205-B1
  - Scenario Description: Verify the cart reflects the correct quantity when the same product is added repeatedly.

---

### US-DWS-206: Review Cart, Checkout, and Confirm Order
- User Story ID: US-DWS-206
- Title: Review the shopping cart, complete checkout, and confirm the order
- Business Value: Ensures customers can complete their purchase confidently.
- Priority: High
- Dependencies: US-DWS-205

As a customer, I want to review my cart, proceed to checkout, and confirm my order, so that I can complete my purchase.

#### Acceptance Criteria
- AC-206.1: Given the cart contains one or more products, when the customer opens the cart, then the products, quantities, and prices shall be displayed.
- AC-206.2: Given the customer is viewing the cart, when they click Checkout, then the checkout flow shall begin.
- AC-206.3: Given checkout is completed successfully, when the order is submitted, then an order confirmation page shall be displayed.
- AC-206.4: Given the cart is empty, when the customer attempts to checkout, then the system shall prevent checkout and display a relevant message.

#### Test Scenarios
- Positive Scenario: SC-206-P1
  - Scenario Description: Verify a valid cart can be reviewed, checked out, and confirmed successfully.
- Negative Scenario: SC-206-N1
  - Scenario Description: Verify checkout is blocked when the cart is empty.
- Boundary/Validation Scenario: SC-206-B1
  - Scenario Description: Verify the confirmation page displays a single correct order reference.

---

### US-DWS-207: Logout from the Application
- User Story ID: US-DWS-207
- Title: End the customer session securely
- Business Value: Protects customer account privacy and closes the active session correctly.
- Priority: Medium
- Dependencies: US-DWS-206

As a logged-in customer, I want to log out of the application, so that my session ends securely.

#### Acceptance Criteria
- AC-207.1: Given the customer is logged in, when they choose Logout, then the session shall end.
- AC-207.2: Given the user logs out, when the application redirects or refreshes, then the customer shall be returned to a logged-out state.
- AC-207.3: Given the customer has completed the purchase, when they log out, then no unauthorized access to the session shall remain.

#### Test Scenarios
- Positive Scenario: SC-207-P1
  - Scenario Description: Verify a logged-in customer can log out successfully.
- Negative Scenario: SC-207-N1
  - Scenario Description: Verify the application does not leave the user in a misleading logged-in state after logout.

---

## 3. Test Scenarios Summary

### Positive Scenarios
- Verify the home page displays all required top navigation categories.
- Verify selecting a standard category opens a page with relevant products.
- Verify selecting Computers or Electronics shows the expected subcategories.
- Verify selecting a product opens a details page and supports Add to Cart.
- Verify a valid order can be confirmed and the user can log out successfully.

### Negative Scenarios
- Verify broken or missing category links do not create incorrect navigation.
- Verify invalid or unavailable category or subcategory selection does not display unrelated content.
- Verify add-to-cart failure shows an error and does not falsely update the cart.
- Verify checkout is blocked when the cart is empty.

### Boundary/Validation Scenarios
- Verify no duplicate or empty category labels appear in the menu.
- Verify subcategories appear once and match the selected parent category.
- Verify cart quantity and order confirmation are accurate for repeated product additions.
- Verify empty categories display an informative message instead of a blank page.

---

## 4. Test Cases

### TC-201: Login with valid credentials
- Test Scenario: SC-201-P1
- Test Case Description: Verify that a registered customer can log in successfully.
- Preconditions: A valid customer account exists and the login page is available.
- Test Steps:
  1. Open the Demo Web Shop home page.
  2. Click Login.
  3. Enter a valid email address.
  4. Enter a valid password.
  5. Click Login.
- Expected Result: The user is logged in and redirected to the home page with an authenticated session.
- Priority: High

### TC-202: Login with invalid credentials
- Test Scenario: SC-201-N1
- Test Case Description: Verify invalid credentials are rejected.
- Preconditions: The login page is available.
- Test Steps:
  1. Open the login page.
  2. Enter an invalid email and password.
  3. Click Login.
- Expected Result: An authentication error is displayed and the user remains on the login page.
- Priority: High

### TC-203: Verify top navigation categories are visible
- Test Scenario: SC-202-P1
- Test Case Description: Verify all expected top navigation categories appear on the home page.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Navigate to the home page.
  2. Observe the top navigation menu.
  3. Confirm the categories are visible.
- Expected Result: Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, and Gift Cards are displayed.
- Priority: High

### TC-204: Verify a standard category opens with products
- Test Scenario: SC-203-P1
- Test Case Description: Verify selecting a non-computer/non-electronics category opens a valid product page.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Click a standard category such as Books.
  2. Wait for the category page to load.
  3. Observe the displayed content.
- Expected Result: The category page opens successfully and products belonging to the selected category are displayed.
- Priority: High

### TC-205: Verify Computers displays subcategories
- Test Scenario: SC-204-P1
- Test Case Description: Verify selecting Computers displays the expected subcategories.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Click Computers.
  2. Observe the displayed subcategories.
- Expected Result: Subcategories such as Desktops, Notebooks, and Accessories are visible.
- Priority: High

### TC-206: Verify Electronics displays subcategories
- Test Scenario: SC-204-P1
- Test Case Description: Verify selecting Electronics displays the expected subcategories.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Click Electronics.
  2. Observe the displayed subcategories.
- Expected Result: Subcategories such as Camera & Photo and Cell Phones are visible.
- Priority: High

### TC-207: Verify product can be added to cart
- Test Scenario: SC-205-P1
- Test Case Description: Verify a selected product can be added to the shopping cart.
- Preconditions: The user is logged in and viewing a product listing.
- Test Steps:
  1. Select a product from the listing.
  2. Click Add to Cart.
  3. Review the confirmation/cart summary.
- Expected Result: The product is added to the shopping cart successfully.
- Priority: High

### TC-208: Verify cart checkout and order confirmation
- Test Scenario: SC-206-P1
- Test Case Description: Verify a valid cart can be reviewed, checked out, and confirmed successfully.
- Preconditions: A product has been added to the cart.
- Test Steps:
  1. Open the shopping cart.
  2. Click Checkout.
  3. Complete the checkout steps.
  4. Confirm the order.
- Expected Result: The order is placed successfully and an confirmation page is displayed.
- Priority: High

### TC-209: Verify logout ends the session
- Test Scenario: SC-207-P1
- Test Case Description: Verify a logged-in customer can log out successfully.
- Preconditions: The customer is logged in and on the home page.
- Test Steps:
  1. Click Logout.
  2. Observe the resulting page state.
- Expected Result: The user is logged out and the application shows a logged-out state.
- Priority: Medium

---

## 5. Traceability Matrix

| Process Step | User Story | Acceptance Criteria | Test Scenario | Test Case |
|---|---|---|---|---|
| Login to application | US-DWS-201 | AC-201.1 to AC-201.4 | SC-201-P1, SC-201-N1, SC-201-B1 | TC-201, TC-202 |
| View top navigation categories | US-DWS-202 | AC-202.1 to AC-202.4 | SC-202-P1, SC-202-N1, SC-202-B1 | TC-203 |
| Select standard category and view products | US-DWS-203 | AC-203.1 to AC-203.4 | SC-203-P1, SC-203-N1, SC-203-B1 | TC-204 |
| Select Computers/Electronics and view subcategories | US-DWS-204 | AC-204.1 to AC-204.4 | SC-204-P1, SC-204-N1, SC-204-B1 | TC-205, TC-206 |
| Select product and add to cart | US-DWS-205 | AC-205.1 to AC-205.5 | SC-205-P1, SC-205-N1, SC-205-B1 | TC-207 |
| Review cart, checkout, and confirm order | US-DWS-206 | AC-206.1 to AC-206.4 | SC-206-P1, SC-206-N1, SC-206-B1 | TC-208 |
| Logout from application | US-DWS-207 | AC-207.1 to AC-207.3 | SC-207-P1, SC-207-N1 | TC-209 |

---

## 6. Notes for Product Owners, Business Analysts, Manual Testers, and Automation Engineers
- The user stories are written in a format suitable for backlog refinement and sprint planning.
- Acceptance criteria are structured to support both manual and automated validation.
- Test scenarios and test cases are aligned to the business flow and can be implemented in Playwright, Selenium, or other test automation frameworks.
- Negative and boundary scenarios are included to strengthen regression coverage and improve overall quality.
