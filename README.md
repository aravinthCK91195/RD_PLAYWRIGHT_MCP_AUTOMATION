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

# Locator Strategy

Always prefer locators in this order:

1. getByRole()
2. getByLabel()
3. getByPlaceholder()
4. getByText()
5. getByTestId()
6. locator() using CSS
7. XPath only as the last option

Avoid fragile XPath locators whenever possible.

Example:

```ts
await page.getByRole('button', { name: 'Login' }).click();
```

---

# Test Structure

Follow Arrange → Act → Assert.

Example:

```ts
test('User can login', async ({ page }) => {

    // Arrange
    await page.goto('/');

    // Act
    await page.getByRole('button', { name: 'Login' }).click();

    // Assert
    await expect(page).toHaveURL(/dashboard/);

});
```

---

# Locators

Create Locator folder and there to store reusable locators 

# Page Object Model

This repository uses a page object structure to separate selectors from page actions:

- `tests/locators/`
  - stores locator classes like `HomePageLocators.ts`
  - defines reusable Playwright selectors in one place
- `tests/pages/`
  - stores page classes like `HomePage.ts`
  - implements high-level actions and assertions using locator classes
- `tests/spec/`
  - stores test specs like `home.spec.ts`
  - keeps tests short and readable
  - instantiates page objects and calls page methods

Example structure:

- `tests/pages/HomePage.ts`
- `tests/locators/HomePageLocators.ts`
- `tests/spec/home.spec.ts`

How it works:

- locator classes expose `Locator` objects
- page classes use those locators for actions like `searchProduct()` and `clickLogin()`
- tests call page object methods instead of driving raw selectors directly

Do not write long automation scripts directly inside test files.

Do not write long automation scripts directly inside test files.

---

# Assertions

Use Playwright built-in assertions.

Example

```ts
await expect(locator).toBeVisible();

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

# File Organization

tests/
pages/
fixtures/
utils/
data/
playwright.config.ts

---

# Naming Convention

Test files

```
login.spec.ts
checkout.spec.ts
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
