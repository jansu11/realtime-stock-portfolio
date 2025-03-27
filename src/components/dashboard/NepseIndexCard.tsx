import React,{useEffect, useState} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Star, DollarSign, Activity } from 'lucide-react';

interface StockData {
  indexCode: string;
  indexValue: number;
  prevCloseIndex: number;
  change: number;
  percentageChange: number;
}

interface Props  {
    stockData?: StockData
}

const NepseIndexCard: React.FC<Props> =  ({ stockData }) => {


  if (!stockData) {
    return <div className="text-red-500">Stock data is not available</div>;
  }

  
   return (
    <Card className=" bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 p-10 h-72">
      <CardHeader className="flex flex-row items-center justify-center pb-2">
        <CardTitle className="sm:text-xl lg:text-4xl font-bold dark:text-white">
           NEPSE
        </CardTitle>
        <Activity className="h-5 ml-2 w-5 text-green-500 dark:text-green-400" />
      </CardHeader>
      <CardContent className='p-0 '>
        <div className="flex flex-col py-10  items-center justify-between mb-2">
          <div className={`text-5xl md:text-7xl font-bold mb-2 `}>
            {stockData.indexValue?.toFixed(2) ?? "0.00"}
          </div>
          <div className={`flex items-center`}>
            {stockData.change > 0 ? (
              <TrendingUp className="h-5 w-5 mr-1" />
            ) : (
              <TrendingDown className="h-5 w-5 mr-1" />
            )}
            <span className={`font-semibold md:text-3xl ${stockData.change > 0 ? "text-green-400" : "text-red-700"}`}>
              {stockData.change
                ? (stockData.change > 0 ? "+" : "") + stockData.change.toFixed(2)
                : "0.00"}{" "}
              ({stockData.percentageChange ? stockData.percentageChange.toFixed(2) : "0.00"}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NepseIndexCard;