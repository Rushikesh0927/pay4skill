# Deployment Instructions

This document outlines the steps to deploy the Pay4Skill application on Vercel (frontend) and Render (backend).

## Frontend Deployment (Vercel)

1. Sign up for a Vercel account at https://vercel.com if you don't have one already.

2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

3. Login to Vercel from the CLI:
   ```
   vercel login
   ```

4. From the project root directory, deploy the frontend:
   ```
   vercel
   ```

5. Set up environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to the "Environment Variables" section
   - Add the following variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Secret key for JWT token generation
     - Other variables specified in the vercel.json file

6. Set up the production deployment:
   ```
   vercel --prod
   ```

## Backend Deployment (Render)

1. Sign up for a Render account at https://render.com if you don't have one already.

2. Create a new Web Service:
   - Connect your GitHub repository
   - Select the repository containing your project
   - Configure the service with the following settings:
     - Name: pay4skill-api
     - Environment: Node
     - Build Command: `cd server && npm install && npm run build`
     - Start Command: `cd server && npm start`
     - Region: Choose one closest to your users
     - Plan: Starter or higher based on your needs

3. Set up environment variables in the Render dashboard:
   - Go to your web service settings
   - Navigate to the "Environment" section
   - Add the following variables:
     - `NODE_ENV`: production
     - `PORT`: 8080
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: Secret key for JWT token generation
     - `FIREBASE_API_KEY`: Your Firebase API key
     - `FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
     - `FIREBASE_PROJECT_ID`: Your Firebase project ID
     - `FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
     - `FIREBASE_MESSAGING_SENDER_ID`: Your Firebase sender ID
     - `FIREBASE_APP_ID`: Your Firebase app ID

4. Enable auto-deployment to automatically deploy when changes are pushed to your main branch.

## Connecting Frontend and Backend

1. Update the API base URL in your frontend code to point to your Render backend URL:
   - If using the Vercel proxy, ensure API requests use the "/api" prefix
   - If directly calling the backend, update the API base URL to your Render service URL

2. Test the connection to ensure everything is working properly.

## Monitoring and Maintenance

1. Set up monitoring through Render and Vercel dashboards
2. Regularly check logs for errors
3. Set up alerts for service disruptions

## Troubleshooting

If you encounter issues:

1. Check the logs in both Vercel and Render dashboards
2. Verify environment variables are correctly set
3. Ensure MongoDB connection is working
4. Check CORS configuration if experiencing API connectivity issues 