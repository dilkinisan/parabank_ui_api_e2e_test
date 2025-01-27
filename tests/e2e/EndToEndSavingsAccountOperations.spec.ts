// tests/e2e/EndToEndSavingsAccountOperations.ts
import { test, expect } from '../../utils/baseTest';
import { LoginPage } from '../../pages/loginPage';
import { RegistrationPage } from '../../pages/registrationPage';
import { HomePage } from '../../pages/homePage';
import { OpenNewAccountPage } from '../../pages/openNewAccountPage';
import { AccountOverviewPage } from '../../pages/accountOverviewPage';
import { TransferFundsPage } from '../../pages/transferFundsPage';
import { BillPayPage } from '../../pages/billPayPage';
import { getUserData, generate5DigitAccountNumber } from '../../utils/helpers';
import { validateTransaction } from '../../utils/apiHelpers';
import { writeUserCredentials } from '../../utils/fileUtils';


test.describe.serial('Complete E2E Flow: Registration to API Validation', () => {
  let newAccountNumber: string;
  const amount = '100'; // Dynamic or configurable amount

  test('Complete E2E flow', async ({ page, request }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new RegistrationPage(page);
    const homePage = new HomePage(page);
    const openNewAccountPage = new OpenNewAccountPage(page);
    const accountOverviewPage = new AccountOverviewPage(page);
    const transferFundsPage = new TransferFundsPage(page);
    const billPayPage = new BillPayPage(page);

    // Step 1: Navigate to the ParaBank application
    await page.goto('https://parabank.parasoft.com/');

    // Step 2: Create a new user
    await loginPage.navigateToLoginPage();
    await loginPage.clickRegisterButton();

    const user = getUserData(); // Use the utility function to get user data
    const username = await registrationPage.fillRegistrationForm(
      user.firstName,
      user.lastName,
      user.address,
      user.city,
      user.state,
      user.zipCode,
      user.phone,
      user.ssn,
      user.password
    );

    await registrationPage.submitRegistrationForm();
    await registrationPage.verifyRegistrationSuccess();

    // Store the user credentials in a file
    writeUserCredentials(username, user.password);
    console.log('Generated username:', username);
    console.log('Generated password:', user.password);

    // Step 2.1: Log out after registration
    await loginPage.logout();
    console.log('Logged out after registration.');

    // Step 3: Log in with the created user
    //await loginPage.page.pause();
    await loginPage.navigateToLoginPage();
    await loginPage.login(username, user.password);

    // Step 4: Verify the global navigation menu
    //await homePage.navigateToHomePage();
    await homePage.verifyGlobalNavigationMenu();
    

    // Step 5: Create a new Savings account
    await openNewAccountPage.navigateToOpenNewAccountPage();
    await openNewAccountPage.selectAccountType('SAVINGS');
    await openNewAccountPage.clickOpenNewAccountButton();

    // Retrieve the new account number
    newAccountNumber = await openNewAccountPage.getNewAccountNumber();
    console.log(`New Savings Account Number: "${newAccountNumber}"`);

    // Verify the newAccountNumber is not empty
    if (!newAccountNumber) {
      throw new Error('New account number is empty. Please check the account creation step.');
    }

    // Step 6: Validate the Accounts Overview page
    await accountOverviewPage.navigate();
    const balance = await accountOverviewPage.getBalance();
    expect(balance).toBeTruthy(); // Verify balance is not empty
    console.log(`Account Balance: ${balance}`);

    // Step 7: Transfer funds
    await transferFundsPage.navigateToTransferFundsPage();

    // Fetch available account numbers from the dropdowns
    const fromAccounts = await transferFundsPage.getAccountNumbers(transferFundsPage.fromAccountDropdown);
    const toAccounts = await transferFundsPage.getAccountNumbers(transferFundsPage.toAccountDropdown);

    // Select valid source and destination accounts
    const fromAccount = fromAccounts[0]; // Use the first account as the source
    const toAccount = toAccounts[1]; // Use the second account as the destination

    // Transfer $100
    await transferFundsPage.transferFunds(fromAccount, toAccount);

    // Verify the transfer was successful
    await transferFundsPage.verifyTransferSuccess();

    // Step 8: Pay a bill
    await billPayPage.navigateToBillPayPage();

    // Use getUserData to populate the bill payment form
    const userData = getUserData();
    const payeeAccountNumber = generate5DigitAccountNumber(); // Generate a random 5-digit account number

    await billPayPage.fillBillPaymentForm(
      `${userData.firstName} ${userData.lastName}`,
      userData.address,
      userData.city,
      userData.state,
      userData.zipCode,
      userData.phone,
      payeeAccountNumber,
      amount,
      newAccountNumber // Pass the new account number as the "From Account"
    );

    // Submit the payment
    await billPayPage.sendPayment();

    // Verify the payment was successful
    await billPayPage.verifyPaymentSuccess();

    // Step 9: Validate the transaction via API
    const transaction = await validateTransaction(
      request, // Playwright's request object
      newAccountNumber, // Account number to fetch transactions for
      parseFloat(amount), // Expected transaction amount
      'Debit', // Expected transaction type
      'Bill Payment' // Expected transaction description
    );

    // Additional assertions
    expect(transaction.amount).toBe(parseFloat(amount));
    expect(transaction.type).toBe('Debit');
    expect(transaction.description).toContain('Bill Payment');

    console.log('Validated Transaction:/API JSON Response:', JSON.stringify(transaction, null, 2));

    // Additional assertions
    expect(transaction.amount).toBe(parseFloat(amount));
    expect(transaction.type).toBe('Debit');
    expect(transaction.description).toContain('Bill Payment');
  });
});