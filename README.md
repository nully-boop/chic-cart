# Chic Cart

An elegant e-commerce shopping cart application with a customer storefront and comprehensive admin dashboard for managing products, orders, and analytics.

## Features

### Customer Storefront
- Browse and search products
- Add items to shopping cart
- Secure checkout experience
- Multi-language support

### Admin Dashboard
- Secure admin authentication
- Product management (create, edit, delete)
- Order tracking and management
- Sales analytics and insights
- Inventory overview

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone https://github.com/nully-boop/chic-cart.git

# Step 2: Navigate to the project directory
cd chic-cart

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Technologies

This project is built with:

- **Vite** - Fast build tool and dev server
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **React Router** - Client-side routing
- **shadcn-ui** - High-quality React components
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Efficient form handling
- **TanStack React Query** - Data fetching and caching
- **Supabase** - Backend and database
- **Recharts** - Data visualization
- **Radix UI** - Accessible component primitives

## Project Structure

```
src/
├── components/        # Reusable React components
├── pages/            # Page components (storefront, admin, auth)
├── contexts/         # React contexts (Cart, Language, Admin Auth)
├── hooks/            # Custom React hooks
├── integrations/     # External service integrations
├── types/            # TypeScript type definitions
└── lib/              # Utility functions
```

## License

This project is private and proprietary.
