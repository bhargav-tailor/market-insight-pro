import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MarketDataService } from '../../core/services/market-data.service';
import { PreOpenStock } from '../../models';

@Component({
  selector: 'app-pre-open',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatChipsModule, MatIconModule, MatButtonModule],
  template: `
    <div class="pre-open-container">
      <div class="page-header">
        <h1>Pre-Open Market</h1>
      </div>

      <div class="filters">
        <button mat-button class="filter-chip" [ngClass]="{ active: selectedFilter === 'all' }" (click)="selectedFilter = 'all'">
          All
        </button>
        <button mat-button class="filter-chip" [ngClass]="{ active: selectedFilter === 'nifty50' }" (click)="selectedFilter = 'nifty50'">
          Nifty 50
        </button>
        <button mat-button class="filter-chip" [ngClass]="{ active: selectedFilter === 'banknifty' }" (click)="selectedFilter = 'banknifty'">
          Bank Nifty
        </button>
        <button mat-button class="filter-chip" [ngClass]="{ active: selectedFilter === 'fo' }" (click)="selectedFilter = 'fo'">
          F&O Stocks
        </button>
      </div>

      <div class="table-container">
        <table mat-table [dataSource]="preOpenData" class="data-table">
          <!-- Symbol -->
          <ng-container matColumnDef="symbol">
            <th mat-header-cell *matHeaderCellDef>Symbol</th>
            <td mat-cell *matCellDef="let element">
              <span class="symbol-badge">{{ element.symbol }}</span>
            </td>
          </ng-container>

          <!-- Pre-Open Price -->
          <ng-container matColumnDef="preOpenPrice">
            <th mat-header-cell *matHeaderCellDef>Pre-Open Price</th>
            <td mat-cell *matCellDef="let element">₹{{ element.preOpenPrice | number: '1.2-2' }}</td>
          </ng-container>

          <!-- Quantity -->
          <ng-container matColumnDef="quantity">
            <th mat-header-cell *matHeaderCellDef>Quantity</th>
            <td mat-cell *matCellDef="let element">{{ element.preOpenQuantity / 1000000 | number: '1.1-1' }}M</td>
          </ng-container>

          <!-- Change -->
          <ng-container matColumnDef="change">
            <th mat-header-cell *matHeaderCellDef>Change</th>
            <td
              mat-cell
              *matCellDef="let element"
              [ngClass]="element.preOpenChange >= 0 ? 'text-success' : 'text-danger'"
            >
              {{ element.preOpenChange >= 0 ? '+' : '' }}{{ element.preOpenChange | number: '1.2-2' }}
            </td>
          </ng-container>

          <!-- Change % -->
          <ng-container matColumnDef="changePercent">
            <th mat-header-cell *matHeaderCellDef>Change %</th>
            <td
              mat-cell
              *matCellDef="let element"
              [ngClass]="element.preOpenChangePercent >= 0 ? 'text-success' : 'text-danger'"
            >
              {{ element.preOpenChangePercent >= 0 ? '+' : '' }}{{ element.preOpenChangePercent | number: '1.2-2' }}%
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .pre-open-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .page-header {
      h1 {
        font-size: 28px;
        font-weight: 700;
        color: #1f2937;
        margin: 0;
      }
    }

    .filters {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .filter-chip {
      border: 2px solid #e5e7eb;
      border-radius: 24px;
      padding: 8px 16px;
      color: #6b7280;
      transition: all 0.3s ease-in-out;

      &:hover {
        border-color: #1e40af;
        color: #1e40af;
      }

      &.active {
        border-color: #1e40af;
        background-color: #1e40af;
        color: white;
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
      border-collapse: collapse;

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
      display: inline-block;
    }

    .text-success {
      color: #10b981;
      font-weight: 600;
    }

    .text-danger {
      color: #ef4444;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .filters {
        overflow-x: auto;
      }

      .data-table {
        th, td {
          padding: 12px;
          font-size: 12px;
        }
      }
    }
  `]
})
export class PreOpenComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'preOpenPrice', 'quantity', 'change', 'changePercent'];
  preOpenData: PreOpenStock[] = [];
  selectedFilter: string = 'all';

  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    this.loadPreOpenData();
  }

  private loadPreOpenData(): void {
    this.marketDataService.getPreOpenMarketData().subscribe(data => {
      this.preOpenData = data;
    });
  }
}
