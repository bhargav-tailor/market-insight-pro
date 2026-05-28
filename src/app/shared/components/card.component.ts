import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardConfig {
  title?: string;
  subtitle?: string;
  icon?: string;
  actions?: { label: string; callback: () => void }[];
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-header" *ngIf="title || subtitle">
        <h3 class="card-title">{{ title }}</h3>
        <p class="card-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.3s ease-in-out;

      &:hover {
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }
    }

    .card-header {
      padding: 16px;
      border-bottom: 1px solid #e5e7eb;
    }

    .card-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #1f2937;
    }

    .card-subtitle {
      margin: 4px 0 0 0;
      font-size: 14px;
      color: #6b7280;
    }

    .card-body {
      padding: 16px;
    }
  `]
})
export class CardComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
}
