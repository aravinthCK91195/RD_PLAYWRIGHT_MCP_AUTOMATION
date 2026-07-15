# Demo Web Shop - Agile User Stories for Top Navigation Menu and Purchase Flow

## Document Purpose
This document provides Agile-ready functional decomposition, user stories, acceptance criteria, test scenarios, test cases, and a traceability matrix for the Demo Web Shop customer journey covering:

Login → Home Page → Top Navigation Menu → Category Selection → Subcategory Navigation → Product Listing → Add to Cart → Shopping Cart → Checkout → Confirm Order → Logout

Application Under Test: https://demowebshop.tricentis.com/

---

## 1. Functional Decomposition

### Business Process Scope
The business flow covers a logged-in customer who navigates the top navigation menu, selects categories and subcategories, views products, adds a product to the shopping cart, reviews the cart, completes checkout, confirms the order, and logs out.

### Functional Decomposition Breakdown
1. Authentication and Session Access
   - A registered customer successfully logs in.
   - The user session becomes active and the home page is displayed.

2. Home Page and Top Navigation Visibility
   - The home page displays the top navigation categories.
   - All expected categories are visible and selectable.

3. Category Navigation
   - Selecting a standard category such as Books, Apparel & Shoes, Digital Downloads, Jewellery, or Gift Cards opens the associated category page.
   - The page displays relevant products for the selected category.

4. Subcategory Navigation for Computers and Electronics
   - Selecting Computers or Electronics displays related subcategories such as Desktops, Notebooks, Accessories, Camera & Photo, and Cell Phones.
   - The user can select a subcategory and view the related product listing.

5. Product Selection and Cart Management
   - The customer can select a product from the listing.
   - The customer can add the selected product to the shopping cart.
   - The shopping cart reflects the added item correctly.

6. Checkout and Order Placement
   - The customer can proceed from the cart to checkout.
   - The order can be confirmed successfully.

7. Logout
   - The customer can end the session securely.

---

## 2. User Stories

### US-DWS-101: Login to the Application
- User Story ID: US-DWS-101
- Title: Log in to the application with a registered customer account
- Business Value: Enables returning customers to access the catalog, place orders, and manage their session securely.
- Priority: High
- Dependencies: None

As a registered customer, I want to log in to the Demo Web Shop, so that I can access the application and continue shopping.

#### Acceptance Criteria
- AC-101.1: Given the customer is on the login page, when they enter a valid email and password and click Login, then the application shall authenticate the user successfully.
- AC-101.2: Given the login is successful, when the user is redirected to the home page, then the application shall display the logged-in state.
- AC-101.3: Given the customer enters invalid credentials, when they submit the form, then the application shall display an authentication error and remain on the login page.
- AC-101.4: Given the customer is authenticated, when they access the home page, then the top navigation menu shall be available for browsing.

#### Test Scenarios
- Positive Scenario: SC-101-P1
  - Scenario Description: Verify a valid registered customer can log in successfully.
- Negative Scenario: SC-101-N1
  - Scenario Description: Verify invalid credentials display an authentication error and prevent login.
- Boundary/Validation Scenario: SC-101-B1
  - Scenario Description: Verify empty email or password fields are handled with validation and do not allow login.

---

### US-DWS-102: View and Access Top Navigation Categories
- User Story ID: US-DWS-102
- Title: View and access the main top navigation categories
- Business Value: Helps customers find products quickly and improves discoverability across the catalog.
- Priority: High
- Dependencies: US-DWS-101

As a customer, I want to view the top navigation categories on the home page, so that I can locate the products I want quickly.

#### Acceptance Criteria
- AC-102.1: Given the customer is on the home page, when the page loads, then the categories Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, and Gift Cards shall be visible.
- AC-102.2: Given the top navigation menu is visible, when the customer clicks a category, then the application shall navigate to the corresponding category page.
- AC-102.3: Given the customer uses keyboard navigation, when they tab to a category link, then the link shall receive focus and be selectable.
- AC-102.4: Given the menu is displayed, when the categories are rendered, then each label shall be clear and no duplicate or blank entries shall appear.

#### Test Scenarios
- Positive Scenario: SC-102-P1
  - Scenario Description: Verify all expected top navigation categories are visible and clickable from the home page.
- Negative Scenario: SC-102-N1
  - Scenario Description: Verify a broken or missing category link does not create a false navigation path.
- Boundary/Validation Scenario: SC-102-B1
  - Scenario Description: Verify category labels are readable and no duplicate or blank menu entries appear.

---

### US-DWS-103: Navigate to a Standard Category and View Products
- User Story ID: US-DWS-103
- Title: Open a standard category page and view relevant products
- Business Value: Enables customers to browse products in the selected category without confusion or irrelevant results.
- Priority: High
- Dependencies: US-DWS-102

As a customer, I want to select a standard category from the top navigation and view the related products, so that I can browse relevant items.

#### Acceptance Criteria
- AC-103.1: Given the customer selects a standard category such as Books or Apparel & Shoes, when the category page opens, then the page shall load successfully.
- AC-103.2: Given the category page is displayed, when the page loads, then products belonging to the selected category shall be shown.
- AC-103.3: Given the customer is viewing a category page, when the page renders, then the selected category name shall be reflected in the page heading, breadcrumb, or URL.
- AC-103.4: Given the selected category has no products available, when the page opens, then an informative empty-state message shall be shown instead of a blank page.

#### Test Scenarios
- Positive Scenario: SC-103-P1
  - Scenario Description: Verify selecting Books opens a page that displays products belonging to the Books category.
- Negative Scenario: SC-103-N1
  - Scenario Description: Verify selecting an invalid or unavailable category does not display unrelated products or a misleading page state.
- Boundary/Validation Scenario: SC-103-B1
  - Scenario Description: Verify an empty category shows a clear message and does not remain blank or broken.

---

### US-DWS-104: View and Navigate Subcategories for Computers and Electronics
- User Story ID: US-DWS-104
- Title: Display and access subcategories for Computers and Electronics
- Business Value: Allows customers to drill down into product groups and find the right products faster.
- Priority: High
- Dependencies: US-DWS-102

As a customer, I want to select Computers or Electronics from the top navigation and view their related subcategories, so that I can navigate to the most relevant product group.

#### Acceptance Criteria
- AC-104.1: Given the customer selects Computers, when the category page opens, then subcategories such as Desktops, Notebooks, and Accessories shall be displayed.
- AC-104.2: Given the customer selects Electronics, when the category page opens, then subcategories such as Camera & Photo and Cell Phones shall be displayed.
- AC-104.3: Given the subcategory list is shown, when the customer selects one, then the application shall navigate to the corresponding subcategory product listing.
- AC-104.4: Given the subcategory list is rendered, when the customer reviews it, then no duplicate or missing entries shall appear.

#### Test Scenarios
- Positive Scenario: SC-104-P1
  - Scenario Description: Verify selecting Computers displays the expected subcategories and that choosing one opens the relevant listing.
- Negative Scenario: SC-104-N1
  - Scenario Description: Verify an unavailable or incorrect subcategory selection does not lead to an empty or unrelated product page.
- Boundary/Validation Scenario: SC-104-B1
  - Scenario Description: Verify all expected subcategories appear exactly once and match the selected parent category.

---

### US-DWS-105: Select a Product and Add It to the Shopping Cart
- User Story ID: US-DWS-105
- Title: Add a selected product to the shopping cart from a product listing
- Business Value: Converts browsing into purchase action and supports the checkout journey.
- Priority: High
- Dependencies: US-DWS-103, US-DWS-104

As a customer, I want to select a product from a category or subcategory listing and add it to my cart, so that I can proceed to checkout.

#### Acceptance Criteria
- AC-105.1: Given the customer is on a product listing page, when they select a product, then the product details page shall open.
- AC-105.2: Given a product is available, when the customer clicks Add to Cart, then the product shall be added to the shopping cart successfully.
- AC-105.3: Given the add-to-cart action succeeds, when the confirmation is displayed, then the cart count or cart summary shall increase accordingly.
- AC-105.4: Given the product is added to the cart, when the customer opens the shopping cart, then the selected product shall appear with the correct name, quantity, and price.
- AC-105.5: Given the product cannot be added due to unavailability or an error, when the customer attempts to add it, then the system shall display a clear error message and shall not falsely indicate success.

#### Test Scenarios
- Positive Scenario: SC-105-P1
  - Scenario Description: Verify selecting a visible product and clicking Add to Cart adds the item successfully.
- Negative Scenario: SC-105-N1
  - Scenario Description: Verify a failed add-to-cart action shows an error and does not add a false cart entry.
- Boundary/Validation Scenario: SC-105-B1
  - Scenario Description: Verify the cart reflects the correct quantity when the same product is added more than once intentionally.

---

### US-DWS-106: Review Cart, Checkout, Confirm Order, and Logout
- User Story ID: US-DWS-106
- Title: Review the shopping cart, complete checkout, confirm the order, and end the session
- Business Value: Confirms purchase completion and secures the customer session.
- Priority: High
- Dependencies: US-DWS-105

As a customer, I want to review my cart, complete checkout, confirm my order, and log out, so that I can finish my purchase and end my session securely.

#### Acceptance Criteria
- AC-106.1: Given the cart contains one or more products, when the customer opens the cart, then the products, quantities, and prices shall be displayed.
- AC-106.2: Given the customer is viewing the cart, when they click Checkout, then the checkout flow shall begin.
- AC-106.3: Given checkout is completed successfully, when the order is submitted, then an order confirmation page shall be displayed with a confirmation message.
- AC-106.4: Given the customer chooses to log out, when they click Logout, then the session shall end and the user shall return to a logged-out state.
- AC-106.5: Given the cart is empty, when the customer attempts to checkout, then the system shall prevent checkout and display an appropriate message.

#### Test Scenarios
- Positive Scenario: SC-106-P1
  - Scenario Description: Verify a valid cart can be reviewed, checked out, and confirmed successfully.
- Negative Scenario: SC-106-N1
  - Scenario Description: Verify checkout is blocked when the cart is empty.
- Boundary/Validation Scenario: SC-106-B1
  - Scenario Description: Verify the confirmation page displays the correct order reference and no duplicate confirmations are shown.

---

## 3. Test Scenarios Summary

### Positive Scenarios
- Verify the home page displays all required top navigation categories.
- Verify selecting a standard category opens a valid product listing.
- Verify selecting Computers or Electronics shows the expected subcategories.
- Verify selecting a product opens its details page and supports Add to Cart.
- Verify a valid order can be confirmed and the user can log out successfully.

### Negative Scenarios
- Verify broken or missing navigation links do not create incorrect navigation.
- Verify invalid category or subcategory selection does not show unrelated or empty product data.
- Verify add-to-cart failure shows an error and does not falsely update the cart.
- Verify checkout is blocked when the cart is empty.

### Boundary/Validation Scenarios
- Verify no duplicate or empty category labels are displayed.
- Verify subcategories appear exactly once for the selected parent category.
- Verify cart quantity and product detail accuracy when adding products repeatedly.
- Verify order confirmation displays a single, correct order reference.

---

## 4. Test Cases

### TC-101: Login with valid credentials
- Test Scenario: SC-101-P1
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

### TC-102: Login with invalid credentials
- Test Scenario: SC-101-N1
- Test Case Description: Verify invalid credentials are rejected.
- Preconditions: The login page is available.
- Test Steps:
  1. Open the login page.
  2. Enter an invalid email and password.
  3. Click Login.
- Expected Result: An authentication error is displayed and the user remains on the login page.
- Priority: High

### TC-103: Verify top navigation categories are visible
- Test Scenario: SC-102-P1
- Test Case Description: Verify all expected top navigation categories appear on the home page.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Navigate to the home page.
  2. Observe the top navigation menu.
  3. Confirm the categories are visible.
- Expected Result: Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, and Gift Cards are displayed.
- Priority: High

### TC-104: Open a standard category and view products
- Test Scenario: SC-103-P1
- Test Case Description: Verify selecting a standard category displays relevant products.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Click Books from the top navigation menu.
  2. Wait for the category page to load.
  3. Observe the product listing.
- Expected Result: The category page opens successfully and products for the selected category are displayed.
- Priority: High

### TC-105: Open Computers and view subcategories
- Test Scenario: SC-104-P1
- Test Case Description: Verify Computers displays related subcategories.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Click Computers from the top navigation menu.
  2. Observe the page content.
- Expected Result: Subcategories such as Desktops, Notebooks, and Accessories are shown.
- Priority: High

### TC-106: Open Electronics and view subcategories
- Test Scenario: SC-104-P1
- Test Case Description: Verify Electronics displays related subcategories.
- Preconditions: The user is logged in and on the home page.
- Test Steps:
  1. Click Electronics from the top navigation menu.
  2. Observe the page content.
- Expected Result: Subcategories such as Camera & Photo and Cell Phones are shown.
- Priority: High

### TC-107: Select a product and add it to the cart
- Test Scenario: SC-105-P1
- Test Case Description: Verify a selected product can be added to the shopping cart.
- Preconditions: The user is on a product listing page.
- Test Steps:
  1. Select a product from the listing.
  2. Click Add to Cart.
  3. Observe the confirmation or cart update.
- Expected Result: The product is added successfully and the cart is updated.
- Priority: High

### TC-108: Verify the cart contains the added product
- Test Scenario: SC-105-P1
- Test Case Description: Verify the added item appears in the shopping cart with correct details.
- Preconditions: A product has been added to the cart.
- Test Steps:
  1. Open the shopping cart.
  2. Review the listed products.
- Expected Result: The selected product appears with the expected name, quantity, and price.
- Priority: High

### TC-109: Checkout with a populated cart
- Test Scenario: SC-106-P1
- Test Case Description: Verify a user can proceed through checkout from a populated cart.
- Preconditions: The shopping cart contains at least one product.
- Test Steps:
  1. Open the shopping cart.
  2. Click Checkout.
  3. Complete the required checkout steps.
  4. Submit the order.
- Expected Result: The order is placed successfully and a confirmation page is shown.
- Priority: High

### TC-110: Attempt checkout with an empty cart
- Test Scenario: SC-106-N1
- Test Case Description: Verify checkout is blocked when the cart is empty.
- Preconditions: The shopping cart is empty.
- Test Steps:
  1. Open the shopping cart.
  2. Click Checkout.
- Expected Result: The system prevents checkout and displays an appropriate message.
- Priority: Medium

### TC-111: Logout from the application
- Test Scenario: SC-106-P1
- Test Case Description: Verify the user can log out successfully after purchase completion.
- Preconditions: The user is logged in.
- Test Steps:
  1. Click Logout.
  2. Observe the application state.
- Expected Result: The user is logged out and the application displays the logged-out view.
- Priority: High

---

## 5. Traceability Matrix

| Process Step | User Story | Acceptance Criteria | Test Scenario |
|---|---|---|---|
| 1. Login using an existing customer account | US-DWS-101 | AC-101.1, AC-101.2 | SC-101-P1, SC-101-N1 |
| 2. Navigate to the Home Page | US-DWS-101, US-DWS-102 | AC-101.4, AC-102.1 | SC-101-P1, SC-102-P1 |
| 3. Identify all available top navigation categories | US-DWS-102 | AC-102.1, AC-102.4 | SC-102-P1, SC-102-B1 |
| 4. Select a category except Computers or Electronics | US-DWS-103 | AC-103.1, AC-103.2 | SC-103-P1, SC-103-N1 |
| 5. Verify products belonging to the selected category are displayed | US-DWS-103 | AC-103.2, AC-103.3 | SC-103-P1, SC-103-B1 |
| 6. Select Computers or Electronics | US-DWS-104 | AC-104.1, AC-104.2 | SC-104-P1, SC-104-N1 |
| 7. Verify related subcategories are displayed | US-DWS-104 | AC-104.1, AC-104.2, AC-104.4 | SC-104-P1, SC-104-B1 |
| 8. Navigate to a subcategory | US-DWS-104 | AC-104.3 | SC-104-P1 |
| 9. Verify product listing is displayed | US-DWS-103, US-DWS-104 | AC-103.2, AC-104.3 | SC-103-P1, SC-104-P1 |
| 10. Select a product | US-DWS-105 | AC-105.1 | SC-105-P1 |
| 11. Add the product to cart | US-DWS-105 | AC-105.2, AC-105.3 | SC-105-P1, SC-105-N1 |
| 12. Verify the product is added to the shopping cart | US-DWS-105 | AC-105.3, AC-105.4 | SC-105-P1, SC-105-B1 |
| 13. Navigate to shopping cart and checkout | US-DWS-106 | AC-106.1, AC-106.2 | SC-106-P1, SC-106-N1 |
| 14. Confirm order and logout | US-DWS-106 | AC-106.3, AC-106.4 | SC-106-P1 |

---

## 6. Automation Readiness Notes
- Recommended automation scope: login, navigation visibility, category selection, subcategory display, product listing render, add-to-cart confirmation, checkout initiation, and logout state validation.
- Prefer stable locators such as link text, role-based selectors, and product card identifiers.
- Ensure cart cleanup steps are included in automation to keep test execution independent and repeatable.
