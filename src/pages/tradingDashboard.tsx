"use client"
import React from 'react';
import { TrendingUp, TrendingDown, Star, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DarkModeToggle from '@/components/dashboard/DarkModeToggle';
import NepseIndexCard from '@/components/dashboard/NepseIndexCard';
import PositionCard from '@/components/dashboard/PositionCard';
import WatchlistItem from '@/components/dashboard/WatchlistItem';
import ValuationCard from '@/components/dashboard/ValuationCard';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useFilteredMarketData } from "@/hooks/useFilteredStocks";
import LeadingSectorCard from '@/components/dashboard/LeadingSectorCard';
import DailyGainCard from '@/components/dashboard/DailyGainCard';
import Graph from '@/components/graphs/graph';
import TechChart from '@/components/graphs/technicalChart';

const TradingDashboard = () => {

  const { filteredWatchlists,filteredStocks, filteredSectors, isConnected, isError } = useFilteredMarketData();

  // Simulated data


  return (
  <div className="flex flex-col max-h-[100vh] transition-colors md:px-16 md:my-10 duration-200  dark:bg-gray-900 bg-gray-50 ">
    <div>
      <TechChart/>
    </div>

    <div className=" p-2  ">
      {!isConnected && <p>Connecting...</p>}
      {isError && <p>There was an error with the WebSocket connection.</p>}
        {/* Dark Mode Toggle */}
        <div className="flex justify-end fixed  top-4 right-16">
          <DarkModeToggle />
        </div>
        
        <div className='flex w-full mx-auto'>
          <div className='m-2 p-2'>
            <NepseIndexCard  stockData={filteredSectors[0]}  />
          </div>
          <div className='m-2 p-2'>
            <LeadingSectorCard stockData={filteredSectors[1]}/>
          </div>
          <div className='m-2 p-2'>
            <DailyGainCard stocks = {filteredStocks}></DailyGainCard>
          </div>
          <div className='m-2 p-2'>
            <ValuationCard stocks = {filteredStocks}/>
          </div>
          <div className='flex flex-grow  m-2 p-2 h-72'>
            <Card className="bg-white dark:bg-gray-800 flex-1">
              <CardHeader className="flex flex-row items-center justify-between ">
                <CardTitle className="text-xl font-bold dark:text-white">Watchlist</CardTitle>
                <Star className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {filteredWatchlists.map((stock) => (
                    <WatchlistItem key={stock.symbol} stock={stock} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live Positions Section */}
        <Card className="bg-white dark:bg-gray-800 col-span-4  ">
          <CardHeader className="flex flex-row items-center justify-center pb-2">
            <CardTitle className="text-xl font-bold dark:text-white">Live Positions</CardTitle>
          </CardHeader>




          <div className="p-4 bg-transparent text-white">
              <Table className="w-full border-collapse">
                <TableHeader>
                  <TableRow className="border-b border-gray-700 text-gray-400">
                    <TableHead className="px-4 py-2 md:text-2xl">Symbol</TableHead>
                    <TableHead className="px-4 py-2 md:text-2xl">quantity</TableHead>
                    <TableHead className="px-4 py-2 md:text-2xl">Avg Entry Price</TableHead>
                    <TableHead className="px-4 py-2 md:text-2xl">current Price</TableHead>
                    <TableHead className="px-4 py-2 md:text-2xl">Market Value</TableHead>
                    <TableHead className="px-4 py-2 md:text-2xl">Total Investment</TableHead>
                    <TableHead className="px-4 py-2 md:text-2xl">Profit/Loss</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredStocks.map((position) => (
                      <PositionCard key={position.symbol} position={position} />
                    ))}
                  {/* Placeholder for table rows (dynamically generated later) */}
                </TableBody>
              </Table>
          </div>

        </Card>


        {/* Watchlist Section */}
      </div>
    </div>
  );
};

export default TradingDashboard;// NEPSE Index Card Component