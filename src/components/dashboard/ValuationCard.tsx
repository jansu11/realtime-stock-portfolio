import React from "react";
import { StockData } from "@/types/websocket";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  stocks?: StockData[];
}

const ValuationCard: React.FC<Props> = ({ stocks }) => {
  if (!stocks || stocks.length === 0) {
    return <div className="text-red-600 font-semibold">No positions available</div>;
  }

  let totalInvestment = 0;
  let totalMarketValue = 0;

  stocks.forEach((stock) => {
    totalInvestment += stock.quantity * stock.price;
    totalMarketValue += stock.quantity * stock.ltp;
  });

  const isProfit = totalMarketValue > totalInvestment;
  const difference = Math.abs(totalMarketValue - totalInvestment).toFixed(2);
  const changeColor = isProfit ? "text-green-500" : "text-red-600";

  return (
    <Card className="bg-gradient-to-r from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-xl p-6 md:p-8 lg:p-10 h-auto">
      <CardHeader className="text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold dark:text-white">
          Portfolio Summary
        </h2>
        <div className={`flex justify-center items-center mt-2 ${changeColor} font-semibold text-sm`}>
          {isProfit ? <TrendingUp className="w-5 h-5 mr-2" /> : <TrendingDown className="w-5 h-5 mr-2" />}
          {isProfit ? "Profit" : "Loss"}
        </div>
      </CardHeader>

      <CardContent className="text-center">
        <div className={`text-xl md:text-2xl lg:text-3xl font-bold ${changeColor} mb-4`}>
         <span className="text-2xl"> {isProfit ? "+" : "-"} Rs {difference}</span>
        </div>

        <div className="text-base  text-gray-800 dark:text-gray-300 mb-2">
          Total Investment: <span className="font-semibold">Rs {totalInvestment.toFixed(2)}</span>
        </div>

        <div className="text-base  text-gray-800 dark:text-gray-300">
          Market Value: <span className="font-semibold">Rs {totalMarketValue.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuationCard;
