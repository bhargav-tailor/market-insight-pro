import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

interface SidebarItem {
  label: string;
  icon: string;
  route: string;
  children?: SidebarItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  template: `
    <div class="sidebar" [ngClass]="{ collapsed: isCollapsed }">
      <div class="sidebar-content">
        <nav class="nav-menu">
          <div class="menu-section" *ngFor="let section of menuItems; let last = last">
            <a
              *ngFor="let item of section"
              [routerLink]="item.route"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: false }"
              class="menu-item"
            >
              <mat-icon class="menu-icon">{{ item.icon }}</mat-icon>
              <span class="menu-label" *ngIf="!isCollapsed">{{ item.label }}</span>
            </a>
          </div>
        </nav>

        <div class="sidebar-footer">
          <button mat-button class="logout-btn" (click)="onLogout()">
            <mat-icon>logout</mat-icon>
            <span *ngIf="!isCollapsed">Logout</span>
          </button>
        </div>
      </div>

      <button
        class="sidebar-toggle"
        mat-icon-button
        (click)="toggleCollapse()"
        *ngIf="!isCollapsed"
      >
        <mat-icon>chevron_left</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      background: #1f2937;
      color: white;
      display: flex;
      flex-direction: column;
      height: 100vh;
      transition: all 0.3s ease-in-out;
      position: relative;

      &.collapsed {
        width: 80px;

        .menu-label {
          display: none;
        }

        .menu-icon {
          margin-right: 0;
        }
      }
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px 0;
      display: flex;
      flex-direction: column;
    }

    .nav-menu {
      flex: 1;
    }

    .menu-section {
      padding: 0;
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: #d1d5db;
      text-decoration: none;
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
      }

      &.active {
        background-color: #1e40af;
        color: white;
        border-left: 4px solid #3b82f6;
        padding-left: 12px;
      }
    }

    .menu-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-label {
      font-size: 14px;
      font-weight: 500;
      white-space: nowrap;
    }

    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logout-btn {
      width: 100%;
      color: #d1d5db;
      justify-content: flex-start;
      gap: 12px;

      &:hover {
        color: #ef4444;
        background-color: rgba(239, 68, 68, 0.1);
      }
    }

    .sidebar-toggle {
      position: absolute;
      right: -12px;
      top: 50%;
      transform: translateY(-50%);
      background: white;
      color: #1f2937;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

      &:hover {
        background: #f3f4f6;
      }
    }

    @media (max-width: 768px) {
      .sidebar {
        position: absolute;
        z-index: 1000;
        left: 0;
        top: 0;
        height: calc(100vh - 64px);
        box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
      }
    }
  `]
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;
  @Output() logout = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  menuItems = [
    [
      { label: 'Dashboard', icon: 'dashboard', route: '/app/dashboard' },
      { label: 'Pre-Open Market', icon: 'schedule', route: '/app/pre-open' },
      { label: 'Option Chain', icon: 'assessment', route: '/app/option-chain' },
      { label: 'HEATMAP', icon: 'apps', route: '/app/heatmap' },
      { label: 'Top Gainers & Losers', icon: 'trending_up', route: '/app/gainers-losers' },
      { label: 'Change in Open Interest', icon: 'show_chart', route: '/app/open-interest' },
      { label: 'Sector Wise Stocks', icon: 'category', route: '/app/sector-stocks' }
    ]
  ];

  constructor(private router: Router) {}

  toggleCollapse(): void {
    this.toggleCollapsed.emit();
  }

  onLogout(): void {
    this.logout.emit();
  }
}
