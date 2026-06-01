# HazHzel E-Commerce Platform

A full-stack e-commerce platform built with modern technologies.

This is an **MVP (Minimum Viable Product)** in the initial phases of development. While core functionality is implemented, several features are incomplete or still under development:

### ✅ Implemented Features

- **User authentication and authorization**
  - Secure login/registration with NextAuth.js
  - JWT-based session management
  - Role-based access control (User, Admin)
- **Product catalog and browsing**
  - Dynamic product listing with filtering and sorting
  - Detailed product information and image galleries
  - Category and collection organization
- **Advanced product search with autocomplete**
  - Debounce mechanism (0.5s delay) to optimize resource usage
  - Real-time autocomplete suggestions as users type
  - Smart matching - type "n" to see suggestions like "Nike", "Ananas", etc.
  - Character highlighting - matching characters are highlighted in results
- **Product variants management**
  - Support for multiple variants per product (size, color, specifications, etc.)
  - Smart pricing display - automatically shows the lowest-priced variant for each product
  - Variant filtering and selection during checkout
- **Shopping cart functionality**
  - Add/remove/update product quantities
  - Persistent cart state management
  - Cart summary and checkout flow
- **Order placement (basic)**
  - Order creation and confirmation
- **User account management**
  - User profile management
  - Address management for shipping
  - Order history and tracking
- **Inventory management**
  - Stock tracking for products and variants
  - Inventory level monitoring
- **Supplier management**
  - Multi-supplier support for product sourcing
  - Supplier information and contact management
  - Supplier product association and pricing
- **Responsive design**
  - Mobile-first responsive layout

### 🚧 In Development / Incomplete Features

- **Payment Filter** - Payment methods and filtering options are not yet fully implemented
- **Admin Dashboard** - Currently lacking comprehensive management interfaces
- **Order Management** - Only core order functionality is available; advanced management features (tracking, cancellations, refunds) are not fully implemented
- **Advanced Analytics** - Admin analytics and reporting features
- **Discount & Coupon System** - Promotion management features

## 📋 Tech Stack

### Frontend

- **Framework:** Next.js 15+ with TypeScript
- **Styling:** SCSS with modular architecture
- **Authentication:** NextAuth.js
- **State Management:** React Context API, Zustand
- **HTTP Client:** Axios
- **UI Components:** Custom components + responsive design

### Backend

- **Framework:** NestJS with TypeScript
- **Database:** MongoDB
- **Authentication:** JWT with Guards & Strategies
- **File Upload:** Cloudinary integration
- **API:** RESTful API with modular architecture

### DevOps

- **Containerization:** Docker & Docker Compose
- **Environment:** Node.js based containers

## 🏗️ Project Structure

```
HazHzel-Ecommerce/
├── HazHzel_App/              # Next.js Frontend Application
│   ├── src/
│   │   ├── app/              # App Router pages and layouts
│   │   ├── components/       # React components
│   │   ├── services/         # API service layer
│   │   ├── types/            # TypeScript type definitions
│   │   ├── utils/            # Utility functions & hooks
│   │   ├── scss/             # Styling (SCSS modules)
│   │   └── library/          # Context providers & stores
│   └── public/               # Static assets
│
├── HazHzel_Server/           # NestJS Backend Application
│   ├── src/
│   │   ├── auth/             # Authentication module
│   │   ├── modules/          # Feature modules (products, orders, etc.)
│   │   ├── shared/           # Shared utilities and constants
│   │   └── main.ts           # Application entry point
│   └── test/                 # E2E tests
│
└── docker-compose.yml        # Docker Compose configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Docker and Docker Compose (for containerized setup)

### Installation & Setup

1. **Clone the repository**
   git clone <repository-url>
   cd HazHzel-Ecommerce

2. **Frontend Setup**
   cd HazHzel_App
   npm install

   # Create .env.local file with required environment variables

   npm run dev

3. **Backend Setup**
   cd HazHzel_Server
   npm install

   # Create .env file with required environment variables

   npm run start:dev

4. **Using Docker Compose**
   docker-compose up -d

## 📝 Available Scripts

### Frontend (HazHzel_App)

npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server
npm run lint # Run linter

### Backend (HazHzel_Server)

npm run start # Run application
npm run start:dev # Run in development mode with hot reload
npm run build # Build application

## 🔑 Environment Variables

### Frontend (.env.local)

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - NextAuth callback URL

### Backend (.env)

- Database connection variables
- JWT secrets
- Cloudinary API credentials
- Email/Mail service configuration

**Note:** This README will be updated as the project progresses. Check back for the latest information on feature completion and roadmap updates.
