export interface StockPosition {
  date: string;
  price: number;
  quantity: number;
  symbol: string;
  _id?: string;
}

export interface WatchlistStock {
  symbol: string;
  _id?: string;
}

export interface SectorLeader {
  sectorName: string;
  _id?: string;
}

export interface Chart {
  symbol : string,
  ltp : number,
  change: number,
  imageUrl : string
}

export interface TradeHistory {
  _id?: string,
  symbol : string, 
  quantity: number,
  purchase_price: number, 
  sell_price: number,
  exit_date: Date
}