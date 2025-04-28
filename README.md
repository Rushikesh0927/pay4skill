# Pay4Skill

A platform connecting students with employers for skill-based tasks and payments.

## Features

- User authentication and profiles (students, employers, admins)
- Task posting and application management
- Real-time messaging between users
- Payment processing
- Review and rating system
- Admin dashboard for platform management

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Deployment**: Vercel

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Firebase project
- Vercel account

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pay4skill.git
   cd pay4skill
   ```

2. Install dependencies:
   ```
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ..
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```
     # MongoDB Configuration
     MONGODB_URI=your_mongodb_connection_string

     # Firebase Configuration
     FIREBASE_API_KEY=your_firebase_api_key
     FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     FIREBASE_PROJECT_ID=your_firebase_project_id
     FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     FIREBASE_APP_ID=your_firebase_app_id
     FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

     # Server Configuration
     PORT=5000
     NODE_ENV=development
     JWT_SECRET=your_jwt_secret
     ```

4. Start the development servers:
   ```
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend development server
   cd ..
   npm run dev
   ```

### MongoDB Setup

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Create a new cluster
3. Set up database access (username and password)
4. Set up network access (IP whitelist)
5. Get your connection string and add it to your `.env` file

### Firebase Setup

1. Create a [Firebase](https://firebase.google.com/) project
2. Enable Authentication (Email/Password, Google)
3. Create a Firestore database
4. Set up Storage
5. Get your Firebase configuration and add it to your `.env` file

### Vercel Deployment

1. Push your code to a GitHub repository
2. Connect your repository to [Vercel](https://vercel.com/)
3. Configure environment variables in Vercel:
   - Add all the environment variables from your `.env` file
4. Deploy your application

## API Documentation

The API documentation is available at `/api-docs` when running the server.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
