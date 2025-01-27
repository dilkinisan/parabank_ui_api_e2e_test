// pages/openNewAccountPage.ts
import { Page } from '@playwright/test';

export class OpenNewAccountPage {
  private page: Page;
  public accountTypeDropdown: any;
  private openAccountButton: any;
  private newAccountId: any;

  constructor(page: Page) {
    this.page = page;
    // Initialize locators
    this.accountTypeDropdown = page.locator('select#type'); // Dropdown for account type
    this.openAccountButton = page.getByRole('button', { name: 'Open New Account' }); // Open Account button
    this.newAccountId = page.locator('a#newAccountId'); // New account number
  }

  // Navigate to the Open New Account page
  async navigateToOpenNewAccountPage() {
    await this.page.goto('/parabank/openaccount.htm');
  }

  // Select account type (e.g., 'SAVINGS' or 'CHECKING')
  async selectAccountType(accountType: string) {
    await this.accountTypeDropdown.click;
    await this.accountTypeDropdown.selectOption('SAVINGS');
    console.log(`Selected account type: ${accountType}`);
  }

  // Click the "Open New Account" button
  async clickOpenNewAccountButton() {
    //await this.page.pause();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
    await this.openAccountButton.click();
    console.log('Clicked "Open New Account" button');
  }

  // Retrieve the new account number
  async getNewAccountNumber(): Promise<string> {
    // Wait for the new account ID to be visible
    await this.newAccountId.waitFor({ state: 'visible' });

    // Retrieve the account number text
    const accountNumber = await this.newAccountId.innerText();
    console.log(`Retrieved Account Number: "${accountNumber}"`); // Log the retrieved account number
    return accountNumber.trim(); // Trim any extra spaces
  }
}