// pages/transferFundsPage.ts
import { Page, Locator , expect} from '@playwright/test';

export class TransferFundsPage {
  private readonly page: Page;
  private readonly amountInput: Locator;
  public readonly fromAccountDropdown: Locator;
  public readonly toAccountDropdown: Locator;
  private readonly transferButton: Locator;
  private readonly transferSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.locator('input#amount');
    this.fromAccountDropdown = page.locator('select#fromAccountId'); // Update selector if needed
    this.toAccountDropdown = page.locator('select#toAccountId'); // Update selector if needed
    this.transferButton = page.locator('input[value="Transfer"]');
    this.transferSuccessMessage = page.locator('text=Transfer Complete!');
  }

  // Navigate to the Transfer Funds page
  async navigateToTransferFundsPage() {
    await this.page.click('text=Transfer Funds');
    await expect(this.page).toHaveURL(/transfer\.htm/i); // Verify the URL

   /* // Wait for the From Account dropdown to be loaded
    await this.waitForFromAccountDropdownLoaded();
  }

  // Wait for the From Account dropdown to be loaded
  async waitForFromAccountDropdownLoaded() {
    // Wait for at least one option to be visible in the dropdown
    await this.fromAccountDropdown.locator('option').first().waitFor({ state: 'visible' });
    console.log('From Account dropdown is loaded.');
  }

*/
  }

  // Get the list of available account numbers from the dropdown
  async getAccountNumbers(dropdown: Locator): Promise<string[]> {
    // Fetch all options
    const options = await dropdown.locator('option').all();
    const accountNumbers = await Promise.all(options.map(async (option) => {
      return await option.innerText();
    }));

    // Log the account numbers 
    console.log('Dropdown Options:', accountNumbers);

    return accountNumbers.filter(Boolean); // Remove empty values
  }

  // Transfer $100 between accounts
  async transferFunds(fromAccount: string, toAccount: string) {
    const amount = '100'; // Always transfer $100

    // Enter the amount
    await this.amountInput.fill(amount);

    // Select the source account
    await this.fromAccountDropdown.selectOption({ label: fromAccount });

    // Select the destination account
    await this.toAccountDropdown.selectOption({ label: toAccount });

    // Click the Transfer button
    await this.transferButton.click();
  }

  // Verify the transfer was successful
  async verifyTransferSuccess() {
    await expect(this.transferSuccessMessage).toBeVisible(); // Verify success msg
  }
}