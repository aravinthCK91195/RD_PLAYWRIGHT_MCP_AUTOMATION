# Demo Web Shop - Agile User Stories for Top Navigation Menu

## Document Purpose
This document provides Agile-ready functional decomposition, user stories, acceptance criteria, test scenarios, and a traceability matrix for the Demo Web Shop Top Navigation Menu flow:

Top Navigation Menu → Category Selection → Subcategory Navigation → Product Listing → Add to Cart

Application Under Test: https://demowebshop.tricentis.com/

---

## 1. Functional Decomposition

### Business Process Scope
The business flow covers a logged-in customer who browses the Top Navigation Menu, selects a category, navigates to a subcategory when applicable, views product listings, selects a product, and adds it to the shopping cart.

### Functional Decomposition Breakdown

1. Authentication and Session Access
   - A registered customer logs in successfully.
   - The user is redirected to the home page or account landing page.

2. Top Navigation Menu Visibility
   - The home page displays the top navigation categories.
   - All expected categories are visible and selectable.

3. Category Selection
   - Selecting a category such as Books, Apparel & Shoes, Digital Downloads, Jewellery, or Gift Cards opens a category page.
   - The category page displays appropriate products.

4. Subcategory Navigation
   - Selecting Computers or Electronics displays related subcategories such as Desktops, Notebooks, Accessories, Camera & Photo, and Cell Phones.
   - The user can select a subcategory and view its product listing.

5. Product Selection and Add to Cart
   - The user can select a product from the listing.
   - The user can add the selected product to the shopping cart.
   - A success confirmation is displayed and the product appears in the cart.

---

## 2. User Stories

### US-TNM-001: View and Access Top Navigation Categories
- User Story ID: US-TNM-001
- Title: View and access main top navigation categories
- Business Value: Helps customers quickly discover and navigate to categories relevant to their purchase intent.
- Priority: High
- Dependencies: None

As a registered customer, I want to see the top navigation categories on the home page and access them easily, so that I can navigate to products quickly.

#### Acceptance Criteria
- AC-001.1: Given the customer is on the home page, when the page loads, then the top navigation menu shall display the categories Books, Computers, Electronics, Apparel & Shoes, Digital Downloads, Jewellery, and Gift Cards.
- AC-001.2: Given the top navigation is visible, when the customer clicks a category, then the application shall navigate to the corresponding category page.
- AC-001.3: Given the customer is using keyboard navigation, when the customer tabs to the category links, then each category link shall receive focus and be selectable.
- AC-001.4: Given the customer views the menu, when the category labels are displayed, then each label shall be visually clear and free from duplication or truncation.

#### Test Scenarios
- Positive Scenario: SC-001-P1
  - Scenario Description: Verify all expected category links are visible and clickable from the home page.
- Negative Scenario: SC-001-N1
  - Scenario Description: Verify that a missing or broken category link displays an error or does not create a false navigation path.
- Boundary/Validation Scenario: SC-001-B1
  - Scenario Description: Verify that category labels appear in a readable format and that no duplicate or blank menu entries are displayed.

---

### US-TNM-002: Navigate to a Category and View Relevant Products
- User Story ID: US-TNM-002
- Title: Open a category page and view relevant products
- Business Value: Enables customers to browse products within a chosen category without confusion or irrelevant results.
- Priority: High
- Dependencies: US-TNM-001

As a customer, I want to select a category from the top navigation and view the related products, so that I can browse items relevant to my interest.

#### Acceptance Criteria
- AC-002.1: Given the customer selects a category such as Books or Apparel & Shoes, when the category is opened, then the category page shall load successfully.
- AC-002.2: Given the category page is displayed, when the page loads, then products belonging to the selected category shall be displayed.
- AC-002.3: Given the customer is viewing a category page, when the page renders, then the selected category name shall be reflected in the page header, breadcrumb, or URL.
- AC-002.4: Given the selected category has no available products, when the page opens, then an informative empty-state message shall be shown instead of a broken or blank page.

#### Test Scenarios
- Positive Scenario: SC-002-P1
  - Scenario Description: Verify that selecting Books opens a page that displays products belonging to the Books category.
- Negative Scenario: SC-002-N1
  - Scenario Description: Verify that selecting an invalid or unavailable category does not display unrelated products or a misleading page state.
- Boundary/Validation Scenario: SC-002-B1
  - Scenario Description: Verify that an empty category shows a clear message and does not remain blank or broken.

---

### US-TNM-003: View Subcategories for Computers and Electronics
- User Story ID: US-TNM-003
- Title: Display subcategories for Computers and Electronics
- Business Value: Allows customers to drill down into product groups and find items faster.
- Priority: High
- Dependencies: US-TNM-001

As a customer, I want to select Computers or Electronics from the top navigation and see the related subcategories, so that I can navigate to the most relevant product group.

#### Acceptance Criteria
- AC-003.1: Given the customer selects Computers, when the category page opens, then the relevant subcategories such as Desktops, Notebooks, and Accessories shall be displayed.
- AC-003.2: Given the customer selects Electronics, when the category page opens, then the relevant subcategories such as Camera & Photo and Cell Phones shall be displayed.
- AC-003.3: Given the subcategory options are displayed, when the customer selects one, then the application shall navigate to the corresponding subcategory product listing.
- AC-003.4: Given the customer views the subcategory list, when the list is rendered, then no duplicate or missing subcategory entries shall appear.

#### Test Scenarios
- Positive Scenario: SC-003-P1
  - Scenario Description: Verify that selecting Computers displays the expected subcategories and that selecting one opens the relevant listing.
- Negative Scenario: SC-003-N1
  - Scenario Description: Verify that an unavailable or incorrect subcategory selection does not lead to an empty or unrelated product page.
- Boundary/Validation Scenario: SC-003-B1
  - Scenario Description: Verify that all expected subcategory options appear exactly once and that the labels match the selected parent category.

---

### US-TNM-004: Select a Product and Add It to the Shopping Cart
- User Story ID: US-TNM-004
- Title: Add a selected product to the shopping cart from a product listing
- Business Value: Converts browsing into purchase action and confirms the core commerce pathway.
- Priority: High
- Dependencies: US-TNM-002, US-TNM-003

As a customer, I want to select a product from a category or subcategory listing and add it to my cart, so that I can proceed to checkout.

#### Acceptance Criteria
- AC-004.1: Given the customer is on a product listing page, when the customer selects a product, then the product details page shall open.
- AC-004.2: Given a product is selected, when the customer clicks Add to Cart, then the product shall be successfully added to the shopping cart.
- AC-004.3: Given the add-to-cart action succeeds, when the confirmation is displayed, then the shopping cart count or cart summary shall increase accordingly.
- AC-004.4: Given the product is added to the cart, when the customer opens the shopping cart, then the selected product shall appear with the correct name, quantity, and price.
- AC-004.5: Given the product cannot be added due to unavailability or an error, when the customer attempts to add it, then the system shall display a clear error message and shall not falsely indicate success.

#### Test Scenarios
- Positive Scenario: SC-004-P1
  - Scenario Description: Verify that selecting a visible product and clicking Add to Cart adds the item successfully and updates the cart.
- Negative Scenario: SC-004-N1
  - Scenario Description: Verify that an unavailable or failed add-to-cart action shows an error and does not add a false cart entry.
- Boundary/Validation Scenario: SC-004-B1
  - Scenario Description: Verify that the cart shows the correct quantity and that duplicate entries are not created when the same product is added more than once intentionally.

---

## 3. Test Scenarios Summary

### Positive Scenarios
- Verify the home page displays all required top navigation categories.
- Verify selecting a non-computer/non-electronics category opens a valid product listing.
- Verify selecting Computers or Electronics shows the expected subcategories.
- Verify selecting a product from the listing opens its details page.
- Verify Add to Cart adds the product and updates the shopping cart.

### Negative Scenarios
- Verify broken or missing navigation links do not create incorrect navigation.
- Verify invalid category or subcategory selection does not show unrelated or empty product data.
- Verify add-to-cart failure shows an error and does not falsely update the cart.

### Boundary/Validation Scenarios
- Verify no duplicate or empty category labels are displayed.
- Verify subcategories appear exactly once for the selected parent category.
- Verify cart quantity and product detail accuracy when adding products repeatedly.

---

## 4. Traceability Matrix

| Process Step | User Story | Acceptance Criteria | Test Scenario |
|---|---|---|---|
| 1. Login using an existing customer account | US-TNM-001 | AC-001.1, AC-001.2 | SC-001-P1, SC-001-N1 |
| 2. Navigate to the Home Page | US-TNM-001 | AC-001.1, AC-001.4 | SC-001-P1, SC-001-B1 |
| 3. Identify top navigation categories | US-TNM-001 | AC-001.1, AC-001.4 | SC-001-P1, SC-001-B1 |
| 4. Select a category except Computers or Electronics | US-TNM-002 | AC-002.1, AC-002.2, AC-002.3 | SC-002-P1, SC-002-N1 |
| 5. Verify relevant products are displayed | US-TNM-002 | AC-002.2, AC-002.4 | SC-002-P1, SC-002-B1 |
| 6. Select Computers or Electronics | US-TNM-003 | AC-003.1, AC-003.2 | SC-003-P1, SC-003-N1 |
| 7. Verify related subcategories are displayed | US-TNM-003 | AC-003.1, AC-003.2, AC-003.4 | SC-003-P1, SC-003-B1 |
| 8. Navigate to a subcategory | US-TNM-003 | AC-003.3 | SC-003-P1 |
| 9. Verify product listing is displayed | US-TNM-003, US-TNM-004 | AC-003.3, AC-004.1 | SC-003-P1, SC-004-P1 |
| 10. Select a product | US-TNM-004 | AC-004.1 | SC-004-P1 |
| 11. Add the product to cart | US-TNM-004 | AC-004.2, AC-004.3 | SC-004-P1, SC-004-N1 |
| 12. Verify product is added to the shopping cart | US-TNM-004 | AC-004.3, AC-004.4, AC-004.5 | SC-004-P1, SC-004-B1, SC-004-N1 |

---

## 5. Automation Readiness Notes
- Recommended automation scope: navigation visibility, category selection, subcategory display, product listing render, and add-to-cart confirmation.
- For automation, prioritize stable selectors such as link text, role-based locators, and product card identifiers.
- Include cleanup steps to remove added items from the cart after test execution to maintain test independence.
