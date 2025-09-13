# SauceDemo Automated Tests

This project contains automated tests for the [SauceDemo](https://www.saucedemo.com/) website using [Playwright](https://playwright.dev/).

## Project Structure

```
SauceDemoTests/
├── presentation/          # Presentation file
├── config/                # Configuration files (e.g., data.json)
├── pages/                 # Page Object Model (POM) classes
├── tests/                 # Test files
├── utils/                 # Utility functions
├── playwright-report/     # Test execution reports
├── test-results/          # Results of the last test run
├── node_modules/          # Dependencies
├── package.json           # Project dependencies and scripts
├── playwright.config.ts   # Playwright configuration
```

## Prerequisites

- Node.js (>= 14.x)
- Playwright installed globally or locally in the project

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SauceDemoTests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Tests in a Specific File
```bash
npx playwright test tests/<file-name>.spec.ts
```

### Run a Specific Test
```bash
npx playwright test -g "<test-name>"
```

### Run Tests in Headed Mode
```bash
npx playwright test --headed
```

### Generate and View HTML Report
1. Run tests with the HTML reporter:
   ```bash
   npx playwright test
   ```
2. Open the report:
   ```bash
   npx playwright show-report
   ```

## Features

- **Page Object Model (POM):**
  - `pages/` contains classes for each page of the SauceDemo website.
  - Example: `LoginPage`, `InventoryPage`, `CartPage`, `CheckoutPage`.

- **Test Scenarios:**
  - Login tests (`login.spec.ts`)
  - Inventory tests (`inventory.spec.ts`)
  - Cart tests (`cart.spec.ts`)
  - Checkout tests (`checkout.spec.ts`)

- **Reports:**
  - HTML reports are generated in the `playwright-report/` folder.

## Configuration

- **Test Data:**
  - Located in `config/data.json`.
  - Example:
    ```json
    {
      "user": "standard_user",
      "password": "secret_sauce",
      "productsToAdd": ["Sauce Labs Backpack", "Sauce Labs Bike Light"]
    }
    ```

- **Playwright Configuration:**
  - Located in `playwright.config.ts`.
  - Example:
    ```typescript
    export default defineConfig({
        use: {
            headless: false,
            trace: 'on-first-retry',
        },
    });
    ```

## Demo

A demo video of the test execution is available in the `presentation/` folder:
- [sauce-demo-tests.txt](./apresentação/sauce-demo-tests.txt)

## Contributing

Feel free to fork this repository and submit pull requests for improvements or additional test scenarios.
