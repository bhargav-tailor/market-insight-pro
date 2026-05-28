import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/auth/signup.component').then(m => m.SignupComponent)
      },
      {
        path: 'packages',
        loadComponent: () => import('./features/auth/packages.component').then(m => m.PackagesComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'pre-open',
        loadComponent: () => import('./features/pre-open/pre-open.component').then(m => m.PreOpenComponent)
      },
      {
        path: 'option-chain',
        loadComponent: () => import('./features/option-chain/option-chain.component').then(m => m.OptionChainComponent)
      },
      {
        path: 'heatmap',
        loadComponent: () => import('./features/heatmap/heatmap.component').then(m => m.HeatmapComponent)
      },
      {
        path: 'gainers-losers',
        loadComponent: () => import('./features/gainers-losers/gainers-losers.component').then(m => m.GainersLosersComponent)
      },
      {
        path: 'open-interest',
        loadComponent: () => import('./features/open-interest/open-interest.component').then(m => m.OpenInterestComponent)
      },
      {
        path: 'sector-stocks',
        loadComponent: () => import('./features/sector-stocks/sector-stocks.component').then(m => m.SectorStocksComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
