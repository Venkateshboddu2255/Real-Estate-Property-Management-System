# EstateHub - Real Estate Property Management System

A MERN stack college project for managing real estate listings, enquiries, property visits, favorites and basic administration.

## Tech Stack
- MongoDB
- Express.js
- React.js + Vite
- Node.js
- React Router

## Features
- Registration, login and logout
- Property CRUD
- Search and filters
- Property details
- Add property with owner association
- My Properties
- Favorites / wishlist
- Enquiries
- Property visit appointments
- Status management
- Admin dashboard and statistics
- Responsive UI

## Requirements
- Node.js 20.19+ recommended for current Vite tooling
- MongoDB running locally

## Run Backend
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```
On macOS/Linux use `cp .env.example .env` instead of `copy`.

## Run Frontend
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL shown in the terminal, normally http://localhost:5173.

## MongoDB
The default `.env.example` uses:
`mongodb://127.0.0.1:27017/real_estate_db`

## Admin Demo
Register a normal account, then change its MongoDB `role` field to `admin`. Log in again to see the Admin dashboard.

## Important
This version intentionally does not use JWT/session authorization middleware, matching the simplified college-project requirement. Role checks in the frontend are not production security.
