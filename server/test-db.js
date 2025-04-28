// Simple test file to connect to MongoDB
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Get MongoDB URI from .env file
const uri = process.env.MONGODB_URI;

console.log('Environment variables loaded:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);

if (!uri) {
  console.error('ERROR: MONGODB_URI is not defined in the .env file!');
  process.exit(1);
}

console.log('Attempting to connect to MongoDB...');
console.log('URI (with hidden password):', uri.replace(/(?<=:\/\/[^:]+:)[^@]+(?=@)/, '******'));

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connection successful!');
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }); 