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

const indexMapping: Record<string, string> = {
  MICRFININD: "MICRO FINANCE",
  HYDPOWIND: "HYDRO POWER",
  HOTELIND: "HOTELS",
  DEVBANKIND: "DEVELOPMENT BANKS",
  OTHERSIND: "OTHERS",
  MANPROCIND: "MANUFACTURE AND PRODUCTION",
  BANKSUBIND: "COMMERCIAL BANKS",
  NONLIFIND: "NON LIFE INSURANCE",
  MUTUALFUND: "MUTUAL FUNDS",
  LIFEINSIND: "LIFE INSURANCE",
  FININD: "FINANCE",
  TRDIND: "TRADING",
  INVIDX: "INVESTMENT",
};

const LeadingSectorCard: React.FC<Props> = ({ stockData }) => {
  if (!stockData) {
    return <div className="text-red-500">Stock data is not available</div>;
  }

  return (
    <Card className="bg-gradient-to-r from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 lg:p-10 rounded-xl shadow-lg h-auto">
      <CardHeader className="flex flex-col items-center space-y-2">
        <CardTitle className="text-lg md:text-2xl lg:text-3xl font-bold dark:text-white text-center">
          Top Sector
        </CardTitle>
        <div className="flex flex-row items-center justify-center text-center text-sm md:text-base lg:text-lg font-semibold">
          <span className="break-words max-w-[180px] md:max-w-xs">
            {indexMapping[stockData.indexCode]}
          </span>
          <Activity className="h-5 ml-2 w-5 text-green-500 dark:text-green-400" />
        </div>
      </CardHeader>

      <CardContent className="flex flex-col items-center mt-4 space-y-4">
        <div className="text-3xl md:text-5xl lg:text-6xl font-bold dark:text-white">
          {stockData.indexValue?.toFixed(2) ?? "0.00"}
        </div>

        <div
          className={`flex items-center justify-center text-base md:text-xl lg:text-2xl font-semibold ${
            stockData.change > 0
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-500'
          }`}
        >
          {stockData.change > 0 ? (
            <TrendingUp className="h-5 w-5 mr-2" />
          ) : (
            <TrendingDown className="h-5 w-5 mr-2" />
          )}
          {(stockData.change > 0 ? '+' : '') + stockData.change.toFixed(2)} (
          {stockData.percentageChange?.toFixed(2) ?? '0.00'}%)
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadingSectorCard;
