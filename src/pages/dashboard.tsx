"use client";
import { useEffect, useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket";
import { isWebSocketMessage, WebSocketMessage, IndexData, StockData } from "../types/websocket";
import { useFetchData } from '@/hooks/useFetchData';

export default function MarketTracker() {
  const { data, isConnected, isError } = useWebSocket("ws://localhost:8080");
  const { stockPositions, sectorLeader, watchlist } = useFetchData();
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [filteredSectors, setFilteredSectors] = useState<IndexData[]>([])

  // Function to filter relevant stocks
  const filterRelevantData = (stocksData: StockData[]) => {
    if (!stocksData || !watchlist || !stockPositions) return [];

    // Extract symbols from watchlist and stockPositions
    const watchlistSymbols = new Set(watchlist.map(stock => stock.symbol));
    const stockPositionsSymbols = new Set(stockPositions.map(stock => stock.symbol));

    return stocksData.filter(stock => watchlistSymbols.has(stock.symbol) || stockPositionsSymbols.has(stock.symbol));
  };
  const filterRelevantSector = (indexList : IndexData[]) => {
    const sectorSymbols = new Set(sectorLeader.map(sector => sector.sectorName))

    return indexList.filter(sector => sectorSymbols.has(sector.indexCode))



  }

  useEffect(() => {
    if (data && isWebSocketMessage(data)) {
      console.log("WebSocket Data:", data);

      setIndices(data.indices);
      setStocks(data.stock);

      // Filter stocks
      const filtered = filterRelevantData(data.stock);
      setFilteredStocks(filtered);
      const filteredSectors = filterRelevantSector(data.indices)
      setFilteredSectors(filteredSectors)
    } else {
      console.warn("Received invalid WebSocket message", data);
    }
  }, [data, watchlist, stockPositions,sectorLeader]);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Real-Time Market Tracker</h2>
      {!isConnected && <p>Connecting...</p>}
      {isError && <p>There was an error with the WebSocket connection.</p>}

      <h3 className="text-md font-semibold mt-4">Indices</h3>
      {filteredSectors.length > 0 ? (
        <div>
          {filteredSectors.map((index) => (
            <div key={index.indexCode} className={`my-2`}>
              <h4>{index.indexCode}</h4>
              <p>Value: {index.indexValue}</p>
              <p>Change: {index.change} ({index.percentageChange}%)</p>
              <p>Previous Close: {index.prevCloseIndex}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No indices data available</p>
      )}

      <h3 className="text-md font-semibold mt-4">Watchlist & Positions</h3>
      {filteredStocks.length > 0 ? (
        <div>
          {filteredStocks.map((stock) => (
            <div key={stock.symbol} className="my-2">
              <h4>{stock.symbol}</h4>
              <p>Last Traded Price: {stock.ltp}</p>
              <p>Change: {stock.change} ({stock.percentChange}%)</p>
              <p>High: {stock.high}</p>
              <p>Low: {stock.low}</p>
              <p>Open: {stock.open}</p>
              <p>Volume: {stock.volume}</p>
              <p>Last Traded Volume: {stock.lastTradedVolume}</p>
              <p>Previous Close: {stock.previousClose}</p>
              <p className="text-sm text-gray-500">
                Last Traded Time: {new Date(stock.lastTradedTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No relevant stock data available</p>
      )}
    </div>
  );
}
