import { useEffect, useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { useFetchData } from "@/hooks/useFetchData";
import { isWebSocketMessage, IndexData, StockData } from "../types/websocket";
import { StockPosition } from "@/types";



export function useFilteredMarketData() {
  const { data, isConnected, isError } = useWebSocket("ws://localhost:8080");
  const { stockPositions, sectorLeader, watchlist } = useFetchData();
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [filteredSectors, setFilteredSectors] = useState<IndexData[]>([]);
  const [filteredWatchlists, setFilteredWatchlists] = useState<StockData[]>([]);

  // Function to filter relevant stocks
   const filterRelevantStocks = (stocksData: StockData[]) => {

    if (!stocksData || !watchlist || !stockPositions) return [];
    const stockPositionsMap = new Map(stockPositions.map(stock => [stock.symbol, stock]));

    return ( stocksData
      .filter(stock => stockPositionsMap.has(stock.symbol))
      .map(stock => ({
        ...stockPositionsMap.get(stock.symbol), // API-fetched stock details
        ...stock, // Live WebSocket updates (overwrite API values if needed)
      })))

  };



  const filterRelevantWatchlist = (stocksData: StockData[]) => {
    if (!stocksData || !watchlist || !stockPositions) return [];

    // Extract symbols from watchlist and stockPositions
    const watchlistSymbols = new Set(watchlist.map(stock => stock.symbol));

    return stocksData.filter(stock => watchlistSymbols.has(stock.symbol));
  };
  // Function to filter relevant sectors
  const filterRelevantSectors = (indexList: IndexData[]) => {
    if (!indexList || !sectorLeader) return [];

    const sectorSymbols = new Set(sectorLeader.map(sector => sector.sectorName));
    return indexList.filter(sector => sectorSymbols.has(sector.indexCode));
  };

  useEffect(() => {
    if (data && isWebSocketMessage(data)) {

      setIndices(data.indices);
      setStocks(data.stock);
      // Filter stocks and sectors
      setFilteredStocks(filterRelevantStocks(data.stock));
      setFilteredSectors(filterRelevantSectors(data.indices));
      setFilteredWatchlists(filterRelevantWatchlist(data.stock))
    } else {
      console.warn("Received invalid WebSocket message", data);
    }
  }, [data, watchlist, stockPositions, sectorLeader]);

  return {filteredWatchlists,filteredStocks, filteredSectors, isConnected, isError };
}
