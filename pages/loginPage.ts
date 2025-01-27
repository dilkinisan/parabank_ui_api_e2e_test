import { Page } from '@playwright/test';


export class LoginPage {
  readonly page: Page;

  // Locator for the "Register" link
  readonly registerLink = '//a[@href="register.htm"]'; // Register link eliment

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to the login page
  async navigateToLoginPage() {
    await this.page.goto('/'); // Navigates to the base URL (e.g., https://parabank.parasoft.com)
  }

  // Click the "Register" link to go to the registration page
  async clickRegisterButton() {
    await this.page.click(this.registerLink); // Clicks the "Register" link

  }

  async login(username: string, password: string) {
      await this.page.fill('//input[@name="username"]', username); 
      await this.page.fill('//input[@name="password"]', password); 
      await this.page.click('//input[@value="Log In"]'); 

  }
}