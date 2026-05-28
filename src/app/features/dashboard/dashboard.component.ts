import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SummaryCardComponent, SummaryCardData } from '../../shared/components/summary-card.component';
import { MarketDataService } from '../../core/services/market-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Stock, MarketIndex } from '../../models';
import {NumberPipe} from '../../pipes/datapipes';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    SummaryCardComponent,
    NumberPipe
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p class="date-text">Today's Date: {{ getCurrentDate() }}</p>
      </div>

      <!-- Market Metrics Row -->
      <div class="metrics-grid">
        <app-summary-card *ngFor="let metric of summaryMetrics" [data]="metric"></app-summary-card>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- Sector Performance Table -->
        <div class="table-section">
          <h2>Sector Performance</h2>
          <table mat-table [dataSource]="sectorData" class="data-table">
            <!-- Sector Column -->
            <ng-container matColumnDef="sector">
              <th mat-header-cell *matHeaderCellDef>Sector</th>
              <td mat-cell *matCellDef="let element">{{ element.symbol }}</td>
            </ng-container>

            <!-- LTP Column -->
            <ng-container matColumnDef="ltp">
              <th mat-header-cell *matHeaderCellDef>LTP</th>
              <td mat-cell *matCellDef="let element">₹{{ element.ltp | number: '1.2-2' }}</td>
            </ng-container>

            <!-- Change Column -->
            <ng-container matColumnDef="change">
              <th mat-header-cell *matHeaderCellDef>Change</th>
              <td
                mat-cell
                *matCellDef="let element"
                [ngClass]="element.change >= 0 ? 'text-success' : 'text-danger'"
              >
                {{ element.change >= 0 ? '+' : '' }}{{ element.change | number: '1.2-2' }}
              </td>
            </ng-container>

            <!-- Change % Column -->
            <ng-container matColumnDef="changePercent">
              <th mat-header-cell *matHeaderCellDef>Change %</th>
              <td
                mat-cell
                *matCellDef="let element"
                [ngClass]="element.changePercent >= 0 ? 'text-success' : 'text-danger'"
              >
                {{ element.changePercent >= 0 ? '+' : '' }}{{ element.changePercent | number: '1.2-2' }}%
              </td>
            </ng-container>

            <!-- Volume Column -->
            <ng-container matColumnDef="volume">
              <th mat-header-cell *matHeaderCellDef>Volume</th>
              <td mat-cell *matCellDef="let element">
                {{ element.volume / 1000000 | number: '1.2-1' }}M
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="sectorColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: sectorColumns;"></tr>
          </table>
          <mat-paginator [pageSizeOptions]="[5, 10, 25]" showFirstLastButtons></mat-paginator>
        </div>

        <!-- Top 20 High-Movement Stocks -->
        <div class="table-section">
          <h2>Top 20 High-Movement Stocks</h2>
          <table mat-table [dataSource]="stockData" class="data-table">
            <!-- Symbol Column -->
            <ng-container matColumnDef="symbol">
              <th mat-header-cell *matHeaderCellDef>Symbol</th>
              <td mat-cell *matCellDef="let element">
                <span class="symbol-badge">{{ element.symbol }}</span>
              </td>
            </ng-container>

            <!-- LTP Column -->
            <ng-container matColumnDef="ltp">
              <th mat-header-cell *matHeaderCellDef>LTP</th>
              <td mat-cell *matCellDef="let element">₹{{ element.ltp | number: '1.2-2' }}</td>
            </ng-container>

            <!-- Change % Column -->
            <ng-container matColumnDef="changePercent">
              <th mat-header-cell *matHeaderCellDef>Change %</th>
              <td
                mat-cell
                *matCellDef="let element"
                [ngClass]="element.changePercent >= 0 ? 'text-success' : 'text-danger'"
              >
                {{ element.changePercent >= 0 ? '+' : '' }}{{ element.changePercent | number: '1.2-2' }}%
              </td>
            </ng-container>

            <!-- Volume Column -->
            <ng-container matColumnDef="volume">
              <th mat-header-cell *matHeaderCellDef>Volume</th>
              <td mat-cell *matCellDef="let element">
                {{ element.volume / 1000000 | number: '1.2-1' }}M
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="stockColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: stockColumns;"></tr>
          </table>
          <mat-paginator [pageSizeOptions]="[5, 10, 25]" showFirstLastButtons></mat-paginator>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .dashboard-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        font-size: 28px;
        font-weight: 700;
        color: #1f2937;
        margin: 0;
      }
    }

    .date-text {
      font-size: 14px;
      color: #6b7280;
      margin: 0;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }

    .table-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      h2 {
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
        margin: 0 0 16px 0;
      }
    }

    .data-table {
      width: 100%;

      th {
        background-color: #f3f4f6;
        font-weight: 600;
        color: #1f2937;
        border-bottom: 2px solid #e5e7eb;
      }

      td {
        padding: 12px;
        color: #6b7280;
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

    @media (max-width: 1024px) {
      .content-grid {
        grid-template-columns: 1fr;
      }

      .metrics-grid {
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      }
    }

    @media (max-width: 768px) {
      .metrics-grid {
        grid-template-columns: 1fr 1fr;
      }

      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  sectorColumns: string[] = ['sector', 'ltp', 'change', 'changePercent', 'volume'];
  stockColumns: string[] = ['symbol', 'ltp', 'changePercent', 'volume'];

  summaryMetrics: SummaryCardData[] = [];
  sectorData: Stock[] = [];
  stockData: Stock[] = [];

  private destroy$ = new Subject<void>();

  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    this.loadMarketData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadMarketData(): void {
    this.marketDataService.getMarketIndices().pipe(takeUntil(this.destroy$)).subscribe(indices => {
      this.summaryMetrics = indices.map(idx => ({
        title: idx.name,
        value: idx.value,
        change: idx.change,
        changePercent: idx.changePercent
      }));
    });

    this.marketDataService.getTopGainers().pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.sectorData = data;
      this.stockData = data.slice(0, 20);
    });
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
