// utils/baseTest.ts
import { test as base, Page, expect } from '@playwright/test'; 
import { LoginPage } from '../pages/loginPage';
import { readUserCredentials } from './fileUtils';

// Extend the default test object with a custom fixture
export const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Retrieve user credentials from the file
    const { username, password } = readUserCredentials();
    console.log('Retrieved user credentials:', { username, password });

    // Navigate to the login page and log in
    await loginPage.navigateToLoginPage();
    await loginPage.login(username, password);

    // Verify login success
    await expect(page.getByRole('heading', { name: 'Account Services' })).toBeVisible();

    // Pass the logged-in page to the test
    await use(page);
  },
});

export { expect }; // Re-export expect 