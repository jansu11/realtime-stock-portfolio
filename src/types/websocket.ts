export interface IndexData {
  indexCode: string;
  indexValue: number;
  prevCloseIndex: number;
  change: number;
  percentageChange: number;
}

export interface StockData {
  symbol: string;
  volume: number;
  ltp: number; // Last Traded Price
  percentChange: number;
  high: number;
  low: number;
  open: number;
  lastTradedVolume: number;
  lastTradedTime: string; // Timestamp of the last traded time
  change: number;
  previousClose: number;
}

export interface WebSocketMessage {
  indices: IndexData[];
  stock: StockData[];
}

export const isWebSocketMessage = (data: any): data is WebSocketMessage => {
  return (
    data &&
    Array.isArray(data.indices) &&
    data.indices.every((item: any) => 
      typeof item.indexCode === 'string' &&
      typeof item.indexValue === 'number' &&
      typeof item.prevCloseIndex === 'number' &&
      typeof item.change === 'number' &&
      typeof item.percentageChange === 'number'
    ) &&
    Array.isArray(data.stock) &&
    data.stock.every((item: any) => 
      typeof item.symbol === 'string' &&
      typeof item.ltp === 'number' &&
      typeof item.volume === 'number' &&
      typeof item.percentChange === 'number' &&
      typeof item.high === 'number' &&
      typeof item.low === 'number' &&
      typeof item.open === 'number' &&
      typeof item.lastTradedVolume === 'number' &&
      typeof item.lastTradedTime === 'string' &&
      typeof item.change === 'number' &&
      typeof item.previousClose === 'number'
    )
  );
};


export interface StockData {
  price: number;
  quantity: number;
  symbol: string;
  volume: number;
  ltp: number; // Last Traded Price
  percentChange: number;
  high: number;
  low: number;
  open: number;
  lastTradedVolume: number;
  lastTradedTime: string; // Timestamp of the last traded time
  change: number;
  previousClose: number;
  
}

// Exclude _id and __v from the full data structure
