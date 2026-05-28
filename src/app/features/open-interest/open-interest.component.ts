import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MarketDataService } from '../../core/services/market-data.service';
import { OpenInterestData } from '../../models';

@Component({
  selector: 'app-open-interest',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  template: `
    <div class="open-interest-container">
      <div class="page-header">
        <h1>Change in Open Interest</h1>
        <p>Derivatives Analytics & Indicators</p>
      </div>

      <div class="table-container">
        <table mat-table [dataSource]="openInterestData" class="data-table">
          <!-- Symbol Column -->
          <ng-container matColumnDef="symbol">
            <th mat-header-cell *matHeaderCellDef>Stock Symbol</th>
            <td mat-cell *matCellDef="let element">
              <span class="symbol-badge">{{ element.symbol }}</span>
            </td>
          </ng-container>

          <!-- Future LTP Column -->
          <ng-container matColumnDef="futureLtp">
            <th mat-header-cell *matHeaderCellDef>Future LTP</th>
            <td mat-cell *matCellDef="let element">₹{{ element.futureLtp | number: '1.2-2' }}</td>
          </ng-container>

          <!-- Total OI Column -->
          <ng-container matColumnDef="totalOi">
            <th mat-header-cell *matHeaderCellDef>Total OI</th>
            <td mat-cell *matCellDef="let element">{{ element.totalOi / 1000000 | number: '1.1-1' }}M</td>
          </ng-container>

          <!-- Change OI Column -->
          <ng-container matColumnDef="changeOi">
            <th mat-header-cell *matHeaderCellDef>Change in OI (Absolute)</th>
            <td mat-cell *matCellDef="let element">{{ element.changeOi / 1000000 | number: '1.1-1' }}M</td>
          </ng-container>

          <!-- % Change OI Column -->
          <ng-container matColumnDef="percentChangeOi">
            <th mat-header-cell *matHeaderCellDef>% Change in OI</th>
            <td
              mat-cell
              *matCellDef="let element"
              [ngClass]="element.percentChangeOi >= 0 ? 'text-success' : 'text-danger'"
            >
              <strong>{{ element.percentChangeOi >= 0 ? '+' : '' }}{{ element.percentChangeOi | number: '1.2-2' }}%</strong>
            </td>
          </ng-container>

          <!-- Indicator Column -->
          <ng-container matColumnDef="indicator">
            <th mat-header-cell *matHeaderCellDef>Build-up Indicator</th>
            <td mat-cell *matCellDef="let element">
              <span [ngClass]="'indicator-badge ' + getIndicatorClass(element.indicator)">
                {{ getIndicatorLabel(element.indicator) }}
              </span>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .open-interest-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-header {
      h1 {
        font-size: 28px;
        font-weight: 700;
        color: #1f2937;
        margin: 0 0 4px 0;
      }

      p {
        font-size: 14px;
        color: #6b7280;
        margin: 0;
      }
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow-x: auto;
    }

    .data-table {
      width: 100%;

      th {
        background-color: #f3f4f6;
        font-weight: 600;
        color: #1f2937;
        padding: 16px;
        border-bottom: 2px solid #e5e7eb;
        text-align: left;
      }

      td {
        padding: 16px;
        color: #6b7280;
        border-bottom: 1px solid #e5e7eb;
      }

      tr:hover {
        background-color: #f9fafb;
      }
    }

    .symbol-badge {
      background-color: #1e40af;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .text-success {
      color: #10b981;
    }

    .text-danger {
      color: #ef4444;
    }

    .indicator-badge {
      display: inline-block;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: capitalize;
      white-space: nowrap;

      &.long-buildup {
        background-color: #d1fae5;
        color: #065f46;
      }

      &.short-covering {
        background-color: #dbeafe;
        color: #0c2d6b;
      }

      &.long-unwinding {
        background-color: #fed7aa;
        color: #92400e;
      }

      &.short-buildup {
        background-color: #fee2e2;
        color: #7f1d1d;
      }
    }

    @media (max-width: 768px) {
      .data-table th, td {
        padding: 12px;
        font-size: 12px;
      }
    }
  `]
})
export class OpenInterestComponent implements OnInit {
  displayedColumns: string[] = [
    'symbol',
    'futureLtp',
    'totalOi',
    'changeOi',
    'percentChangeOi',
    'indicator'
  ];
  openInterestData: OpenInterestData[] = [];

  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    this.loadOpenInterestData();
  }

  private loadOpenInterestData(): void {
    this.marketDataService.getOpenInterestData().subscribe(data => {
      this.openInterestData = data;
    });
  }

  getIndicatorClass(indicator: string): string {
    return indicator.replace(/_/g, '-');
  }

  getIndicatorLabel(indicator: string): string {
    const labels: { [key: string]: string } = {
      long_buildup: 'Long Buildup',
      short_covering: 'Short Covering',
      long_unwinding: 'Long Unwinding',
      short_buildup: 'Short Buildup'
    };
    return labels[indicator] || indicator;
  }
}
