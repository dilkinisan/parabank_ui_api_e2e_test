
 

// Utility function to generate a random and unique username
export function generateRandomUsername(): string {
  const randomString = Math.random().toString(36).substring(2, 10); // Random alphanumeric string (8 characters)
  
  return `user_${randomString}`; // Combine with a prefix
   
}

  // Utility function to return static user data with a unique username
export function getUserData() {
  return {
    firstName: 'John', // Static first name
    lastName: 'Doe', // Static last name
    address: '123 Main St', // Static address
    city: 'Anytown', // Static city
    state: 'CA', // Static state
    zipCode: '12345', // Static zip code
    phone: '123-456-7890', // Static phone number
    ssn: '123-45-6789', // Static SSN
    username: generateRandomUsername(), // Unique username
    password: 'password123', // Static password
    };
  }

  // Utility function to generate a 5-digit account number
export function generate5DigitAccountNumber(): string {
  return Math.floor(10000 + Math.random() * 90000).toString(); // Random 5-digit number
}