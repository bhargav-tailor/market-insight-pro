export interface Stock {
  id: string;
  symbol: string;
  name: string;
  ltp: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  close: number;
  sector?: string;
  marketCap?: number;
  weight?: number;
}

export interface MarketIndex {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  sparklineData?: number[];
}

export interface PreOpenStock extends Stock {
  preOpenPrice: number;
  preOpenQuantity: number;
  preOpenChange: number;
  preOpenChangePercent: number;
}

export interface OptionChain {
  strikePrice: number;
  calls: OptionData;
  puts: OptionData;
}

export interface OptionData {
  oi: number;
  chgOi: number;
  volume: number;
  iv: number;
  ltp: number;
  netChg: number;
  bidQty: number;
  bid: number;
  ask: number;
  askQty: number;
  isItm?: boolean;
}

export interface SectorData {
  sector: string;
  stocks: Stock[];
  performance: number;
  change: number;
}

export interface HeatmapBlock {
  symbol: string;
  change: number;
  changePercent: number;
  marketCap: number;
  sector: string;
}

export interface OpenInterestData {
  symbol: string;
  futureLtp: number;
  totalOi: number;
  changeOi: number;
  percentChangeOi: number;
  indicator: 'long_buildup' | 'short_covering' | 'long_unwinding' | 'short_buildup';
}

export interface TopGainerLoser {
  symbol: string;
  companyName: string;
  sector: string;
  ltp: number;
  high: number;
  low: number;
  volume: number;
  changePercent: number;
}
