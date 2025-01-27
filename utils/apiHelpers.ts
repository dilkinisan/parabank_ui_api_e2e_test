// utils/apiHelpers.ts
import { APIRequestContext } from '@playwright/test';

export async function validateTransaction(
    request: APIRequestContext,
    accountNumber: string,
    amount: number,
    type: string,
    description: string
  ) {
    const endpoint = `https://parabank.parasoft.com/parabank/services/bank/accounts/${accountNumber}/transactions`;
    const response = await request.get(endpoint, {
      headers: { Accept: 'application/json' },
    });
    console.log('API Endpoint:',endpoint);
    console.log('API Status:', response); 

    const responseBody = await response.text();
    const transactions = JSON.parse(responseBody);
  
    const transaction = transactions.find(
      (t: any) =>
        t.amount === amount && t.type === type && t.description.includes(description)
    );
  
    if (!transaction) {
      throw new Error(`Transaction not found: Amount=${amount}, Type=${type}, Description=${description}`);
    }
  
    return transaction;
  }