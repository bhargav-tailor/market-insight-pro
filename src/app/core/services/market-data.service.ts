import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  Stock,
  MarketIndex,
  PreOpenStock,
  OptionChain,
  SectorData,
  HeatmapBlock,
  OpenInterestData,
  TopGainerLoser
} from '../../models';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketDataService {
  private readonly marketIndicesSubject = new BehaviorSubject<MarketIndex[]>([]);
  private readonly topGainersSubject = new BehaviorSubject<Stock[]>([]);
  private readonly topLosersSubject = new BehaviorSubject<Stock[]>([]);

  public readonly marketIndices$ = this.marketIndicesSubject.asObservable();
  public readonly topGainers$ = this.topGainersSubject.asObservable();
  public readonly topLosers$ = this.topLosersSubject.asObservable();

  constructor() {
    this.loadMockData();
  }

  /**
   * Load initial mock data
   */
  private loadMockData(): void {
    this.marketIndicesSubject.next(this.getMockMarketIndices());
    this.topGainersSubject.next(this.getMockTopGainers());
    this.topLosersSubject.next(this.getMockTopLosers());
  }

  /**
   * Get market indices
   */
  getMarketIndices(): Observable<MarketIndex[]> {
    return this.marketIndices$;
  }

  /**
   * Get top gainers
   */
  getTopGainers(): Observable<Stock[]> {
    return this.topGainers$;
  }

  /**
   * Get top losers
   */
  getTopLosers(): Observable<Stock[]> {
    return this.topLosers$;
  }

  /**
   * Get pre-open market data
   */
  getPreOpenMarketData(): Observable<PreOpenStock[]> {
    return of(this.getMockPreOpenData()).pipe(delay(300));
  }

  /**
   * Get option chain data
   */
  getOptionChain(symbol: string): Observable<OptionChain[]> {
    return of(this.getMockOptionChain()).pipe(delay(300));
  }

  /**
   * Get heatmap data
   */
  getHeatmapData(): Observable<HeatmapBlock[]> {
    return of(this.getMockHeatmapData()).pipe(delay(300));
  }

  /**
   * Get open interest data
   */
  getOpenInterestData(): Observable<OpenInterestData[]> {
    return of(this.getMockOpenInterestData()).pipe(delay(300));
  }

  /**
   * Get sector data
   */
  getSectorData(sector: string): Observable<SectorData> {
    return of(this.getMockSectorData(sector)).pipe(delay(300));
  }

  /**
   * Get all sectors
   */
  getAllSectors(): Observable<string[]> {
    return of([
      'Nifty IT',
      'Nifty Bank',
      'Nifty Auto',
      'Nifty Pharma',
      'Nifty Energy',
      'Nifty Finance',
      'Nifty FMCG',
      'Nifty Infra',
      'Nifty Media',
      'Nifty Metal',
      'Nifty Private Bank',
      'Nifty PSU Bank'
    ]).pipe(delay(100));
  }

  /**
   * Search stocks
   */
  searchStocks(query: string): Observable<Stock[]> {
    return of(this.getMockTopGainers().filter(s => s.symbol.includes(query.toUpperCase()))).pipe(delay(200));
  }

  /**
   * Get mock market indices
   */
  private getMockMarketIndices(): MarketIndex[] {
    return [
      {
        symbol: 'NIFTY50',
        name: 'Nifty 50',
        value: 24850.35,
        change: 150.25,
        changePercent: 0.61,
        sparklineData: [24500, 24600, 24700, 24750, 24800, 24850.35]
      },
      {
        symbol: 'SENSEX',
        name: 'Sensex',
        value: 81325.50,
        change: -125.75,
        changePercent: -0.15,
        sparklineData: [81500, 81400, 81350, 81325.50]
      },
      {
        symbol: 'VIX',
        name: 'India VIX',
        value: 14.25,
        change: 0.75,
        changePercent: 5.59,
        sparklineData: [13.5, 13.8, 14.0, 14.25]
      },
      {
        symbol: 'FIIFLOW',
        name: 'FII/DII Net Flow',
        value: 250000000,
        change: 50000000,
        changePercent: 25.00,
        sparklineData: [200, 220, 235, 250]
      },
      {
        symbol: 'SILVER',
        name: 'Silver',
        value: 68500,
        change: 1500,
        changePercent: 2.24,
        sparklineData: [67000, 67500, 68000, 68500]
      },
      {
        symbol: 'GOLD',
        name: 'Gold',
        value: 62850,
        change: 850,
        changePercent: 1.37,
        sparklineData: [62000, 62300, 62600, 62850]
      },
      {
        symbol: 'USDINR',
        name: 'USD/INR',
        value: 84.25,
        change: 0.15,
        changePercent: 0.18,
        sparklineData: [84.0, 84.1, 84.2, 84.25]
      },
      {
        symbol: 'CRUDE',
        name: 'Crude Oil',
        value: 78.50,
        change: -2.50,
        changePercent: -3.08,
        sparklineData: [81.0, 80.0, 79.0, 78.50]
      }
    ];
  }

  /**
   * Get mock top gainers
   */
  private getMockTopGainers(): Stock[] {
    return [
      {
        id: '1',
        symbol: 'INFY',
        name: 'Infosys Limited',
        ltp: 1850.50,
        change: 125.50,
        changePercent: 7.28,
        volume: 2500000,
        high: 1900,
        low: 1750,
        open: 1730,
        close: 1850.50,
        sector: 'IT',
        marketCap: 7500000000000
      },
      {
        id: '2',
        symbol: 'WIPRO',
        name: 'Wipro Limited',
        ltp: 420.75,
        change: 28.50,
        changePercent: 6.34,
        volume: 1800000,
        high: 425,
        low: 395,
        open: 395,
        close: 420.75,
        sector: 'IT',
        marketCap: 1950000000000
      },
      {
        id: '3',
        symbol: 'AXISBANK',
        name: 'Axis Bank Limited',
        ltp: 1085.00,
        change: 45.00,
        changePercent: 4.33,
        volume: 3200000,
        high: 1090,
        low: 1040,
        open: 1040,
        close: 1085.00,
        sector: 'Finance',
        marketCap: 3400000000000
      },
      {
        id: '4',
        symbol: 'HDFCBANK',
        name: 'HDFC Bank Limited',
        ltp: 1720.50,
        change: 58.20,
        changePercent: 3.48,
        volume: 2800000,
        high: 1725,
        low: 1670,
        open: 1670,
        close: 1720.50,
        sector: 'Finance',
        marketCap: 11200000000000
      },
      {
        id: '5',
        symbol: 'RELIANCE',
        name: 'Reliance Industries Limited',
        ltp: 3150.00,
        change: 95.00,
        changePercent: 3.11,
        volume: 1500000,
        high: 3160,
        low: 3055,
        open: 3055,
        close: 3150.00,
        sector: 'Energy',
        marketCap: 14200000000000
      }
    ];
  }

  /**
   * Get mock top losers
   */
  private getMockTopLosers(): Stock[] {
    return [
      {
        id: '6',
        symbol: 'SBIN',
        name: 'State Bank of India',
        ltp: 625.50,
        change: -45.50,
        changePercent: -6.78,
        volume: 2100000,
        high: 675,
        low: 625.50,
        open: 670,
        close: 625.50,
        sector: 'Finance',
        marketCap: 5600000000000
      },
      {
        id: '7',
        symbol: 'MARUTI',
        name: 'Maruti Suzuki India Limited',
        ltp: 9850.00,
        change: -780.00,
        changePercent: -7.33,
        volume: 450000,
        high: 10650,
        low: 9850,
        open: 10600,
        close: 9850.00,
        sector: 'Auto',
        marketCap: 1280000000000
      },
      {
        id: '8',
        symbol: 'TATASTEEL',
        name: 'Tata Steel Limited',
        ltp: 155.80,
        change: -12.50,
        changePercent: -7.43,
        volume: 1200000,
        high: 170,
        low: 155.80,
        open: 168,
        close: 155.80,
        sector: 'Metal',
        marketCap: 580000000000
      },
      {
        id: '9',
        symbol: 'LTIM',
        name: 'LTIMind Tech Limited',
        ltp: 5480.00,
        change: -320.00,
        changePercent: -5.51,
        volume: 890000,
        high: 5820,
        low: 5480,
        open: 5800,
        close: 5480.00,
        sector: 'IT',
        marketCap: 2150000000000
      },
      {
        id: '10',
        symbol: 'SUNPHARMA',
        name: 'Sun Pharmaceutical Industries',
        ltp: 715.50,
        change: -42.50,
        changePercent: -5.61,
        volume: 1500000,
        high: 760,
        low: 715.50,
        open: 758,
        close: 715.50,
        sector: 'Pharma',
        marketCap: 1950000000000
      }
    ];
  }

  /**
   * Get mock pre-open data
   */
  private getMockPreOpenData(): PreOpenStock[] {
    return this.getMockTopGainers().map((stock, idx) => ({
      ...stock,
      preOpenPrice: stock.ltp + (Math.random() * 100 - 50),
      preOpenQuantity: Math.floor(Math.random() * 5000000),
      preOpenChange: Math.random() * 200 - 100,
      preOpenChangePercent: Math.random() * 5 - 2.5
    }));
  }

  /**
   * Get mock option chain
   */
  private getMockOptionChain(): OptionChain[] {
    const strikes = [24500, 24600, 24700, 24800, 24900];
    return strikes.map(strike => ({
      strikePrice: strike,
      calls: {
        oi: Math.floor(Math.random() * 5000000),
        chgOi: Math.floor(Math.random() * 500000),
        volume: Math.floor(Math.random() * 100000),
        iv: (15 + Math.random() * 10).toFixed(2) as any,
        ltp: Math.random() * 500 + 100,
        netChg: Math.random() * 50 - 25,
        bidQty: Math.floor(Math.random() * 1000),
        bid: Math.random() * 500 + 100,
        ask: Math.random() * 500 + 100,
        askQty: Math.floor(Math.random() * 1000),
        isItm: strike <= 24700
      },
      puts: {
        oi: Math.floor(Math.random() * 5000000),
        chgOi: Math.floor(Math.random() * 500000),
        volume: Math.floor(Math.random() * 100000),
        iv: (15 + Math.random() * 10).toFixed(2) as any,
        ltp: Math.random() * 500 + 100,
        netChg: Math.random() * 50 - 25,
        bidQty: Math.floor(Math.random() * 1000),
        bid: Math.random() * 500 + 100,
        ask: Math.random() * 500 + 100,
        askQty: Math.floor(Math.random() * 1000),
        isItm: strike >= 24700
      }
    }));
  }

  /**
   * Get mock heatmap data
   */
  private getMockHeatmapData(): HeatmapBlock[] {
    const sectors = ['IT', 'Finance', 'Auto', 'Pharma', 'Energy', 'FMCG', 'Infra', 'Metal'];
    const stocksPerSector = 5;
    const data: HeatmapBlock[] = [];

    sectors.forEach(sector => {
      for (let i = 0; i < stocksPerSector; i++) {
        data.push({
          symbol: `${sector}${i}`,
          change: Math.random() * 600000000000,
          changePercent: Math.random() * 6 - 3,
          marketCap: Math.random() * 1000000000000,
          sector
        });
      }
    });

    return data;
  }

  /**
   * Get mock open interest data
   */
  private getMockOpenInterestData(): OpenInterestData[] {
    const indicators: Array<'long_buildup' | 'short_covering' | 'long_unwinding' | 'short_buildup'> = [
      'long_buildup',
      'short_covering',
      'long_unwinding',
      'short_buildup'
    ];

    return ['NIFTY', 'BANKNIFTY', 'FINNIFTY', 'MIDCPNIFTY', 'NIFTYJR', 'NIFTYIT'].map((symbol, idx) => ({
      symbol,
      futureLtp: 24700 + Math.random() * 500,
      totalOi: Math.floor(Math.random() * 50000000),
      changeOi: Math.floor(Math.random() * 5000000),
      percentChangeOi: Math.random() * 20 - 10,
      indicator: indicators[idx % indicators.length]
    }));
  }

  /**
   * Get mock sector data
   */
  private getMockSectorData(sector: string): SectorData {
    return {
      sector,
      stocks: this.getMockTopGainers().slice(0, 10).map((stock, idx) => ({
        ...stock,
        sector
      })),
      performance: Math.random() * 10 - 5,
      change: Math.random() * 500
    };
  }
}
