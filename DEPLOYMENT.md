# Deployment Guide

## Important Notes Before Deployment

### Database Limitation
⚠️ **Critical**: This project currently uses `@replit/database`, which is **specific to Replit** and will **not work** on Vercel or other platforms.

Before deploying to Vercel, you need to:
1. Choose an alternative database solution
2. Update the authentication code to use the new database

### Recommended Database Options for Vercel:

#### Option 1: Vercel Postgres (Recommended)
- Built-in Vercel integration
- Easy setup from Vercel dashboard
- Good for production use

#### Option 2: MongoDB Atlas
- Free tier available
- Cloud-hosted
- Easy to integrate

#### Option 3: Supabase
- Open-source Firebase alternative
- Includes authentication built-in
- Free tier available

## Deploying to Vercel

### Prerequisites
1. GitHub account
2. Vercel account (free tier available)
3. Database setup (see options above)

### Steps for Deployment

#### 1. Push Code to GitHub

From the Replit Shell, run:
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

**Note**: You may need to create a Personal Access Token on GitHub for authentication.

#### 2. Update Database Configuration

Before deploying, you must replace the Replit Database code in:
- `api/register.js`
- `api/login.js`

Replace this:
```javascript
import Database from "@replit/database";
const db = new Database();
```

With your chosen database client (example for MongoDB):
```javascript
import { MongoClient } from 'mongodb';
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('your-database-name');
```

#### 3. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add environment variables in Vercel dashboard:
   - `DATABASE_URL` or equivalent for your database
6. Click "Deploy"

#### 4. API Routes Configuration

The project is already configured for Vercel serverless functions:
- API routes are in the `api/` folder
- Each file exports a default handler function
- `vercel.json` is configured for proper routing

### Testing Locally

To test the production build locally:

```bash
# Build the frontend
npm run build

# Preview the build
npm run preview
```

### Environment Variables

Make sure to set these in Vercel Dashboard under Project Settings > Environment Variables:
- `DATABASE_URL` (or equivalent for your chosen database)
- Any API keys for third-party services

## Alternative: Deploy Backend Separately

If you prefer to keep the current backend structure:

1. **Backend** (server.js with Express):
   - Deploy to Railway, Render, or Heroku
   - Update database to use a cloud solution
   
2. **Frontend** (React app):
   - Deploy to Vercel
   - Update API calls to point to your backend URL

## Post-Deployment Checklist

- [ ] Database is configured and accessible
- [ ] Environment variables are set in Vercel
- [ ] API endpoints are working
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard displays correctly
- [ ] All pages load properly
- [ ] No console errors in browser

## Troubleshooting

### "Database connection failed"
- Check that environment variables are set correctly in Vercel
- Verify your database service is running and accessible

### "API routes not working"
- Verify `vercel.json` is in the root directory
- Check that API files are in the `api/` folder
- Ensure each API file exports a default handler

### "Build failed"
- Check that all dependencies are in `package.json`
- Verify build command is correct
- Check for any TypeScript or linting errors

## Need Help?

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console for errors
3. Verify all environment variables are set
4. Test API endpoints individually

---

**Created**: November 21, 2025
**Last Updated**: November 21, 2025
