import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketDataService } from '../../core/services/market-data.service';
import { HeatmapBlock } from '../../models';

@Component({
  selector: 'app-heatmap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="heatmap-container">
      <div class="page-header">
        <h1>Market HEATMAP - Broad Market Indices</h1>
        <p>Sector-wise Performance Visualization</p>
      </div>

      <div class="heatmap-legend">
        <div class="legend-item">
          <span class="color-box" style="background: #7f1d1d;"></span>
          <span>-3% or less</span>
        </div>
        <div class="legend-item">
          <span class="color-box" style="background: #f3f4f6;"></span>
          <span>0%</span>
        </div>
        <div class="legend-item">
          <span class="color-box" style="background: #10b981;"></span>
          <span>+3% or more</span>
        </div>
      </div>

      <div class="heatmap-grid">
        <div *ngFor="let block of heatmapData" class="heatmap-block" [ngStyle]="getBlockStyle(block)">
          <div class="block-content">
            <div class="block-symbol">{{ block.symbol }}</div>
            <div class="block-change">{{ block.changePercent >= 0 ? '+' : '' }}{{ block.changePercent | number: '1.1-1' }}%</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .heatmap-container {
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

    .heatmap-legend {
      display: flex;
      gap: 24px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #6b7280;
    }

    .color-box {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      border: 1px solid #e5e7eb;
    }

    .heatmap-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 12px;
      padding: 16px;
      background: #f9fafb;
      border-radius: 12px;
    }

    .heatmap-block {
      min-height: 120px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }

    .block-content {
      text-align: center;
      color: white;
    }

    .block-symbol {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 4px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .block-change {
      font-size: 16px;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    @media (max-width: 768px) {
      .heatmap-grid {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      }

      .heatmap-legend {
        flex-direction: column;
        gap: 12px;
      }
    }
  `]
})
export class HeatmapComponent implements OnInit {
  heatmapData: HeatmapBlock[] = [];

  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    this.loadHeatmapData();
  }

  private loadHeatmapData(): void {
    this.marketDataService.getHeatmapData().subscribe(data => {
      this.heatmapData = data;
    });
  }

  getBlockStyle(block: HeatmapBlock): any {
    const changePercent = block.changePercent;
    let backgroundColor = '#f3f4f6'; // neutral

    if (changePercent <= -3) {
      backgroundColor = '#7f1d1d'; // deep red
    } else if (changePercent < 0) {
      const intensity = Math.abs(changePercent) / 3;
      const red = Math.round(127 + (239 - 127) * intensity);
      const green = Math.round(29 + (68 - 29) * intensity);
      const blue = Math.round(29 + (68 - 29) * intensity);
      backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    } else if (changePercent >= 3) {
      backgroundColor = '#10b981'; // emerald
    } else if (changePercent > 0) {
      const intensity = changePercent / 3;
      const red = Math.round(240 - 176 * intensity);
      const green = Math.round(253 - 177 * intensity);
      const blue = Math.round(244 - 228 * intensity);
      backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    }

    return { backgroundColor };
  }
}
