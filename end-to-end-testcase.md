Demo Webshop End-to-End Scenario
Objective
Validate the complete customer journey for a registered user on https://demowebshop.tricentis.com/.

Functional End-to-End Scenario
1. User Login
Open the Demo Webshop home page.
Click the Login link.
Enter valid registered user credentials.
Click the Login button.
Verify the user is successfully logged in.
Verify the account shows the logged-in state.
2. Browse Books Section
From the homepage or navigation menu, click the Books section.
Select an available book/product from the list.
Open the product details page.
3. Add Product to Cart
Click Add to Cart for the selected product.
Confirm the product is added successfully.
Navigate to the Shopping Cart.
Verify the selected product appears in the cart.
4. Checkout Flow
Proceed to checkout from the shopping cart.
Enter the required billing/shipping address details.
Select a shipping method.
Select a payment method.
Review the order summary.
Place the order.
5. Order Confirmation
Confirm the order is successfully placed.
Save the generated order number.
Verify the order confirmation page is displayed.
6. Logout
Log out from the account.
Verify the user is logged out successfully.
Test Cases
TC01 - Login as Registered User
Precondition: A registered user account exists.
Steps:
Open the website.
Click Login.
Enter email and password.
Click Login.
Expected Result: User is logged in successfully.
TC02 - Verify Logged-In User
Steps:
After login, verify the account is in logged-in state.
Expected Result: Logout option is visible and user is recognized as logged in.
TC03 - Open Books Section and Select Product
Steps:
Click Books in the navigation menu.
Select a product.
Expected Result: Product details page is displayed.
TC04 - Add Product to Cart
Steps:
Click Add to Cart.
Confirm success message.
Expected Result: Product appears in the shopping cart.
TC05 - Navigate to Shopping Cart
Steps:
Open Shopping Cart.
Expected Result: The selected product is listed with correct details.
TC06 - Complete Checkout
Steps:
Proceed to checkout.
Enter address.
Select shipping method.
Select payment method.
Place the order.
Expected Result: Order is placed successfully.
TC07 - Save and Verify Order Number
Steps:
Capture the order number on the confirmation page.
Expected Result: Order number is saved and displayed clearly.
TC08 - Logout
Steps:
Click Logout.
Expected Result: User is logged out successfully.