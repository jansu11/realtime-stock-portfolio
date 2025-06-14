import { useFilteredMarketData } from "@/hooks/useFilteredStocks";
import Graph from "./graph";
import imageData from "@/data/images.json";
import { useState, useEffect } from "react";

export interface Chart {
  symbol: string;
  ltp: number;
  change: number;
  imageUrl: string;
}


const TechChart = () => {
  const [mergedData, setMergedData] = useState<Chart[]>([]);
  const { filteredStocks } = useFilteredMarketData();

  useEffect(() => {
    if (!filteredStocks.length) return;

    try {
      const combinedData = filteredStocks.map((stock) => {
        const matchedImage = imageData.find((img) => img.symbol === stock.symbol);
        return {
          symbol: stock.symbol,
          ltp: stock.ltp,
          change: stock.change,
          imageUrl: matchedImage ? matchedImage.url : "/images/default.jpg",
        };
      });

      setMergedData(combinedData);
    } catch (err) {
      console.error("Error processing stock data", err);
    }
  }, [filteredStocks]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {mergedData.map((stock) => (
        <Graph key={stock.symbol} stockdata={stock} />
      ))}
    </div>
  );
};



export default TechChart;