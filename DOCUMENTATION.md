# Market Insight Pro - Stock Market Analytics Platform

A production-ready Angular 21 application for real-time stock market analytics with a modern UI built using Angular Material.

## 🎯 Project Overview

Market Insight Pro is a comprehensive stock market dashboard application featuring:

- **Real-time Market Data**: Live stock prices, indices, and market trends
- **Technical Analysis**: Option chains, heatmaps, and sector-wise analysis
- **User Authentication**: Secure login with OTP verification
- **Subscription Management**: Multiple package options and checkout flow
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 📋 Features

### Authentication & Access Control
- Login with email/password
- User registration with OTP verification
- Package subscription system (Free, 3 Months, Premium Diamond)
- JWT-based authentication with guards

### Dashboard & Analytics
1. **Dashboard** - Real-time market metrics with sparkline charts
2. **Pre-Open Market** - Pre-opening session data with filtering
3. **Option Chain** - Professional NSE-style options data visualization
4. **HEATMAP** - Sector-wise performance visualization with color coding
5. **Top Gainers & Losers** - Dual-tab layout for market movers
6. **Open Interest** - Derivatives analytics with build-up indicators
7. **Sector Wise Stocks** - Sector selection with top 10 stocks analysis

### UI/UX Components
- Responsive navbar with search and notifications
- Collapsible sidebar with navigation
- Material Design components
- Glassmorphism login/signup cards
- Professional data tables with sorting and pagination
- Summary cards with sparkline data

## 🏗️ Project Structure

```
src/app/
├── core/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── market-data.service.ts
│   │   ├── storage.service.ts
│   │   └── index.ts
│   ├── guards/
│   │   ├── auth.guard.ts
│   │   └── index.ts
│   └── interceptors/
├── shared/
│   ├── components/
│   │   ├── button.component.ts
│   │   ├── card.component.ts
│   │   ├── search-bar.component.ts
│   │   ├── summary-card.component.ts
│   │   └── index.ts
│   ├── directives/
│   └── pipes/
├── layout/
│   ├── components/
│   │   ├── navbar.component.ts
│   │   ├── sidebar.component.ts
│   │   └── index.ts
│   └── layout.component.ts
├── features/
│   ├── auth/
│   │   ├── login.component.ts
│   │   ├── signup.component.ts
│   │   ├── packages.component.ts
│   │   └── index.ts
│   ├── dashboard/
│   ├── pre-open/
│   ├── option-chain/
│   ├── heatmap/
│   ├── gainers-losers/
│   ├── open-interest/
│   └── sector-stocks/
├── models/
│   ├── auth.model.ts
│   ├── market.model.ts
│   └── index.ts
├── app.ts (Root component)
├── app.routes.ts (Routing configuration)
└── app.config.ts (Application configuration)

src/assets/
├── styles/
│   ├── variables.scss (Design tokens)
│   └── global.scss (Global styles)
└── icons/
```

## 🛠️ Tech Stack

- **Angular**: 21.2.0 (Latest)
- **TypeScript**: 5.9.2
- **Angular Material**: 21.2.0
- **RxJS**: 7.8.0
- **SCSS**: For styling
- **Standalone Components**: Modern Angular architecture

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm 11+
- Angular CLI 21+

### Installation Steps

```bash
# Navigate to project directory
cd important-things

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200`

### Build for Production

```bash
# Build the application
npm run build

# Output will be in dist/
```

## 🔐 Authentication Flow

### Login Page
- Email/Password authentication
- "Remember me" checkbox
- "Forgot Password?" link
- Quick links to signup and packages

### Signup with OTP
- Multi-step form (Registration → OTP Verification)
- First Name, Last Name, Phone, Email
- OTP sent to registered email
- Automatic redirect to dashboard after verification

### Package Selection
- Two subscription tiers: Basic (3 Months) and Premium (Diamond)
- Checkout form collection
- Multi-payment method support (UPI/Card)
- Mock payment processing

**Default Credentials for Testing:**
```
Email: test@example.com
Password: password123
OTP: 123456
```

## 🎨 Design System

### Color Palette
- **Primary**: #1e40af (Navy Blue)
- **Accent**: #10b981 (Emerald Green)
- **Gold**: #f59e0b
- **Success**: #22c55e (Green)
- **Danger**: #ef4444 (Red)
- **Neutral**: #1f2937 to #f3f4f6

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva
- **Sizes**: xs(12px) → 3xl(28px)
- **Weights**: Light(300) → Bold(700)

### Spacing
- **Units**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px

### Border Radius
- **Small**: 4px
- **Medium**: 8px
- **Large**: 12px
- **XL**: 16px

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components adapt layout and styling based on screen size.

## 🔄 Routing Structure

```
/ → auth/login (default route)

/auth
  ├── login
  ├── signup
  └── packages

/app (Protected by AuthGuard)
  ├── dashboard
  ├── pre-open
  ├── option-chain
  ├── heatmap
  ├── gainers-losers
  ├── open-interest
  └── sector-stocks
```

## 🧩 Key Components

### Shared Components
- **ButtonComponent**: Customizable button with variants
- **CardComponent**: Reusable card layout
- **SearchBarComponent**: Material-based search input
- **SummaryCardComponent**: Data metric cards

### Layout Components
- **NavbarComponent**: Top navigation with search and user menu
- **SidebarComponent**: Collapsible navigation sidebar
- **LayoutComponent**: Main layout wrapper

### Page Components
- All feature components are standalone
- Use reactive forms for user input
- Implement proper error handling
- Real-time data loading with mock API

## 📊 Data Models

### User
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  subscription?: SubscriptionTier;
}
```

### Stock
```typescript
interface Stock {
  id: string;
  symbol: string;
  name: string;
  ltp: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
}
```

### Market Index
```typescript
interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  sparklineData?: number[];
}
```

## 🔗 Services

### AuthService
- User login/signup
- OTP request and verification
- Token management
- User state management

### MarketDataService
- Real-time market indices
- Stock data fetching
- Pre-open data
- Option chain data
- Sector and heatmap data

### StorageService
- LocalStorage abstraction
- Type-safe item storage/retrieval
- Cache management

## 🧪 Mock API

All API calls are mocked with realistic data:

- Random stock prices and movements
- Dynamic market indices
- Realistic option chain data
- Sector-wise stock distributions

Replace mock services with actual HTTP calls as needed.

## 🚀 Deployment

### Build Optimization
```bash
npm run build -- --configuration production
```

### Deployment Options
- **Firebase Hosting**: Easy Angular deployment
- **Netlify**: Automatic builds from Git
- **Vercel**: Serverless deployment
- **Traditional Hosting**: Copy dist/ contents to web server

## 📚 Code Quality

### Angular Best Practices Implemented
- ✅ Standalone components
- ✅ OnPush change detection strategy
- ✅ Reactive forms
- ✅ RxJS operators (takeUntil for unsubscribes)
- ✅ Type-safe TypeScript
- ✅ Lazy loading routes
- ✅ Route guards for protection
- ✅ SCSS modularity
- ✅ Clean code structure

## 🔧 Development Guidelines

### Adding New Routes
1. Create component in `/features/{feature}/`
2. Add route in `app.routes.ts`
3. Add sidebar menu item in `sidebar.component.ts`
4. Use AuthGuard for protected routes

### Adding New Services
1. Create service in `/core/services/`
2. Provide in root with `providedIn: 'root'`
3. Export from `index.ts`

### Adding New Shared Components
1. Create in `/shared/components/`
2. Make standalone
3. Export from `index.ts`

## 🎯 Performance Considerations

- Lazy loading for all feature modules
- OnPush change detection
- Proper unsubscription with takeUntil
- Optimize re-renders with trackBy functions
- Tree-shaking with standalone components

## 📝 Environment Variables

Create `.env` file for configuration:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
```

## 🤝 Contributing

1. Follow Angular style guide
2. Use TypeScript strict mode
3. Write clean, documented code
4. Test components locally
5. Commit with meaningful messages

## 📄 License

This project is provided as-is for educational and commercial use.

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review code comments
3. Inspect console for errors
4. Check Network tab for API calls

---

**Happy Trading! 📈**
