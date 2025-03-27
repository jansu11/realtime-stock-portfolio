import React from 'react';
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


const indexMapping: Record<string, string> = {
  MICRFININD  : "MICRO FINANCE",
  HYDPOWIND : 'HYDRO POWER',
  HOTELIND : 'HOTELS',
  DEVBANKIND : 'DEVELOPMENT BANKS',
  OTHERSIND : 'OTHERS',
  MANPROCIND : 'MANUFACTURE AND PRODUCTION',
  BANKSUBIND : 'COMMERCIAL BANKS',
  NONLIFIND : 'NON LIFE INSURACE',
  MUTUALFUND : 'MUTUAL FUNDS',
  LIFEINSIND : 'LIFE INSURANE',
  FININD : 'FINANCE',
  TRDIND : 'TRADING',
  INVIDX : 'INVESTMENT'


}

const LeadingSectorCard: React.FC<Props> =  ({ stockData }) => {
  if (!stockData) {
    return <div className="text-red-500">Stock data is not available</div>;
  }

  return (
    <Card className="bg-gradient-to-r from-gray-50 to-gray-200  dark:from-gray-800 dark:to-gray-900   px-8 py-3 h-72  ">
      <CardHeader className="flex flex-col items-center  ">
        <CardTitle className=" text-2xl  md:text-3xl font-bold dark:text-white">Top Sector </CardTitle>
        <div className='flex flex-row items-center justify-center'>
            <span className=' md:text-xl font-bold'>{indexMapping[stockData.indexCode]}</span>
            <Activity className=" h-5 ml-2 w-5 text-green-500 dark:text-green-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col  items-center justify-between md:mt-">
          <div className="text-3xl  md:text-7xl  font-bold dark:text-white">
            {stockData.indexValue?.toFixed(2) ?? "0.00"}
          </div>
          <div className={`flex items-center mt-2 ${stockData.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-700'}`}>
            {stockData.change > 0 ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
            <span className="font-semibold md:text-3xl">
            {stockData.change ? (stockData.change > 0 ? "+" : "") + stockData.change.toFixed(2) : "0.00"} 
              ({stockData.percentageChange ? stockData.percentageChange.toFixed(2) : "0.00"}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


export default  LeadingSectorCard 