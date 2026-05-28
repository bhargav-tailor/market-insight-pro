import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { SidebarComponent } from './components/sidebar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  template: `
    <div class="layout-container">
      <app-navbar (toggleSidebar)="toggleSidebar()"></app-navbar>
      <div class="layout-body">
        <app-sidebar [isCollapsed]="sidebarCollapsed()" (logout)="handleLogout()"></app-sidebar>
        <main class="content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100%;
    }

    .layout-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 24px;
      background-color: #f9fafb;
    }

    @media (max-width: 768px) {
      .content {
        padding: 16px;
      }
    }
  `]
})
export class LayoutComponent {
  sidebarCollapsed = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update(v => !v);
  }

  handleLogout(): void {
    // Handled by sidebar component emitting to the main app
  }
}
