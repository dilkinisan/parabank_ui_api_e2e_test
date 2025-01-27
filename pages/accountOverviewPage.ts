import { Page } from '@playwright/test';

export class AccountOverviewPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://parabank.parasoft.com/parabank/overview.htm');
  }

  async getBalance(): Promise<string> {
    const balance = await this.page.getByRole('cell', { name: '$' }).first().textContent();
    if (balance === null) {
      throw new Error('Balance element not found or has no text content.');
    }
    return balance;
  }
}