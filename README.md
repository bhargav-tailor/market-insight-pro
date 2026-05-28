# Market Insight Pro - Stock Market Analytics Platform

A production-ready Angular 21 application for real-time stock market analytics with a modern UI built using Angular Material.

## 🎯 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 11+

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Application opens at http://localhost:4200
```

### Test Login
```
Email: test@example.com
Password: password123
```

## 📚 Documentation

- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Comprehensive project documentation
- **[QUICKSTART.md](./QUICKSTART.md)** - Quick reference guide
- **[SETUP_GUIDE.txt](../SETUP_GUIDE.txt)** - Feature overview

## ✨ Features

### 🔐 Authentication
- Secure login page with glassmorphism design
- OTP-based signup verification
- JWT token management
- Persistent session handling

### 📊 Dashboard
- Real-time market metrics (8 cards with sparklines)
- Nifty 50, Sensex, India VIX, FII/DII flow
- Sector performance table
- Top 20 high-movement stocks

### 📈 Analytics Pages
1. **Pre-Open Market** - Pre-opening session data with filters
2. **Option Chain** - NSE-style options data (Calls/Puts)
3. **HEATMAP** - Sector-wise market visualization
4. **Top Gainers & Losers** - Dual-tab comparison
5. **Open Interest** - Derivatives analytics
6. **Sector Wise Stocks** - Sector analysis with top 10 stocks

### 💳 Subscription
- Package selection (Basic & Premium)
- Multi-step checkout flow
- Payment method selection (UPI/Card)
- Order summary

## 🏗️ Architecture

### Standalone Components
All components are built using Angular 21's standalone architecture with:
- Lazy-loaded routes
- Standalone services with `providedIn: 'root'`
- OnPush change detection
- Proper memory management with RxJS

### Project Structure
```
src/app/
├── core/              # Services, Guards, Interceptors
├── shared/            # Reusable components
├── layout/            # Navbar, Sidebar
├── features/          # 11 Feature pages
├── models/            # TypeScript interfaces
├── app.routes.ts      # Routing configuration
└── app.config.ts      # App configuration
```

## 🛠️ Tech Stack

| Technology | Version |
|-----------|---------|
| Angular | 21.2.0 |
| TypeScript | 5.9.2 |
| Angular Material | 21.2.0 |
| RxJS | 7.8.0 |
| SCSS | Latest |

## 📱 Responsive Design

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

All components are fully responsive with adaptive layouts.

## 🎨 Design System

### Colors
- Primary: #1e40af (Navy Blue)
- Accent: #10b981 (Emerald Green)
- Gold: #f59e0b
- Success: #22c55e
- Danger: #ef4444

### Components
- 50+ Material components integrated
- Custom styled components
- Glassmorphism cards
- Professional data tables
- Animated transitions

## 🔄 Routing

```
/ → auth/login (default)

/auth
├── login      (Public)
├── signup     (Public)  
└── packages   (Public)

/app (Protected by AuthGuard)
├── dashboard
├── pre-open
├── option-chain
├── heatmap
├── gainers-losers
├── open-interest
└── sector-stocks
```

## 🧩 Reusable Components

### Shared Components
- **ButtonComponent** - Customizable button with variants
- **CardComponent** - Reusable card layout
- **SearchBarComponent** - Material search input
- **SummaryCardComponent** - Data metric cards

### Layout Components
- **NavbarComponent** - Top navigation
- **SidebarComponent** - Collapsible navigation
- **LayoutComponent** - Main layout wrapper

## 📊 Services

### AuthService
- User authentication
- OTP verification
- Token management
- User state management

### MarketDataService
- Real-time market indices
- Stock data
- Pre-open data
- Option chain data
- Sector data

### StorageService
- LocalStorage abstraction
- Type-safe storage

## 🚀 Build & Deploy

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Deployment Options
- Firebase Hosting
- Netlify
- Vercel
- Traditional web server

## 🧪 Mock API

All data is mocked for development:
- Realistic stock prices
- Dynamic market indices
- Random option chain data
- Sector-wise distributions

Replace with real APIs when ready.

## ✅ Production Checklist

- [ ] Replace mock services with real APIs
- [ ] Connect to authentication backend
- [ ] Configure real market data provider
- [ ] Customize branding and colors
- [ ] Add error handling
- [ ] Implement logging
- [ ] Add analytics
- [ ] Security audit
- [ ] Performance optimization
- [ ] Deploy to production

## 📚 Code Examples

### Login
```typescript
this.authService.login({
  email: 'user@example.com',
  password: 'password123'
}).subscribe(response => {
  this.router.navigate(['/app/dashboard']);
});
```

### Fetch Market Data
```typescript
this.marketDataService.getMarketIndices().subscribe(indices => {
  this.summaryMetrics = indices;
});
```

### Add New Route
```typescript
{
  path: 'my-page',
  loadComponent: () => 
    import('./features/my-page/my-page.component')
    .then(m => m.MyPageComponent),
  canActivate: [AuthGuard]
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
ng serve --port 4201
```

### Clear Cache
```bash
rm -rf node_modules dist
npm install
```

### Build Issues
```bash
npm run build -- --configuration production
```

## 📞 Support

For detailed information, see:
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Full documentation
- [QUICKSTART.md](./QUICKSTART.md) - Quick reference

## 📄 License

This project is provided as-is for educational and commercial use.

---

**Ready to build amazing stock market analytics? Let's go! 📈**

**Angular version:** 21.2.0

For more help, visit [Angular CLI Overview](https://angular.io/cli).

```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
