import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SummaryCardData {
  title: string;
  value: string | number;
  change: number;
  changePercent: number;
  unit?: string;
  icon?: string;
  sparklineData?: number[];
}

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-card">
      <div class="card-header">
        <span class="title">{{ data.title }}</span>
      </div>
      <div class="card-content">
        <div class="value-section">
          <span class="value">{{ data.value }}</span>
          <span class="unit" *ngIf="data.unit">{{ data.unit }}</span>
        </div>
        <div class="change-section" [ngClass]="data.change >= 0 ? 'positive' : 'negative'">
          <span class="change-value">
            {{ data.change >= 0 ? '+' : '' }}{{ data.change | number: '1.2-2' }}
          </span>
          <span class="change-percent">
            ({{ data.changePercent >= 0 ? '+' : '' }}{{ data.changePercent | number: '1.2-2' }}%)
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .summary-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease-in-out;

      &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }

    .card-header {
      margin-bottom: 12px;
    }

    .title {
      font-size: 12px;
      color: #6b7280;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .value-section {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }

    .value {
      font-size: 24px;
      font-weight: 700;
      color: #1f2937;
    }

    .unit {
      font-size: 12px;
      color: #6b7280;
      margin-left: 4px;
    }

    .change-section {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;

      &.positive {
        color: #10b981;
      }

      &.negative {
        color: #ef4444;
      }
    }

    .change-value {
      font-weight: 600;
    }

    .change-percent {
      font-weight: 500;
      opacity: 0.8;
    }
  `]
})
export class SummaryCardComponent {
  @Input() data!: SummaryCardData;
}
