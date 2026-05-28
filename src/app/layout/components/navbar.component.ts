import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  template: `
    <mat-toolbar class="navbar">
      <div class="navbar-container">
        <div class="navbar-left">
          <button mat-icon-button (click)="toggleSidebar.emit()" class="menu-toggle">
            <mat-icon>menu</mat-icon>
          </button>
          <span class="logo">Market Insight Pro</span>
        </div>

        <div class="navbar-right">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search stocks...</mat-label>
            <input matInput placeholder="Search by symbol or company name" />
            <button mat-icon-button matSuffix>
              <mat-icon>search</mat-icon>
            </button>
          </mat-form-field>
        </div>

        <div class="navbar-right">
          <button mat-icon-button matBadge="3" matBadgeColor="warn" class="notification-btn">
            <mat-icon>notifications</mat-icon>
          </button>

          <button mat-icon-button [matMenuTriggerFor]="userMenu" class="profile-btn">
            <mat-icon>account_circle</mat-icon>
          </button>

          <mat-menu #userMenu="matMenu">
            <button mat-menu-item disabled>
              <span>{{ userEmail }}</span>
            </button>
<!--            <mat-divider></mat-divider>-->
            <button mat-menu-item>
              <mat-icon>person</mat-icon>
              <span>Profile</span>
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Settings</span>
            </button>
<!--            <mat-divider></mat-divider>-->
            <button mat-menu-item (click)="logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .navbar-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      height: 64px;
      max-width: 100%;
      width: 100%;
    }

    .navbar-left {
      display: flex;
      align-items: center;
      gap: 16px;
      min-width: 250px;
    }

    .logo {
      font-size: 18px;
      font-weight: 700;
      color: #1e40af;
      white-space: nowrap;
    }

    .navbar-center {
      flex: 1;
      margin: 0 32px;
      max-width: 400px;
    }

    .search-field {
      width: 100%;
    }

    .navbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .menu-toggle,
    .notification-btn,
    .profile-btn {
      color: #1f2937;
    }

    @media (max-width: 768px) {
      .navbar-center {
        display: none;
      }

      .navbar-left {
        min-width: auto;
      }

      .logo {
        font-size: 14px;
      }

      .navbar-container {
        padding: 0 8px;
      }
    }
  `]
})
export class NavbarComponent implements OnDestroy {
  @Output() toggleSidebar = new EventEmitter<void>();

  userEmail: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.auth$.pipe(takeUntil(this.destroy$)).subscribe(user => {
      this.userEmail = user?.email || 'User';
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
