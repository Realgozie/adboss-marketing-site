# AdBoss Marketing Site

## Overview

AdBoss is a marketing website built as a single-page application using React and Vite. The project serves as a landing page with user registration functionality, designed to capture leads through a simple sign-up form. The application combines a modern React frontend with a lightweight Express.js backend, utilizing Replit's database service for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (March 22, 2026)

### Major Feature Update
- **Login page**: Password show/hide toggle; "Forgot password?" link opens a clean modal — user enters email and receives a reset link (see Email Setup below).
- **Reset password flow**: New `/reset-password` page (token + email from the link, sets new password via backend, handles expiry gracefully).
- **Email confirmation on register**: On successful registration, a verification email is sent (if SMTP is configured). A `/api/verify-email` endpoint verifies the token and redirects to `/login?verified=true`, where a green banner appears.
- **Sign out confirmation modal**: Clicking "Sign Out" in sidebar or mobile menu opens a confirmation modal ("Stay" / "Sign Out").
- **User-specific dashboard**: Campaigns now live in Replit DB per user (`campaigns_${email}`). Home overview computes stats (budget, active campaigns, leads, conv rate) from the logged-in user's real data. New users start at zero.
- **Campaigns CRUD**: Full create/edit/delete/status-toggle via REST API (`/api/campaigns`). Each user only sees their own campaigns.
- **Admin "Registered Users" panel**: First registered user is flagged `isAdmin:true`. When logged in as admin, a "Registered Users" tab appears in Settings showing all accounts with name, email, join date, and verification status.
- **Email system** (`api/mailer.js`): Nodemailer integration — gracefully skips sending if `EMAIL_USER`/`EMAIL_PASS` env vars are not set (logs to console instead). Configure with Gmail credentials to enable real email.

### Email Setup (optional but recommended)
Set these two environment variables to enable email sending:
- `EMAIL_USER` — your Gmail address
- `EMAIL_PASS` — your Gmail App Password (generate at myaccount.google.com → Security → App passwords)

## Recent Changes (March 19, 2026)

### Dark Mode (Full App)
- Added `darkMode: "class"` to `tailwind.config.js`
- Created `src/context/ThemeContext.jsx` — persists preference to `localStorage`, respects OS preference on first visit, toggles `dark` class on `<html>`
- Wrapped `<App>` with `<ThemeProvider>` in `src/index.jsx`
- Added moon/sun toggle button to both the landing page `Header` and the dashboard top bar
- Applied `dark:` Tailwind variants to every page and component: Dashboard, StatsGrid, Home, Campaigns, Messages, Settings (all 5 tabs), Login, Register, Features, Testimonials, Contact, Footer

## Recent Changes (November 21, 2025)

### Authentication Bug Fix
- **Issue Resolved**: Login was failing even with correct credentials after successful registration
- **Root Cause**: Replit Database returns responses in format `{ok: true, value: [...]}` but code expected direct array access
- **Solution**: Updated both `/api/register.js` and `/api/login.js` to handle both response formats
- **Status**: Fully tested and working correctly

### Security Improvements
- Added error handling for localStorage parsing in Dashboard component
- Prevents crashes from corrupted session data
- Automatic cleanup of invalid localStorage entries

### Deployment Configuration (December 12, 2025)
- Configured project for Replit deployment (Autoscale)
- Updated server.js to serve both API and static files in production
- Build command: `npm run build`
- Run command: `node server.js`
- Single workflow serving frontend and backend on port 5000
- Ready to publish via Replit's "Publish" button

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with Vite as the build tool and development server
- **Styling**: Tailwind CSS for utility-first styling with custom animations and Inter font integration
- **Routing**: React Router DOM for client-side navigation
- **Icons**: Heroicons React library for consistent iconography
- **Build Output**: Static files served from the `dist` directory

### Backend Architecture
- **Server Framework**: Express.js running on Node.js with ES modules
- **API Design**: RESTful API with a single registration endpoint (`/api/register`)
- **Static File Serving**: Express serves the built React application and handles fallback routing for client-side navigation
- **CORS Configuration**: Enabled for cross-origin requests during development

### Data Storage
- **Database**: Replit Database service for simple key-value storage
- **Data Model**: Users stored with email as the primary key and name/email as stored values
- **Validation**: Basic duplicate email checking before registration

### Development Configuration
- **Build Tool**: Vite with React plugin for fast development and optimized production builds
- **CSS Processing**: PostCSS with Tailwind CSS and Autoprefixer for cross-browser compatibility
- **Hot Module Replacement**: Configured for Replit's WebSocket-based HMR with HTTPS proxy support
- **Host Configuration**: Configured to work with Replit's hosting environment using environment variables

## External Dependencies

### Core Runtime Dependencies
- **React Ecosystem**: React 18.3.1 and React DOM for the frontend framework
- **Express.js**: Web server framework for the backend API
- **React Router DOM**: Client-side routing solution
- **CORS**: Cross-origin resource sharing middleware for Express

### Replit Integration
- **@replit/database**: Official Replit database client for data persistence
- **replit**: Core Replit integration package

### Development Tools
- **Vite**: Build tool and development server with React plugin support
- **Tailwind CSS**: Utility-first CSS framework with PostCSS and Autoprefixer
- **Heroicons**: SVG icon library specifically designed for React

### Deployment Configuration
- **Production Server**: Express serves static files from Vite build output
- **Environment Variables**: Uses Replit-specific environment variables for domain configuration
- **Port Configuration**: Configured for Replit's port requirements (5000 for dev, 3002 for production)