"use client";
import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Star,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DarkModeToggle from "@/components/dashboard/DarkModeToggle";
import NepseIndexCard from "@/components/dashboard/NepseIndexCard";
import PositionCard from "@/components/dashboard/PositionCard";
import WatchlistItem from "@/components/dashboard/WatchlistItem";
import ValuationCard from "@/components/dashboard/ValuationCard";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useFilteredMarketData } from "@/hooks/useFilteredStocks";
import LeadingSectorCard from "@/components/dashboard/LeadingSectorCard";
import DailyGainCard from "@/components/dashboard/DailyGainCard";
import Graph from "@/components/graphs/graph";
import TechChart from "@/components/graphs/technicalChart";

const TradingDashboard = () => {
  const {
    filteredWatchlists,
    filteredStocks,
    filteredSectors,
    isConnected,
    isError,
  } = useFilteredMarketData();

  return (
    <div className="flex flex-col min-h-screen transition-colors px-4 md:px-16 py-6 dark:bg-gray-900 bg-gray-50 overflow-x-hidden">
      <div className="w-full mb-4">
        <TechChart />
      </div>

      {!isConnected && <p>Connecting...</p>}
      {isError && <p>There was an error with the WebSocket connection.</p>}

      {/* Dark Mode Toggle */}
      <div className="flex justify-end fixed top-4 right-4 z-10">
        <DarkModeToggle />
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <NepseIndexCard stockData={filteredSectors[0]} />
        <LeadingSectorCard stockData={filteredSectors[1]} />
        <DailyGainCard stocks={filteredStocks} />
        <ValuationCard stocks={filteredStocks} />
        
        {/* Watchlist */}
        <Card className="bg-white dark:bg-gray-800 h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold dark:text-white">
              Watchlist
            </CardTitle>
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

      {/* Live Positions Table */}
      <Card className="bg-white dark:bg-gray-800 w-full overflow-auto">
        <CardHeader className="flex justify-center pb-2">
          <CardTitle className="text-xl font-bold dark:text-white">
            Live Positions
          </CardTitle>
        </CardHeader>

        <div className="p-4 w-full overflow-x-auto text-sm md:text-base">
          <Table className="w-full border-collapse min-w-[768px]">
            <TableHeader>
              <TableRow className="border-b border-gray-700 text-gray-400">
                <TableHead className="px-4 py-2">Symbol</TableHead>
                <TableHead className="px-4 py-2">Quantity</TableHead>
                <TableHead className="px-4 py-2">Avg Entry Price</TableHead>
                <TableHead className="px-4 py-2">Current Price</TableHead>
                <TableHead className="px-4 py-2">Market Value</TableHead>
                <TableHead className="px-4 py-2">Total Investment</TableHead>
                <TableHead className="px-4 py-2">Profit/Loss</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStocks.map((position) => (
                <PositionCard key={position.symbol} position={position} />
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default TradingDashboard;
