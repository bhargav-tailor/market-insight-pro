import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MarketDataService } from '../../core/services/market-data.service';
import { OptionChain, OptionData } from '../../models';

@Component({
  selector: 'app-option-chain',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  template: `
    <div class="option-chain-container">
      <div class="page-header">
        <h1>Option Chain - NIFTY 50</h1>
        <p>Real-time Options Data</p>
      </div>

      <div class="option-chain-table">
        <table class="chain-table">
          <thead>
            <tr>
              <th colspan="10" class="section-header">CALLS</th>
              <th class="strike-header">STRIKE</th>
              <th colspan="10" class="section-header">PUTS</th>
            </tr>
            <tr class="column-headers">
              <th>OI</th>
              <th>Chg OI</th>
              <th>Vol</th>
              <th>IV</th>
              <th>LTP</th>
              <th>Net Chg</th>
              <th>Bid Qty</th>
              <th>Bid</th>
              <th>Ask</th>
              <th>Ask Qty</th>
              <th class="strike-price">Strike</th>
              <th>OI</th>
              <th>Chg OI</th>
              <th>Vol</th>
              <th>IV</th>
              <th>LTP</th>
              <th>Net Chg</th>
              <th>Bid Qty</th>
              <th>Bid</th>
              <th>Ask</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of optionChainData" [ngClass]="{ itm: row.calls.isItm || row.puts.isItm }">
              <!-- CALLS Side -->
              <td>{{ row.calls.oi / 1000000 | number: '1.1-1' }}M</td>
              <td>{{ row.calls.chgOi / 1000000 | number: '1.1-1' }}M</td>
              <td>{{ row.calls.volume / 1000 | number: '1.0-0' }}K</td>
              <td>{{ row.calls.iv }}%</td>
              <td class="ltp">{{ row.calls.ltp | number: '1.2-2' }}</td>
              <td [ngClass]="row.calls.netChg >= 0 ? 'positive' : 'negative'">
                {{ row.calls.netChg >= 0 ? '+' : '' }}{{ row.calls.netChg | number: '1.2-2' }}
              </td>
              <td>{{ row.calls.bidQty }}</td>
              <td class="bid">{{ row.calls.bid | number: '1.2-2' }}</td>
              <td class="ask">{{ row.calls.ask | number: '1.2-2' }}</td>
              <td>{{ row.calls.askQty }}</td>

              <!-- STRIKE PRICE -->
              <td class="strike-price">{{ row.strikePrice }}</td>

              <!-- PUTS Side -->
              <td>{{ row.puts.oi / 1000000 | number: '1.1-1' }}M</td>
              <td>{{ row.puts.chgOi / 1000000 | number: '1.1-1' }}M</td>
              <td>{{ row.puts.volume / 1000 | number: '1.0-0' }}K</td>
              <td>{{ row.puts.iv }}%</td>
              <td class="ltp">{{ row.puts.ltp | number: '1.2-2' }}</td>
              <td [ngClass]="row.puts.netChg >= 0 ? 'positive' : 'negative'">
                {{ row.puts.netChg >= 0 ? '+' : '' }}{{ row.puts.netChg | number: '1.2-2' }}
              </td>
              <td>{{ row.puts.bidQty }}</td>
              <td class="bid">{{ row.puts.bid | number: '1.2-2' }}</td>
              <td class="ask">{{ row.puts.ask | number: '1.2-2' }}</td>
              <td>{{ row.puts.askQty }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .option-chain-container {
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

    .option-chain-table {
      background: white;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      overflow-x: auto;
    }

    .chain-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;

      thead {
        position: sticky;
        top: 0;
        z-index: 10;
      }

      th {
        padding: 12px 8px;
        text-align: center;
        font-weight: 600;
        color: white;
        background-color: #1f2937;
      }

      td {
        padding: 12px 8px;
        text-align: center;
        border-bottom: 1px solid #e5e7eb;
        color: #6b7280;
      }

      .section-header {
        background-color: #374151;
        padding: 8px;
      }

      .column-headers th {
        background-color: #4b5563;
        padding: 8px;
        font-size: 11px;
      }

      .strike-header {
        background-color: #10b981 !important;
      }

      .strike-price {
        background-color: #fef3c7;
        color: #92400e;
        font-weight: 700;
        border-left: 2px solid #f59e0b;
        border-right: 2px solid #f59e0b;
      }

      tr.itm {
        background-color: #fef3c7;
      }

      .ltp {
        font-weight: 600;
        color: #1f2937;
      }

      .bid {
        color: #ef4444;
        font-weight: 500;
      }

      .ask {
        color: #10b981;
        font-weight: 500;
      }

      .positive {
        color: #10b981;
        font-weight: 600;
      }

      .negative {
        color: #ef4444;
        font-weight: 600;
      }

      tbody tr:hover {
        background-color: #f9fafb;
      }

      tbody tr.itm:hover {
        background-color: #fde68a;
      }
    }

    @media (max-width: 1200px) {
      .chain-table {
        font-size: 11px;

        th, td {
          padding: 8px 4px;
        }
      }
    }

    @media (max-width: 768px) {
      .option-chain-table {
        overflow-x: scroll;
      }

      .chain-table {
        font-size: 10px;

        th, td {
          padding: 6px 3px;
        }
      }
    }
  `]
})
export class OptionChainComponent implements OnInit {
  optionChainData: OptionChain[] = [];

  constructor(private marketDataService: MarketDataService) {}

  ngOnInit(): void {
    this.loadOptionChainData();
  }

  private loadOptionChainData(): void {
    this.marketDataService.getOptionChain('NIFTY').subscribe(data => {
      this.optionChainData = data;
    });
  }
}
