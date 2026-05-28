import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MarketDataService } from '../../core/services/market-data.service';
import { TopGainerLoser } from '../../models';

@Component({
  selector: 'app-gainers-losers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatTabsModule, MatIconModule],
  template: `
    <div class="gainers-losers-container">
      <div class="page-header">
        <h1>Top Gainers & Losers</h1>
      </div>

      <mat-tab-group class="tab-group">
        <!-- Top Gainers Tab -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">trending_up</mat-icon>
            <span>Top Gainers</span>
          </ng-template>

          <div class="table-container">
            <table mat-table [dataSource]="gainersData" class="data-table">
              <!-- Symbol Column -->
              <ng-container matColumnDef="symbol">
                <th mat-header-cell *matHeaderCellDef>Company Name</th>
                <td mat-cell *matCellDef="let element">
                  <div class="company-info">
                    <span class="symbol-badge">{{ element.symbol }}</span>
                    <span class="company-name">{{ element.companyName }}</span>
                  </div>
                </td>
              </ng-container>

              <!-- Sector Column -->
              <ng-container matColumnDef="sector">
                <th mat-header-cell *matHeaderCellDef>Sector</th>
                <td mat-cell *matCellDef="let element">{{ element.sector }}</td>
              </ng-container>

              <!-- LTP Column -->
              <ng-container matColumnDef="ltp">
                <th mat-header-cell *matHeaderCellDef>LTP</th>
                <td mat-cell *matCellDef="let element">₹{{ element.ltp | number: '1.2-2' }}</td>
              </ng-container>

              <!-- High/Low Column -->
              <ng-container matColumnDef="range">
                <th mat-header-cell *matHeaderCellDef>High / Low</th>
                <td mat-cell *matCellDef="let element">
                  <span class="text-success">{{ element.high | number: '1.2-2' }}</span> /
                  <span class="text-danger">{{ element.low | number: '1.2-2' }}</span>
                </td>
              </ng-container>

              <!-- Volume Column -->
              <ng-container matColumnDef="volume">
                <th mat-header-cell *matHeaderCellDef>Volume</th>
                <td mat-cell *matCellDef="let element">{{ element.volume / 1000000 | number: '1.1-1' }}M</td>
              </ng-container>

              <!-- Change % Column -->
              <ng-container matColumnDef="changePercent">
                <th mat-header-cell *matHeaderCellDef>Change %</th>
                <td mat-cell *matCellDef="let element" class="text-success">
                  <strong>+{{ element.changePercent | number: '1.2-2' }}%</strong>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-tab>

        <!-- Top Losers Tab -->
        <mat-tab>
          <ng-template mat-tab-label>
            <mat-icon class="tab-icon">trending_down</mat-icon>
            <span>Top Losers</span>
          </ng-template>

          <div class="table-container">
            <table mat-table [dataSource]="losersData" class="data-table">
              <!-- Symbol Column -->
              <ng-container matColumnDef="symbol">
                <th mat-header-cell *matHeaderCellDef>Company Name</th>
                <td mat-cell *matCellDef="let element">
                  <div class="company-info">
                    <span class="symbol-badge">{{ element.symbol }}</span>
                    <span class="company-name">{{ element.companyName }}</span>
                  </div>
                </td>
              </ng-container>

              <!-- Sector Column -->
              <ng-container matColumnDef="sector">
                <th mat-header-cell *matHeaderCellDef>Sector</th>
                <td mat-cell *matCellDef="let element">{{ element.sector }}</td>
              </ng-container>

              <!-- LTP Column -->
              <ng-container matColumnDef="ltp">
                <th mat-header-cell *matHeaderCellDef>LTP</th>
                <td mat-cell *matCellDef="let element">₹{{ element.ltp | number: '1.2-2' }}</td>
              </ng-container>

              <!-- High/Low Column -->
              <ng-container matColumnDef="range">
                <th mat-header-cell *matHeaderCellDef>High / Low</th>
                <td mat-cell *matCellDef="let element">
                  <span class="text-success">{{ element.high | number: '1.2-2' }}</span> /
                  <span class="text-danger">{{ element.low | number: '1.2-2' }}</span>
                </td>
              </ng-container>

              <!-- Volume Column -->
              <ng-container matColumnDef="volume">
                <th mat-header-cell *matHeaderCellDef>Volume</th>
                <td mat-cell *matCellDef="let element">{{ element.volume / 1000000 | number: '1.1-1' }}M</td>
              </ng-container>

              <!-- Change % Column -->
              <ng-container matColumnDef="changePercent">
                <th mat-header-cell *matHeaderCellDef>Change %</th>
                <td mat-cell *matCellDef="let element" class="text-danger">
                  <strong>{{ element.changePercent | number: '1.2-2' }}%</strong>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .gainers-losers-container {
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

    .tab-group {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .tab-icon {
      margin-right: 8px;
    }

    .table-container {
      padding: 24px;
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

    .company-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .symbol-badge {
      background-color: #1e40af;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      white-space: nowrap;
    }

    .company-name {
      color: #1f2937;
      font-weight: 500;
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
      .table-container {
        padding: 16px;
      }

      .data-table th, td {
        padding: 12px;
        font-size: 12px;
      }
    }
  `]
})
export class GainersLosersComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'sector', 'ltp', 'range', 'volume', 'changePercent'];
  gainersData: TopGainerLoser[] = [];
  losersData: TopGainerLoser[] = [];

  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.marketDataService.getTopGainers().subscribe(data => {
      this.gainersData = data.map(stock => ({
        symbol: stock.symbol,
        companyName: stock.name,
        sector: stock.sector || 'N/A',
        ltp: stock.ltp,
        high: stock.high,
        low: stock.low,
        volume: stock.volume,
        changePercent: stock.changePercent
      }));
    });

    this.marketDataService.getTopLosers().subscribe(data => {
      this.losersData = data.map(stock => ({
        symbol: stock.symbol,
        companyName: stock.name,
        sector: stock.sector || 'N/A',
        ltp: stock.ltp,
        high: stock.high,
        low: stock.low,
        volume: stock.volume,
        changePercent: stock.changePercent
      }));
    });
  }
}
