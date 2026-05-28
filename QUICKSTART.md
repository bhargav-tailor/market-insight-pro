# Quick Start Guide - Market Insight Pro

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd important-things
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:4200`

### Step 3: Login
Use these test credentials:

| Field | Value |
|-------|-------|
| Email | test@example.com |
| Password | password123 |

### Step 4: Explore Features
After login, you'll see the dashboard with:
- Real-time market metrics
- Multiple analytics pages
- Interactive data tables
- Responsive navigation

---

## 📋 Available Routes

| Route | Description |
|-------|-------------|
| `/auth/login` | Login page |
| `/auth/signup` | Sign up with OTP |
| `/auth/packages` | Package selection & checkout |
| `/app/dashboard` | Main dashboard (requires login) |
| `/app/pre-open` | Pre-open market data |
| `/app/option-chain` | Option chain analysis |
| `/app/heatmap` | Market heatmap |
| `/app/gainers-losers` | Top gainers and losers |
| `/app/open-interest` | Open interest analytics |
| `/app/sector-stocks` | Sector-wise stock analysis |

---

## 🧪 Testing Scenarios

### OTP Verification
- Enter any email
- Use OTP: `123456`
- Complete registration

### Package Purchase
- Select any package
- Fill checkout form with any data
- Enter payment info (mock)
- Complete payment successfully

### Market Data
- All data is randomly generated for testing
- Real implementations should connect to actual APIs
- See `MarketDataService` for mock data structure

---

## 📁 Key Files to Modify

### Update API Endpoints
File: `src/app/core/services/market-data.service.ts`

Replace mock methods with actual HTTP calls:
```typescript
constructor(private http: HttpClient) {}

getMarketIndices(): Observable<MarketIndex[]> {
  return this.http.get<MarketIndex[]>('/api/market/indices');
}
```

### Add Real Authentication
File: `src/app/core/services/auth.service.ts`

Connect to your backend:
```typescript
login(request: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>('/api/auth/login', request);
}
```

### Customize Styling
File: `src/assets/styles/variables.scss`

Update color palette and spacing to match your brand.

---

## 🛠️ Common Tasks

### Add New Page
```bash
# 1. Create component directory
mkdir -p src/app/features/my-feature

# 2. Create component file
# Create src/app/features/my-feature/my-feature.component.ts

# 3. Add route in src/app/app.routes.ts
{
  path: 'my-feature',
  loadComponent: () => import('./features/my-feature/my-feature.component').then(m => m.MyFeatureComponent)
}

# 4. Add sidebar menu item
```

### Add New Service
```bash
# 1. Create service file
# src/app/core/services/my.service.ts

# 2. Export from index.ts
# Add to src/app/core/services/index.ts

# 3. Inject in component
constructor(private myService: MyService) {}
```

### Update Material Theme
Edit `src/styles.css`:
```css
@import '@angular/material/prebuilt-themes/your-theme.css';
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
ng serve --port 4201
```

### Clear Node Modules
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear build cache
rm -rf dist/
npm run build
```

### Type Errors
```bash
# Ensure strict mode is enabled
# TypeScript strict: true in tsconfig.json
```

---

## 📦 Production Build

```bash
# Build for production
npm run build

# Output in: dist/important-things/

# Deploy to hosting provider
# Example: Firebase
firebase deploy --only hosting
```

---

## 🔗 Useful Resources

- [Angular Docs](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS Docs](https://rxjs.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Ready to build amazing things! 🎉**
