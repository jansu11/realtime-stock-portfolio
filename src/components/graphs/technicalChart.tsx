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
  const { filteredStocks } = useFilteredMarketData(); // Fetch stocks from API
  console.log(filteredStocks)

  useEffect(() => {
    if (!filteredStocks.length) return; // Avoid running when data is empty

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
  }, [filteredStocks]); // Runs when `filteredStocks` changes

  return (
    <div className="flex   min-h-[40vh]">
      {mergedData.map((stock) => (
        <Graph key={stock.symbol} stockdata = {stock}/>
      ))}
    </div>
  );
};

export default TechChart;