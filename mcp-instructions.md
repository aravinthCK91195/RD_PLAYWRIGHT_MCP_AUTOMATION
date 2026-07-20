# RD_PLAYWRIGHT_MCP_AUTOMATION
# Playwright MCP Instructions

## Project Overview

This project uses Playwright with TypeScript for end-to-end web automation testing.

The objective is to:
- Build maintainable and reusable test automation.
- Follow Playwright best practices.
- Use AI assistance through MCP wherever applicable.
- Generate reliable and readable test code.

---

# Technology Stack

- Language: TypeScript
- Framework: Playwright
- Test Runner: Playwright Test
- Package Manager: npm
- IDE: Visual Studio Code

---

# Coding Standards

## General

- Use TypeScript.
- Write clean and modular code.
- Avoid duplicate code.
- Use async/await consistently.
- Keep functions small and reusable.

---


# File Organization

utils(folder)
  |-common.ts
model(folder)
  |-data(folder)
  |-pages(folder)
tests(folder)
  |fixtures.ts
  |-demoWebShop.spec.ts


playwright.config.ts
mcp-instructions.md
---


# Naming Convention

Test files

```
purchase-book-demowebshop.spec.ts
```

Page Objects
```
LoginPage.ts
HomePage.ts
```

Methods

```
login()

searchProduct()

addToCart()
```
 Always use camelCase for methods

interfaces, enums,classes use pascalcase 


# Locator Strategy

Use Playwright locators in the following order of preference:

1. `getByRole()` -  (Example) await page.getByRole('button', { name: 'Login' }).click();
2. `getByLabel()`
3. `getByPlaceholder()`
4. `getByText()`
5. `getByTestId()`

If none of the above locator methods can uniquely identify the element, use:

6. `locator()` with a CSS selector.

Only if a stable CSS selector is not possible, use:

7. `locator()` with an XPath expression.

Avoid fragile XPath locators whenever possible.




# Test Structure

Follow Arrange → Act → Assert.

Example:

```ts
test('User can login', async ({ page }) => {

    // Arrange
   const homepage= await new HomePage(page);

    // Act
    homepage. await homePage.clickLogin();

    // Assert
    await expect(page).toHaveURL(/dashboard/);

});
```

# Page Object Model

This repository uses a page object structure to separate selectors from page actions:

- `model/pages/`
  - stores page classes like `HomePage.ts`
  - implements high-level actions and assertions using locator classes
- `model/data/`
  - stores constants values in  `constants.ts`
  - implements high-level enums   
- `tests`
  - stores test specs like `*.spec.ts` - based on end to end functional to create a test name
  - keeps tests short and readable
  - instantiates page objects and calls page methods
- `tests/fixtures.ts`
  - stores custom created fixture for all pages  `fixtures.ts`
  - implements fixtures and to create objects.    


Example structure:

- `models/pages/HomePage.ts`
-
- `tests/home.spec.ts`

How it works:

- page classes use those locators for actions like `clickLogin()`
- tests call page object methods instead of driving raw selectors directly

Do not write long automation scripts directly inside test files.

Do not write long automation scripts directly inside test files.

---

# Assertions

Use Playwright built-in assertions.

Example

```ts
await expect(locator).toEqual('Books')

await expect(locator).toHaveText('Success');

await expect(page).toHaveURL(/dashboard/);
```

---

# Wait Strategy

Prefer auto waiting.

Use

```ts
await expect(locator).toBeVisible();
```

instead of

```ts
waitForTimeout()
```

Avoid unnecessary hard waits.

---

# Test Data

Keep test data separate from test logic.

Use:
- JSON
- Environment variables
- Fixtures

Avoid hardcoded values whenever possible.

---

# Error Handling

Provide meaningful assertion messages.

Capture screenshots on failures.

Enable tracing for debugging.

---

# Reusability

Create helper functions for:
- Login
- Navigation
- Form filling
- Common validations

Avoid duplicated code.

---


# AI (MCP) Guidelines

When generating automation code:

- Follow Playwright best practices.
- Use semantic locators.
- Reuse existing Page Objects.
- Do not duplicate methods.
- Keep methods reusable.
- Generate TypeScript code only.
- Add comments only when necessary.
- Prefer readability over complexity.

---

# When Creating New Tests

Always:

- Verify existing Page Objects first.
- Reuse utilities.
- Reuse fixtures.
- Add proper assertions.
- Keep one business scenario per test.

---

# Code Review Checklist

Before completing automation:

- No duplicate locators
- No hard waits
- Proper assertions
- Uses async/await
- Uses Page Objects
- Uses semantic locators
- Readable code
- Modular methods
- Reusable functions

---

# Goal

Generate production-ready Playwright automation that is:

- Clean
- Reusable
- Maintainable
- Scalable
- Easy to understand
- Based on Playwright best practices
