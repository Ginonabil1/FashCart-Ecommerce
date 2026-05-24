# FashCart

FashCart is a modern ecommerce storefront built with Next.js, React, TypeScript, and Tailwind CSS. This repository contains only the client-facing shopping experience and is ready to run as a standalone project.

## Overview

The project focuses on the customer side of the store and includes:

- Home page with featured products
- Product listing with filtering, sorting, and search
- Product details with size and color selection
- Shopping cart and multi-step checkout flow
- Local sign up and sign in experience
- Customer profile with saved details
- Wishlist management
- Local order history for signed-in users

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- React Hook Form
- Zod
- React Toastify
- Lucide React

## Project Structure

```text
public/             # Static assets and product images
src/
  app/              # App Router pages
  components/       # Reusable UI and feature components
  context/          # Global app state for auth, cart, wishlist, and orders
  lib/              # Local product data and helpers
  types.ts          # Shared TypeScript types and validation schemas
package.json
README.md
```

## Key Features

### Product browsing

Customers can browse products from the homepage or the dedicated products page. The storefront supports search, category filtering, sorting, color selection, size selection, and price filtering.

### Cart and checkout

The cart uses a step-based flow:

1. Review cart items
2. Enter shipping details
3. Complete payment details

The checkout flow is designed for demo purposes and does not connect to a real payment gateway.

### Local user accounts

Users can create an account, sign in, update profile details, and view orders. Authentication is handled locally in the browser for demo and portfolio use.

### Wishlist and orders

Signed-in users can save products to a wishlist and review completed orders from the profile page.

## Data Handling

This project currently works without a backend.

- Product data is stored locally in `src/lib/products.ts`
- Cart data is stored in `localStorage`
- User accounts are stored in `localStorage`
- Wishlist data is stored in `localStorage`
- Orders are stored in `localStorage`

Because of this, the project is best suited for learning, demos, UI showcases, or as a frontend starter before integrating a real API and database.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Open the app

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

- Update the package name in `package.json` if you want a production-ready project identity
- Replace local demo storage with a backend service if you need real authentication, payments, or persistent orders
