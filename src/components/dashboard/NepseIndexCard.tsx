import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface StockData {
  indexCode: string;
  indexValue: number;
  prevCloseIndex: number;
  change: number;
  percentageChange: number;
}

interface Props {
  stockData?: StockData;
}

const NepseIndexCard: React.FC<Props> = ({ stockData }) => {
  if (!stockData) {
    return <div className="text-red-500">Stock data is not available</div>;
  }

  return (
    <Card className="bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 lg:p-10 rounded-xl shadow-lg h-auto">
      <CardHeader className="flex items-center justify-center pb-4">
        <CardTitle className="text-lg md:text-2xl lg:text-3xl font-bold text-center dark:text-white">
          NEPSE
        </CardTitle>
        <Activity className="h-5 ml-2 w-5 text-green-500 dark:text-green-400" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white break-words">
            {stockData.indexValue?.toFixed(2) ?? "0.00"}
          </div>

          <div className="flex items-center justify-center text-sm md:text-lg lg:text-xl font-semibold break-words">
            {stockData.change > 0 ? (
              <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
            ) : (
              <TrendingDown className="h-5 w-5 mr-2 text-red-500" />
            )}
            <span className={`${stockData.change > 0 ? "text-green-400" : "text-red-500"}`}>
              {(stockData.change > 0 ? "+" : "") + stockData.change.toFixed(2)} (
              {stockData.percentageChange?.toFixed(2) ?? "0.00"}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NepseIndexCard;
