// pages/billPayPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class BillPayPage {
  private readonly page: Page;
  private readonly payeeNameInput: Locator;
  private readonly addressInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly phoneInput: Locator;
  private readonly accountInput: Locator;
  private readonly verifyAccountInput: Locator;
  private readonly amountInput: Locator;
  private readonly sendPaymentButton: Locator;
  private readonly paymentSuccessMessage: Locator;
  private readonly fromAccountDropdown: Locator; // Locator for "From Account" dropdown

  constructor(page: Page) {
    this.page = page;
    this.payeeNameInput = page.locator('input[name="payee.name"]');
    this.addressInput = page.locator('input[name="payee.address.street"]');
    this.cityInput = page.locator('input[name="payee.address.city"]');
    this.stateInput = page.locator('input[name="payee.address.state"]');
    this.zipCodeInput = page.locator('input[name="payee.address.zipCode"]');
    this.phoneInput = page.locator('input[name="payee.phoneNumber"]');
    this.accountInput = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountInput = page.locator('input[name="verifyAccount"]');
    this.amountInput = page.locator('input[name="amount"]');
    this.sendPaymentButton = page.locator('input[value="Send Payment"]');
    this.paymentSuccessMessage = page.locator('text=Bill Payment Complete');
    this.fromAccountDropdown = page.locator('select[name="fromAccountId"]'); // Locator for "From Account" dropdown
  }

  // Navigate to the Bill Pay page
  async navigateToBillPayPage() {
    await this.page.click('text=Bill Pay');
    await expect(this.page).toHaveURL(/billpay\.htm/i); // Verify the URL
  }

  // Fill out the bill payment form
  async fillBillPaymentForm(
    payeeName: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phone: string,
    accountNumber: string,
    amount: string,
    fromAccountNumber: string // New parameter for "From Account" number
  ) {
    // Select the "From Account" dropdown
    await this.fromAccountDropdown.selectOption(fromAccountNumber);

    // Fill out the form
    await this.payeeNameInput.fill(payeeName);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.zipCodeInput.fill(zipCode);
    await this.phoneInput.fill(phone);
    await this.accountInput.fill(accountNumber);
    await this.verifyAccountInput.fill(accountNumber); // Verify account number
    await this.amountInput.fill(amount);
  }

  // Submit the payment
  async sendPayment() {
    await this.sendPaymentButton.click();
  }

  // Verify the payment was successful
  async verifyPaymentSuccess() {
    await expect(this.paymentSuccessMessage).toBeVisible(); // Verify sucess message
  }
}