# AdBoss Marketing Site

## Overview

AdBoss is a marketing website built as a single-page application using React and Vite. The project serves as a landing page with user registration functionality, designed to capture leads through a simple sign-up form. The application combines a modern React frontend with a lightweight Express.js backend, utilizing Replit's database service for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

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