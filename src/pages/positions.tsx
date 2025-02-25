"use client";
import { useFilteredMarketData } from "@/hooks/useFilteredStocks";



export default function MarketTracker() {
  const { filteredWatchlists,filteredStocks, filteredSectors, isConnected, isError } = useFilteredMarketData();

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Real-Time Market Tracker</h2>
      {!isConnected && <p>Connecting...</p>}
      {isError && <p>There was an error with the WebSocket connection.</p>}

      <h3 className="text-md font-semibold mt-4">Filtered Sectors</h3>
      {filteredSectors.length > 0 ? (
        <div>
          {filteredSectors.map((sector) => (
            <div key={sector.indexCode} className="my-2">
              <h4>{sector.indexCode}</h4>
              <p>Value: {sector.indexValue}</p>
              <p>Change: {sector.change} ({sector.percentageChange}%)</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No relevant sector data available</p>
      )}

      <h3 className="text-md font-semibold mt-4">Filtered Stocks</h3>
      {filteredStocks.length > 0 ? (
        <div>
          {filteredStocks.map((stock) => (
            <div key={stock.symbol} className="my-2">
              <h4>{stock.symbol}</h4>
              <p>Last Traded Price: {stock.ltp}</p>
              <p>Change: {stock.change} ({stock.percentChange}%)</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No relevant stock data available</p>
      )}

      <h3 className="text-md font-semibold mt-4">Filtered Watchlists</h3>
      {filteredStocks.length > 0 ? (
        <div>
          {filteredWatchlists.map((stock) => (
            <div key={stock.symbol} className="my-2">
              <h4>{stock.symbol}</h4>
              <p>Last Traded Price: {stock.ltp}</p>
              <p>Change: {stock.change} ({stock.percentChange}%)</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No relevant stock data available</p>
      )}
    </div>
  );
}
