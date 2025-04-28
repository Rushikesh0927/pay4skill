// Simple file to check if .env is loading
const dotenv = require('dotenv');
const fs = require('fs');

console.log('Checking if .env file exists...');
const envExists = fs.existsSync('.env');
console.log('.env file exists:', envExists);

console.log('\nAttempting to load .env file...');
const result = dotenv.config();
console.log('dotenv config result:', result);

console.log('\nEnvironment variables after loading:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

if (process.env.MONGODB_URI) {
  console.log('First few characters of MONGODB_URI:', process.env.MONGODB_URI.substring(0, 20) + '...');
} else {
  console.log('MONGODB_URI is not defined!');
}

// Print content of .env file
console.log('\nContent of .env file:');
try {
  const envFileContent = fs.readFileSync('.env', 'utf8');
  console.log(envFileContent);
} catch (err) {
  console.error('Error reading .env file:', err);
} 