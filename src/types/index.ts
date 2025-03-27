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