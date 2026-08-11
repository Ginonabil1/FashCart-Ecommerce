# FashCart MERN E-Commerce

FashCart is a full-stack e-commerce application built with React, Vite, Express, MongoDB, and JWT authentication. It includes a customer storefront, cart and checkout flow, user profiles, order history, and an admin dashboard for managing products.

## Project Structure

```text
.
├── frontend/   # React + Vite storefront
├── backend/    # Express + MongoDB REST API
└── package.json
```

## Features

- Responsive storefront homepage and product catalog.
- Product search, category filtering, color filtering, size filtering, and sorting.
- Product details page with color and size selection.
- Cart, checkout, and order creation flow.
- User signup, login, logout, and persisted JWT session.
- Profile page with saved user details and order history.
- Admin dashboard for adding, editing, deleting, and listing products.
- Admin order overview.
- Product images per color variant.
- Component/page-scoped CSS so changing one page style does not unexpectedly affect another page.

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Lucide React
- React Toastify
- CSS

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens
- bcrypt
- Payment integration structure for Stripe/Razorpay


## Getting Started

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure backend environment

Create `backend/.env`:

```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_long_random_secret
ADMIN_EMAIL=admin@fashcart.com
ADMIN_PASSWORD=admin12345
CLIENT_URL=http://localhost:5173
```

### 3. Configure frontend environment

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed products and admin user

```bash
npm run seed
```

Default seeded admin:

```text
Email: admin@fashcart.com
Password: admin12345
```

### 5. Run the backend

```bash
npm run dev:backend
```

The API runs on:

```text
http://localhost:5000
```

### 6. Run the frontend

Open another terminal:

```bash
npm run dev:frontend
```

The frontend runs on:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

The frontend production files are generated in:

```text
frontend/dist
```


## Available Scripts

From the root folder:

```bash
npm run install:all
npm run dev:backend
npm run dev:frontend
npm run seed
npm run build
```

## Notes

- The project is split into separate frontend and backend apps.
- The frontend API URL is controlled by `VITE_API_URL`.
- The backend allows requests from `CLIENT_URL` and local Vite development URLs.
- Image upload currently stores Base64 strings in MongoDB for simplicity.
- Production image upload should use Cloudinary/S3-style storage.
- Payment providers need real production keys before accepting live payments.
- Automated tests are not included yet.
