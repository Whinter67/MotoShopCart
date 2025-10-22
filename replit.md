# Yamaha Parts E-commerce

## Overview
Modern e-commerce web application for selling original Yamaha motorcycle parts. Built with React (Vite) frontend and Express backend, featuring user authentication, product catalog, and shopping cart functionality.

## Recent Changes
- **2025-10-22**: Initial project setup with complete frontend implementation
  - Created authentication system with Replit Auth (Google, GitHub, email/password)
  - Implemented three main pages: Home, Shop, Cart
  - Added product catalog with filtering and search
  - Built responsive Navbar with cart badge
  - Integrated PostgreSQL database for persistence

## Project Architecture

### Frontend (React + Vite)
- **Pages**:
  - `Landing.tsx` - Public landing page for non-authenticated users with hero section
  - `Home.tsx` - Authenticated home page with featured products and categories
  - `Shop.tsx` - Product catalog with search, filters, and sorting
  - `Cart.tsx` - Shopping cart management with quantity controls and order summary

- **Components**:
  - `Navbar.tsx` - Navigation bar with auth status, cart badge, and user menu
  - `ProductCard.tsx` - Reusable product card with image, price, stock status, and add-to-cart

- **Hooks**:
  - `useAuth.ts` - Authentication state management via Replit Auth

### Backend (Express + PostgreSQL)
- **Database Tables**:
  - `users` - User accounts (Replit Auth integration)
  - `sessions` - Session storage (required for Replit Auth)
  - `products` - Yamaha motorcycle parts catalog
  - `cart_items` - User shopping cart items

- **API Endpoints** (to be implemented in Task 2):
  - `GET /api/products` - Fetch all products with optional filters
  - `GET /api/products/:id` - Get single product details
  - `GET /api/cart` - Get user's cart items (protected)
  - `POST /api/cart` - Add item to cart (protected)
  - `PATCH /api/cart/:id` - Update cart item quantity (protected)
  - `DELETE /api/cart/:id` - Remove item from cart (protected)
  - `GET /api/auth/user` - Get authenticated user info (protected)

## Design System

### Colors
- **Primary**: Yamaha Racing Blue (214 100% 45% in dark mode, 214 100% 42% in light mode)
- **Background**: Deep charcoal (220 15% 10%) in dark mode, clean white (0 0% 98%) in light mode
- **Surface/Cards**: Elevated surfaces with subtle contrast

### Typography
- **Font Family**: Inter (all weights 400-800)
- **Usage**: Professional, technical precision for motorsport aesthetic

### Key Design Elements
- Racing-inspired aesthetic with performance focus
- Hero sections with dramatic motorcycle imagery and dark overlay
- Product cards with stock badges and part numbers
- Responsive grid layouts (4→2→1 columns on desktop→tablet→mobile)
- Smooth hover interactions and transitions

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express, Node.js, TypeScript
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **State Management**: TanStack Query v5
- **Routing**: Wouter

## Development Workflow

### Running the Application
```bash
npm run dev
```
This starts both the Express backend and Vite frontend on the same port.

### Database Migrations
```bash
npm run db:push
```
Push schema changes to the database (no manual SQL migrations needed).

## User Preferences
- Language: Italian (UI text in Italian)
- Design: Modern, professional, racing-inspired aesthetic
- Features: Authentication, product browsing, shopping cart
- Data: Realistic Yamaha motorcycle parts with accurate part numbers and pricing

## Next Steps (Task 2 & 3)
1. Implement backend API endpoints and database storage
2. Seed database with Yamaha parts data
3. Connect frontend to backend APIs
4. Add error handling and loading states
5. Test complete user journeys
6. Deploy application
