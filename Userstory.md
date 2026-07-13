# Demo Web Shop Agile User Stories

## US-001: Login as a Registered User
As a registered customer, I want to log in to the Demo Web Shop, so that I can securely access my account and continue shopping with my saved profile.

### Acceptance Criteria
1. Given the user is on the Demo Web Shop home page, when they click the Login link, then the login page should be displayed.
2. Given the user enters a valid registered email and password, when they click the Login button, then the user should be authenticated successfully.
3. Given the user has logged in successfully, when the page reloads or navigates, then the logged-in state should be visible via account indicator or Logout option.
4. Given invalid credentials are entered, when the user attempts to log in, then an error message should be displayed and the user should remain on the login page.
5. Given the login is successful, when the user is authenticated, then they should be able to proceed to browse product categories.

### Covered Process Steps
- Open the Demo Web Shop home page.
- Click the Login link.
- Enter valid registered user credentials.
- Click the Login button.
- Verify the user is successfully logged in.
- Verify the account shows the logged-in state.

### Dependencies
- None

---

## US-002: Browse Books and View Product Details
As a customer, I want to browse the Books section and view a book's details, so that I can choose the right product before adding it to my cart.

### Acceptance Criteria
1. Given the user is logged in or on the home page, when they select the Books category, then the Books product list should be displayed.
2. Given the Books listing is displayed, when the user selects an available book, then the product details page for that book should open.
3. Given the product details page is open, when the user views the page, then product information such as title, price, and availability must be visible.
4. Given a book is selected, when the user is on the product details page, then they should have the option to add the product to the shopping cart.

### Covered Process Steps
- From the homepage or navigation menu, click the Books section.
- Select an available book/product from the list.
- Open the product details page.

### Dependencies
- US-001: Login as a Registered User (if the flow requires authenticated browsing for this application)

---

## US-003: Add Product to Cart and Verify Cart Contents
As a shopper, I want to add a selected book to my shopping cart and verify it is present, so that I can proceed to checkout with confidence.

### Acceptance Criteria
1. Given a product details page is displayed, when the user clicks Add to Cart, then the product should be added to the shopping cart.
2. Given the product is added, when the system confirms the action, then a success notification should be visible.
3. Given the user navigates to the Shopping Cart, when the cart page opens, then the selected book should appear with correct name, quantity, and price.
4. Given the product is in the cart, when the user reviews the cart, then there should be no unexpected items present.

### Covered Process Steps
- Click Add to Cart for the selected product.
- Confirm the product is added successfully.
- Navigate to the Shopping Cart.
- Verify the selected product appears in the cart.

### Dependencies
- US-002: Browse Books and View Product Details

---

## US-004: Complete Checkout and Place an Order
As a customer, I want to complete the checkout process with address, shipping, and payment details, so that I can place an order for the items in my cart.

### Acceptance Criteria
1. Given the shopping cart contains at least one product, when the user proceeds to checkout, then the checkout flow should begin.
2. Given the checkout flow is active, when the user enters required billing and shipping address details, then the information should be accepted.
3. Given address details are entered, when the user selects a shipping method and a payment method, then those selections should be saved for the order.
4. Given the order summary is available, when the user reviews it, then it should list the selected product, shipping method, payment method, and total cost.
5. Given all required checkout fields are completed, when the user places the order, then the order should be submitted successfully.

### Covered Process Steps
- Proceed to checkout from the shopping cart.
- Enter the required billing/shipping address details.
- Select a shipping method.
- Select a payment method.
- Review the order summary.
- Place the order.

### Dependencies
- US-003: Add Product to Cart and Verify Cart Contents

---

## US-005: Confirm Order and Logout
As a shopper, I want to confirm my order placement and then log out, so that I can complete the purchase and end my session securely.

### Acceptance Criteria
1. Given the order is placed, when the confirmation page appears, then the order confirmation message should be displayed.
2. Given the order is confirmed, when the confirmation details are shown, then the generated order number should be visible and capturable.
3. Given the order confirmation page is visible, when the user verifies the page, then it should clearly indicate successful placement.
4. Given the user chooses to log out, when they click Logout, then the session should end and the user should return to an unauthenticated state.
5. Given the user is logged out, when the page refreshes or navigates, then the Login link or guest view should be displayed.

### Covered Process Steps
- Confirm the order is successfully placed.
- Save the generated order number.
- Verify the order confirmation page is displayed.
- Log out from the account.
- Verify the user is logged out successfully.

### Dependencies
- US-004: Complete Checkout and Place an Order
