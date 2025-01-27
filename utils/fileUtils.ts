import fs from 'fs';
import path from 'path';

const credentialsFilePath = path.resolve(__dirname, 'userCredentials.json');

// Function to write user credentials to a file
export function writeUserCredentials(username: string, password: string) {
  const credentials = { username, password };
  fs.writeFileSync(credentialsFilePath, JSON.stringify(credentials));
}

// Function to read user credentials from a file
export function readUserCredentials() {
  if (!fs.existsSync(credentialsFilePath)) {
    throw new Error('User credentials file not found.');
  }
  const data = fs.readFileSync(credentialsFilePath, 'utf-8');
  return JSON.parse(data);
}

// Function to delete the credentials file
export function deleteUserCredentials() {
  if (fs.existsSync(credentialsFilePath)) {
    fs.unlinkSync(credentialsFilePath); // Delete the file
    console.log('Credentials file deleted.'); // Optional: Log the deletion
  }
}