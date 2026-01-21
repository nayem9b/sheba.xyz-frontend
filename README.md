# Sheba.xyz - Professional Service Marketplace Platform

## Live Website

[Visit Sheba.xyz](https://shebaxyz.vercel.app/)

[Backend Repository](https://github.com/nayem9b/sheba.xyz-backend) , [DevOps Repository](https://github.com/nayem9b/sheba-CD)

## Testing Credentials

For demonstration purposes, use these super admin credentials:

- **Email:** admin@admin.com
- **Password:** adminVitamin

---
## Architecture

The platform follows a modern microservices architecture with a Next.js frontend and 3 backend microservices.

### Frontend

- **Framework**: Next.js 14+ with App Router, TypeScript, Tailwind CSS
- **Authentication**: Clerk integration for secure user management
- **State Management**: Redux Toolkit
- **UI Components**: Ant Design and custom Tailwind components
- **Responsive Design**: Mobile-first approach with responsive layouts

### Backend Microservices

- **Express Server**: Core backend service handling default business logic, service management, and booking operations
- **GraphQL Service**: Dedicated microservice for user authentication, profile management, and authorization
- **FastAPI Service**: Specialized microservice for payment processing and transaction handling

![System Architecture Diagram](https://i.imgur.com/2KC24bk.png)

## Database Schema

The database schema is designed to support the service marketplace functionality with entities for users, services, bookings, reviews, and administrative functions.

![ER Diagram](https://i.ibb.co/bQbtt7d/ER-Diagram.png)

## Application Screenshots
### Homepage

The main landing page of the application featuring service categories and featured offerings:

![Website Homepage](https://i.imgur.com/3zcGKTF.png)

### Service Page

The service browsing interface with search and filtering capabilities:

![Service Page](https://i.imgur.com/BuAcRlQ.png)

### Dashboard

The user dashboard showing booking history and account management:

![Dashboard](https://i.imgur.com/XBUW1U2.png)

### CI/CD Pipeline

The continuous integration and deployment pipeline automates the build, test, and deployment processes:

![CI/CD Pipeline](https://i.imgur.com/OIHKYpM.png)

### Dashboards

The platform includes comprehensive monitoring dashboards for operational visibility:

#### ArgoCD Dashboard

The ArgoCD dashboard provides deployment status and GitOps synchronization monitoring:

![ArgoCD Dashboard](https://i.imgur.com/f9VeFzs.png)

#### Backend Grafana Dashboard

The backend monitoring dashboard displays API performance metrics, resource utilization, and system health:

![Backend Grafana Dashboard 1](https://i.imgur.com/UEgnI4m.png)

![Backend Grafana Dashboard 2](https://i.imgur.com/lB2sKK1.png)

## Features

### User Experience

- Secure user authentication with email verification
- Comprehensive profile management system
- Advanced service search and filtering capabilities
- Intuitive booking system with real-time scheduling
- Rating and review system for services
- Personalized dashboard with booking history

### Service Management

- Dynamic service categorization system
- Location-based service discovery
- Advanced filtering by price, category, and availability
- Service detail pages with comprehensive information

### Administrative Capabilities

- Multi-tier admin system (Super Admin, Admin)
- Centralized dashboard for system oversight
- User account management
- Service listing administration
- Booking request processing and management
- Content management system

### Technical Features

- Responsive design for all device sizes
- Modern UI with Ant Design and Tailwind CSS
- Real-time booking status tracking
- Secure payment processing via Stripe
- Optimized performance with Next.js features

## Technology Stack

### Frontend

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **UI Library**: Ant Design (AntD), Custom Components
- **State Management**: Redux Toolkit
- **Authentication**: Clerk
- **Forms**: React Hook Form with Yup validation
- **Animations**: Framer Motion
- **Carousel**: Swiper

### Infrastructure

- **Deployment**: Vercel (Frontend), Render (Backend API)
- **Database**: PostgreSQL (Backend)
- **Payment Processing**: Stripe
- **Environment Management**: Dotenv

## Project Structure

```
app/
├── (withlayout)/          # Layout wrapper with common components
├── account/              # User account management
├── allcategories/        # Category browsing interface
├── allcontents/          # Content management section
├── allservices/          # Service listing pages
├── blog/                 # Blog and news section
├── category/             # Individual category pages
├── services/             # Service detail pages
├── sign-in/              # Authentication pages
├── sign-up/
├── favicon.ico
├── globals.css           # Global styles
├── layout.tsx            # Root layout
├── middleware.ts         # Next.js middleware
├── page.tsx              # Home page
└── Homepage.tsx          # Main homepage component
```

## Environment Variables

The application requires the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_BASE_URL=your_base_url
NEXTAUTH_URL=your_nextauth_url
NEXTAUTH_SECRET=your_nextauth_secret
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
SVIX_URL=your_svix_url
SVIX_API_KEY=your_svix_api_key
SVIX_WEBHOOK_SECRET=your_svix_webhook_secret
```

## Local Development Setup

### Quick Setup with Makefile (Recommended)

The project includes a Makefile for easy setup and management:

```bash
# Clone the repository
git clone <repository-url>
cd client

# Show available commandsj
make help

# Start development server
make dev

# Or use Docker for development
make docker-dev
```

### Manual Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd client
```

2. Install dependencies:

```bash
npm install
```

or

```bash
docker-compose up -d
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the required environment variables.

4. Run the development server:

```bash
npm run dev
```

5. Open your browser to [http://localhost:5000](http://localhost:5000) to view the application.

## Available Commands

### Makefile Commands

- `make help` - Show all available commands
- `make dev` - Start development server on port 5000
- `make build` - Build the application for production
- `make start` - Start the production server on port 5000
- `make docker-up` - Build and start production Docker containers
- `make docker-down` - Stop Docker containers
- `make docker-dev` - Start development Docker containers with hot-reloading
- `make docker-build` - Build Docker image only

### NPM Scripts

- `npm run dev` - Start the development server on port 5000
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
