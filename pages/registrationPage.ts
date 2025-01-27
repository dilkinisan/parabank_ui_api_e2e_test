import { Page, expect } from '@playwright/test';
import { generateRandomUsername } from '../utils/helpers'; // Import the utility function

export class RegistrationPage {
  readonly page: Page;

  // Locators
  readonly firstNameInput = 'input[name="customer.firstName"]';
  readonly lastNameInput = 'input[name="customer.lastName"]';
  readonly addressInput = 'input[name="customer.address.street"]';
  readonly cityInput = 'input[name="customer.address.city"]';
  readonly stateInput = 'input[name="customer.address.state"]';
  readonly zipCodeInput = 'input[name="customer.address.zipCode"]';
  readonly phoneInput = 'input[name="customer.phoneNumber"]';
  readonly ssnInput = 'input[name="customer.ssn"]';
  readonly usernameInput = 'input[name="customer.username"]';
  readonly passwordInput = 'input[name="customer.password"]';
  readonly confirmPasswordInput = 'input[name="repeatedPassword"]';
  readonly submitButton = 'input[value="Register"]';
  readonly successMessage = '//p[contains(text(), "successfully")]';

  constructor(page: Page) {
    this.page = page;
  }

  // Fill out the registration form
  async fillRegistrationForm(
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phone: string,
    ssn: string,
    password: string
  ) {
    const username = generateRandomUsername(); // Generate a random username
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.addressInput, address);
    await this.page.fill(this.cityInput, city);
    await this.page.fill(this.stateInput, state);
    await this.page.fill(this.zipCodeInput, zipCode);
    await this.page.fill(this.phoneInput, phone);
    await this.page.fill(this.ssnInput, ssn);
    await this.page.fill(this.usernameInput, username); // Use the generated username
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, password);
    return username; // Return the generated username for use in the test
  }

  // Submit the registration form
  async submitRegistrationForm() {
    await this.page.click(this.submitButton); // Clicks the "Submit" button
  }

  // Verify registration success
  async verifyRegistrationSuccess() {
    await expect(this.page.locator(this.successMessage)).toBeVisible();
    await expect(this.page.locator(this.successMessage)).toContainText('Your account was created successfully.');
  }
}