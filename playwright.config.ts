import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests', // Directory where your tests are located
  fullyParallel: true, // Run tests in parallel
  forbidOnly: !!process.env.CI, // Fail the build on CI if test.only is used
  retries: process.env.CI ? 2 : 0, // Retry tests on CI
  workers: process.env.CI ? 1 : undefined, // Opt out of parallel tests on CI
  reporter: 'html', // Use HTML reporter

  // Shared settings for all projects
  use: {
    baseURL: process.env.PARA_BANK_URL, // Base URL for your tests (ensure this matches your .env file)
    trace: 'on-first-retry', // Collect trace when retrying a failed test
    headless: true, // Ensure all tests run in headless mode
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },                                                                                                           
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // Run your local dev server before starting the tests (optional)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});