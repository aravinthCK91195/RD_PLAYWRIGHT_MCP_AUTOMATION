# RD_PLAYWRIGHT_MCP_AUTOMATION
# MCP Engineering Instructions

## Purpose

This document defines how MCP-assisted coding should work for this repository.

Goals:
- Produce stable, readable, and reusable Playwright TypeScript automation.
- Preserve the current Page Object + fixtures architecture.
- Enforce consistent locator, wait, assertion, and naming standards.
- Minimize flaky tests and duplicate logic.

## Current Stack

- Language: TypeScript
- Test framework: @playwright/test
- Browser automation: Playwright
- Package manager: npm
- Environment config: dotenv
- MCP package: @playwright/mcp

## Project Structure (Source of Truth)

- model/data/constants.ts
- model/pages/*.ts
- tests/fixtures.ts
- tests/*.spec.ts
- utils/common.ts
- playwright.config.ts

## Runtime and Configuration Rules

- Base URL must come from BASE_URL in .env, with fallback in playwright.config.ts.
- Credentials must come from environment variables:
  - RDUSERNAME
  - RDPASSWORD
- Never hardcode credentials in tests or page objects.
- Keep trace setting as configured in playwright.config.ts unless explicitly asked to change.

## Naming and Code Style

- File names: kebab-case for project files, e.g. purchase-books-demowebshop.spec.ts.
- Classes, enums, interfaces, and types: PascalCase.
- Methods and variables: camelCase.
- Prefer explicit method names describing behavior, e.g. expectCheckoutPageVisible.
- Keep methods focused on one user action or one assertion intent.

## Page Object Model Rules

- Put reusable UI behavior in model/pages classes, not in spec files.
- Keep selectors and interaction details inside page objects.
- Keep test files focused on scenario orchestration and business assertions.
- Reuse existing fixtures from tests/fixtures.ts instead of creating ad-hoc objects in tests.
- Extend base patterns already used in BasePage and CommonTests; do not introduce parallel patterns unless necessary.

## Locator Strategy

Use this priority order:
1. getByRole
2. getByLabel
3. getByPlaceholder
4. getByText
5. getByTestId
6. locator with stable CSS
7. XPath only as last resort

Rules:
- Prefer accessibility-friendly locators.
- Avoid brittle selectors tied to styling/layout.
- Use .first() only when the UI intentionally has duplicate matching nodes.

## Wait and Synchronization Strategy

- Rely on Playwright auto-waiting and web-first assertions.
- Prefer expect(locator).toBeVisible()/toBeEnabled() over fixed delays.
- Avoid waitForTimeout except for unavoidable transient UI behavior and document why.
- After navigation-triggering actions, verify destination with URL assertion.

## URL and Route Verification Rules

- Use Routes enum from model/data/constants.ts for known routes.
- Keep Products and Routes aligned when using lookups like Routes[product].
- Verify URL after navigation actions, not before.
- For dynamic PDP URLs, verify using resolved pathname/regex as implemented in current specs.

## Test Authoring Standards

- Use test.step to split major business phases.
- Follow Arrange -> Act -> Assert in each step.
- Keep one primary business scenario per test.
- Prefer deterministic assertions over console-only validation.
- Use chaining only when it improves readability; avoid overly complex promise chains.

## Assertions Standards

- Use Playwright expect APIs only.
- Assert critical checkpoints:
  - page URL
  - page-level visibility markers
  - cart item correctness
  - checkout completion and order number
- Add assertion context through clear step names and method names.

## Reusability and Duplication Controls

- Before adding any method, check existing methods in:
  - BasePage
  - page-specific classes under model/pages
  - CommonTests
- If logic is shared by 2+ specs, move it into a reusable page/helper method.
- Do not duplicate locators across page classes for the same element.

## MCP Behavior Contract (For AI-Assisted Changes)

When MCP generates or edits code in this repo, it must:
- Use TypeScript compatible with existing project setup.
- Reuse existing fixtures and page objects first.
- Keep edits minimal and localized to requested behavior.
- Preserve current public method contracts unless refactor is explicitly requested.
- Add or update assertions when changing navigation or checkout behavior.
- Run targeted Playwright tests for changed flows when possible.

MCP must avoid:
- Introducing new frameworks or architectural patterns.
- Replacing working locator strategies with weaker ones.
- Adding hard waits as a default solution.
- Embedding secrets or environment data into source code.

## Recommended Commands

- Run default test command:

```bash
npm test
```

- Run books flow:

```bash
npx playwright test tests/purchase-books-demowebshop.spec.ts --reporter=line
```

- Run computers flow:

```bash
npx playwright test tests/purchase-computers-demowebshop.spec.ts --reporter=line
```

## Quality Gate Before Finalizing Changes

Checklist:
- No TypeScript errors in changed files.
- No duplicate or brittle locators introduced.
- URL/state assertions updated for navigation changes.
- Fixtures/page objects reused correctly.
- Relevant spec(s) executed or explicitly documented if not run.

## Definition of Done

A change is done when it is:
- Functionally correct for the target flow.
- Readable and maintainable by the existing team.
- Aligned with current architecture and conventions.
- Verified by targeted test execution.
