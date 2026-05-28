import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MarketDataService } from '../../core/services/market-data.service';
import { Stock, SectorData } from '../../models';

@Component({
  selector: 'app-sector-stocks',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, MatTableModule],
  template: `
    <div class="sector-stocks-container">
      <div class="page-header">
        <h1>Sector Wise Stocks</h1>
      </div>

      <div class="selector-section">
        <mat-form-field appearance="outline" class="sector-select">
          <mat-label>Select Market Sector</mat-label>
          <mat-select [(ngModel)]="selectedSector" (selectionChange)="onSectorChange()">
            <mat-option value="">Select a sector...</mat-option>
            <mat-option *ngFor="let sector of sectors" [value]="sector">
              {{ sector }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div *ngIf="selectedSector && sectorStocks.length > 0" class="table-section">
        <h2>Top 10 Stocks - {{ selectedSector }}</h2>
        <table mat-table [dataSource]="sectorStocks" class="data-table">
          <!-- Rank Column -->
          <ng-container matColumnDef="rank">
            <th mat-header-cell *matHeaderCellDef>Rank</th>
            <td mat-cell *matCellDef="let element; let i = index">{{ i + 1 }}</td>
          </ng-container>

          <!-- Stock Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Stock Name</th>
            <td mat-cell *matCellDef="let element">
              <div class="stock-info">
                <span class="symbol-badge">{{ element.symbol }}</span>
                <span class="stock-name">{{ element.name }}</span>
              </div>
            </td>
          </ng-container>

          <!-- Weightage Column -->
          <ng-container matColumnDef="weightage">
            <th mat-header-cell *matHeaderCellDef>Weightage %</th>
            <td mat-cell *matCellDef="let element">
              {{ ((element.marketCap || 0) / getTotalMarketCap() * 100) | number: '1.2-2' }}%
            </td>
          </ng-container>

          <!-- LTP Column -->
          <ng-container matColumnDef="ltp">
            <th mat-header-cell *matHeaderCellDef>LTP</th>
            <td mat-cell *matCellDef="let element">₹{{ element.ltp | number: '1.2-2' }}</td>
          </ng-container>

          <!-- Day Performance Column -->
          <ng-container matColumnDef="performance">
            <th mat-header-cell *matHeaderCellDef>Day's Performance</th>
            <td
              mat-cell
              *matCellDef="let element"
              [ngClass]="element.changePercent >= 0 ? 'text-success' : 'text-danger'"
            >
              <strong>{{ element.changePercent >= 0 ? '+' : '' }}{{ element.changePercent | number: '1.2-2' }}%</strong>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>

      <div *ngIf="!selectedSector" class="empty-state">
        <p>Select a sector from the dropdown to view the top 10 stocks</p>
      </div>
    </div>
  `,
  styles: [`
    .sector-stocks-container {
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

    .selector-section {
      display: flex;
      gap: 16px;
      padding: 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .sector-select {
      min-width: 300px;
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

    .stock-info {
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

    .stock-name {
      color: #1f2937;
      font-weight: 500;
    }

    .text-success {
      color: #10b981;
    }

    .text-danger {
      color: #ef4444;
    }

    .empty-state {
      background: white;
      border-radius: 12px;
      padding: 48px;
      text-align: center;
      color: #6b7280;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

      p {
        margin: 0;
        font-size: 16px;
      }
    }

    @media (max-width: 768px) {
      .selector-section {
        flex-direction: column;
      }

      .sector-select {
        min-width: 100%;
      }

      .data-table th, td {
        padding: 12px;
        font-size: 12px;
      }
    }
  `]
})
export class SectorStocksComponent implements OnInit {
  displayedColumns: string[] = ['rank', 'name', 'weightage', 'ltp', 'performance'];
  sectors: string[] = [];
  selectedSector: string = '';
  sectorStocks: Stock[] = [];

  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    this.loadSectors();
  }

  private loadSectors(): void {
    this.marketDataService.getAllSectors().subscribe(sectors => {
      this.sectors = sectors;
    });
  }

  onSectorChange(): void {
    if (this.selectedSector) {
      this.marketDataService.getSectorData(this.selectedSector).subscribe(data => {
        this.sectorStocks = data.stocks.slice(0, 10);
      });
    }
  }

  getTotalMarketCap(): number {
    return this.sectorStocks.reduce((sum, stock) => sum + (stock.marketCap || 0), 0);
  }
}

import { FormsModule } from '@angular/forms';
